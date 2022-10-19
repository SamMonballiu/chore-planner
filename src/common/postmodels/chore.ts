import { Chore } from "../models";

export type ChorePostmodel = Omit<Chore, "id">;
