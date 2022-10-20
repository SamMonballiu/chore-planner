export interface Resource {
  name: string;
  newChore: string;
  editChore: string;
  category: string;
  cancel: string;
  save: string;
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
  },
};
