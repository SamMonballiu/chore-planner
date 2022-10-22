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
  const [collapsedCategories, setCollapsedCategories] = useState<string[]>([]);
  const [showChoreModal, setShowChoreModal] = useState<boolean>(false);
  const [selectedChore, selectChore, deselectChore] = useSelection<string>();

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
    }
  );

  const createChore = useMutation((chore: ChorePostmodel) => {
    return axios.post(url.chores, chore);
  });

  const updateChore = useMutation<string>(
    (model: ChorePostmodel) => {
      return axios.put(`${url.chores}/${selectedChore}`, model);
    },
    { onSuccess: refetchChores }
  );

  const handleSaveChore = (data: ChorePostmodel) => {
    if (selectedChore) {
      updateChore.mutate(data);
      deselectChore();
    } else {
      createChore.mutate(data);
    }
  };

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

  if (isFetchingCategories || isFetchingChores) {
    return null;
  }

  return (
    <>
      {choreModal}
      <div className="App">
        <Fab
          size="medium"
          color="primary"
          className="addChore"
          onClick={() => setShowChoreModal(true)}
        >
          <AddIcon />
        </Fab>
        {categories?.map((c) => (
          <CategoryComponent
            key={c.id}
            category={c}
            isCollapsed={collapsedCategories?.includes(c.id)}
            onToggleCollapsed={toggleCollapsed}
            chores={chores.filter((ch) => ch.categoryId === c.id)}
            onSelectChore={selectChore}
          />
        ))}
      </div>
    </>
  );
};

export default App;
