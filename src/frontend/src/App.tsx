import { Category, Chore } from "@common/models";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { FC, useEffect, useState } from "react";
import "./App.scss";
import CategoryComponent from "./components/Category";

const baseUrl = import.meta.env.VITE_URL as string;

const url = {
  chores: `${baseUrl}/api/chores`,
  categories: `${baseUrl}/api/categories`,
};

const App: FC = () => {
  const [collapsedCategories, setCollapsedCategories] = useState<string[]>([]);

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
  const { data: chores, isFetching: isFetchingChores } = useQuery(
    ["getChores"],
    async () => {
      return (await axios.get<Chore[]>(url.chores)).data;
    },
    {
      enabled: !!categories,
    }
  );

  if (isFetchingCategories || isFetchingChores) {
    return null;
  }

  return (
    <div className="App">
      {categories?.map((c) => (
        <CategoryComponent
          key={c.id}
          category={c}
          isCollapsed={collapsedCategories?.includes(c.id)}
          onToggleCollapsed={toggleCollapsed}
          chores={chores.filter((ch) => ch.categoryId === c.id)}
        />
      ))}
    </div>
  );
};

export default App;
