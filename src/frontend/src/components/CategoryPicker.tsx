import { useTranslation } from "@/hooks/useTranslation";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Category } from "@shared/models";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { FC } from "react";

interface Props {
  onSelect: (categoryId: string) => void;
  defaultValue?: string;
}

const CategoryPicker: FC<Props> = ({ onSelect, defaultValue }) => {
  const baseUrl = import.meta.env.VITE_URL as string;
  const { t } = useTranslation();

  const { data: categories, isFetching: isFetchingCategories } = useQuery(
    ["categoryPicker"],
    async () => {
      return (await axios.get<Category[]>(`${baseUrl}/api/categories`)).data;
    }
  );

  if (isFetchingCategories) {
    return <span>...</span>;
  }

  return (
    <Select
      fullWidth
      value={defaultValue}
      label={t.category}
      onChange={(e) => onSelect(e.target.value)}
    >
      {categories?.map((c) => (
        <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>
      ))}
    </Select>
  );
};

export default CategoryPicker;
