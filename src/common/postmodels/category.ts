import { Category } from "../models";

export type CategoryPostmodel = Omit<Category, "id">;
