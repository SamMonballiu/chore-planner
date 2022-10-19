import { Chore } from "@/common/models";
import { Entity } from "@/common/models/entity";
import { Repository, RepositoryContext } from "json-repo";
import { v4 as uuidv4 } from "uuid";

export const setId = (entity: Entity): void => {
  entity.id = uuidv4();
};

export class DataContext extends RepositoryContext {
  constructor(dataPath: string) {
    super(dataPath);
  }

  models = {
    chores: new ChoreRepository(),
  };
}

class ChoreRepository extends Repository<Chore> {
  constructor() {
    super();
  }

  public getAll(): Chore[] {
    return this.filter((_) => true);
  }
}
