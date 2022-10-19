import { Entity } from "@common/modelds/entity";

export interface Chore extends Entity {
  name: string;
  owner: string;
  categoryId: string;
  repeatInterval?: number;
}
