export interface Resource {
  name: string;
  newChore: string;
  editChore: string;
  category: string;
  cancel: string;
  save: string;
  askRestartExpiredChores: string;
  askDelete: (name: string) => string;
  delete: string;
}

export interface ResourceCollection {
  en: Resource;
}

export const translations: ResourceCollection = {
  en: {
    name: "Name",
    newChore: "New chore",
    editChore: "Edit chore",
    category: "Category",
    cancel: "Cancel",
    save: "Save",
    askRestartExpiredChores: "Restart expired chores?",
    askDelete: (name) => `Delete '${name}?'`,
    delete: "Delete"
  },
};
