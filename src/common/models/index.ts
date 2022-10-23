export * from "./category";
export * from "./chore";

export const formatDate = (dateString: string): string => {
  if (!dateString) {
    return "";
  }

  const date = new Date(dateString);

  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};
