import Fab from "@mui/material/Fab";
import { Category, Chore } from "@shared/models";
import { getIntervalProgressPercentage } from "../../common/models";
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
import ConfirmModal from "./components/ConfirmModal";
import { useTranslation } from "./hooks/useTranslation";
import { useToggle } from "./hooks/useToggle";

const baseUrl = import.meta.env.VITE_URL as string;

const url = {
  chores: `${baseUrl}/api/chores`,
  categories: `${baseUrl}/api/categories`,
};

const App: FC = () => {
  const [showChoreModal, setShowChoreModal] = useState<boolean>(false);
  const [showConfirmRestartExpiredModal, toggleConfirmRestartExpiredModal] =
    useToggle(false);
  const [
    showConfirmDeleteSelectedChoreModal,
    toggleConfirmDeleteSelectedChoreModal,
  ] = useToggle(false);
  const [selectedChore, selectChore, deselectChore] = useSelection<string>();
  const [collapsedCategories, setCollapsedCategories] = useState<string[]>([]);

  const { t } = useTranslation();

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

  const expiredChores = useMemo(() => {
    const progressPercentages = chores?.map((ch) => ({
      id: ch.id,
      progress: getIntervalProgressPercentage(ch),
    }));

    return progressPercentages?.filter((p) => p.progress === 100);
  }, [chores]);

  useEffect(() => {
    if (expiredChores?.length > 0) {
      toggleConfirmRestartExpiredModal();
    }
  }, [chores]);

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

  const restartChores = useMutation<string>(
    (ids: string[]) => axios.post(`${url.chores}/restart`, { ids }),
    { onSuccess: refetchChores }
  );

  const deleteChore = useMutation<string>(
    (id: string) => axios.delete(`${url.chores}/${id}/delete`),
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
  const handleRestartChores = (ids: string[]) => restartChores.mutate(ids);
  const handleDeleteChore = (id: string) => {
    deleteChore.mutate(id);
    deselectChore();
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
            onDelete={
              selectedChore ? toggleConfirmDeleteSelectedChoreModal : null
            }
          />
        ),
        [chores, selectedChore]
      )}
    </Modal>
  );

  const confirmRestartExpiredModal = (
    <ConfirmModal
      show={showConfirmRestartExpiredModal}
      width="md"
      message={t.askRestartExpiredChores}
      onCancel={toggleConfirmRestartExpiredModal}
      onConfirm={() => {
        if (expiredChores !== undefined && expiredChores.length > 0) {
          handleRestartChores(expiredChores.map((c) => c.id));
          toggleConfirmRestartExpiredModal();
        }
      }}
    />
  );

  const confirmDeleteSelectedChoreModal = selectedChore ? (
    <ConfirmModal
      show={showConfirmDeleteSelectedChoreModal}
      width="md"
      message={t.askDelete(chores?.find((c) => c.id === selectedChore).name)}
      onCancel={toggleConfirmDeleteSelectedChoreModal}
      onConfirm={() => handleDeleteChore(selectedChore)}
    />
  ) : null;

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
      {confirmRestartExpiredModal}
      {confirmDeleteSelectedChoreModal}
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
