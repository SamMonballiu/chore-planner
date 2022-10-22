import { Entity } from "./entity";

export interface Chore extends Entity {
  name: string;
  owner: string;
  categoryId: string;
  repeatInterval?: number;
  lastActiveDate?: Date;
}
