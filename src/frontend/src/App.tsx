import Fab from "@mui/material/Fab";
import { Category, Chore } from "@shared/models";
import { ChorePostmodel } from "@shared/postmodels/chore";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { FC, useEffect, useState, useMemo } from "react";
import "./App.scss";
import CategoryComponent from "./components/Category";
import Modal from "./components/Modal";
import ModifyChore from "./components/ModifyChore";
import { useSelection } from "./hooks/useSelection";
import AddIcon from "@mui/icons-material/Add";

const baseUrl = import.meta.env.VITE_URL as string;

const url = {
  chores: `${baseUrl}/api/chores`,
  categories: `${baseUrl}/api/categories`,
};

const App: FC = () => {
  const [showChoreModal, setShowChoreModal] = useState<boolean>(false);
  const [selectedChore, selectChore, deselectChore] = useSelection<string>();
  const [collapsedCategories, setCollapsedCategories] = useState<string[]>([]);

  useEffect(() => {
    setShowChoreModal(selectedChore !== undefined);
  }, [selectedChore]);

  const toggleCollapsed = (id: string) => {
    if (collapsedCategories?.includes(id)) {
      setCollapsedCategories(collapsedCategories.filter((c) => c !== id));
    } else {
      setCollapsedCategories([...collapsedCategories, id]);
    }
  };

  const { data: categories, isFetching: isFetchingCategories } = useQuery(
    ["getCategories"],
    async () => {
      return (await axios.get<Category[]>(url.categories)).data;
    }
  );

  const {
    data: chores,
    isFetching: isFetchingChores,
    refetch: refetchChores,
  } = useQuery(
    ["getChores"],
    async () => {
      return (await axios.get<Chore[]>(url.chores)).data;
    },
    {
      enabled: !!categories,
      onSuccess: (data) => setCollapsedCategories(getInitialCollapsed(data)),
    }
  );

  const getInitialCollapsed = (chores: Chore[]): string[] => {
    if (!categories) {
      return [];
    }

    return categories
      .map((cat) => cat.id)
      .filter((cat) => chores?.every((c) => c.categoryId !== cat));
  };

  const createChore = useMutation(
    (chore: ChorePostmodel) => axios.post(url.chores, chore),
    {
      onSuccess: refetchChores,
    }
  );
  const updateChore = useMutation<string>(
    (model: ChorePostmodel) =>
      axios.put(`${url.chores}/${selectedChore}`, model),
    { onSuccess: refetchChores }
  );

  const activateChore = useMutation<string>(
    (id: string) => axios.post(`${url.chores}/${id}/activate`),
    { onSuccess: refetchChores }
  );

  const restartChore = useMutation<string>(
    (id: string) => axios.post(`${url.chores}/${id}/restart`),
    { onSuccess: refetchChores }
  );

  const handleSaveChore = (data: ChorePostmodel) => {
    if (selectedChore) {
      updateChore.mutate(data);
      deselectChore();
    } else {
      createChore.mutate(data);
      setShowChoreModal(false);
    }
  };

  const handleActivateChore = (id: string) => activateChore.mutate(id);

  const handleRestartChore = (id: string) => restartChore.mutate(id);

  const choreModal = (
    <Modal
      width="md"
      show={showChoreModal}
      onClose={selectedChore ? deselectChore : () => setShowChoreModal(false)}
    >
      {useMemo(
        () => (
          <ModifyChore
            chore={chores?.find((x) => x.id === selectedChore)}
            onCancel={
              selectedChore ? deselectChore : () => setShowChoreModal(false)
            }
            onSave={handleSaveChore}
          />
        ),
        [chores, selectedChore]
      )}
    </Modal>
  );

  const addButton = (
    <Fab
      size="medium"
      color="primary"
      className="addChore"
      onClick={() => setShowChoreModal(true)}
    >
      <AddIcon />
    </Fab>
  );

  if (isFetchingCategories || isFetchingChores) {
    return null;
  }

  return (
    <>
      {choreModal}
      <div className="App">
        {addButton}
        {categories?.map((c) => (
          <CategoryComponent
            key={c.id}
            category={c}
            isCollapsed={collapsedCategories?.includes(c.id)}
            onToggleCollapsed={toggleCollapsed}
            chores={chores.filter((ch) => ch.categoryId === c.id)}
            onSelectChore={selectChore}
            onActivateChore={handleActivateChore}
            onRestartChore={handleRestartChore}
          />
        ))}
      </div>
    </>
  );
};

export default App;
