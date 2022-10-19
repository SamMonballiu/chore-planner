import { Category, Chore } from "@/common/models";
import { Repository, RepositoryContext } from "json-repo";

export class DataContext extends RepositoryContext {
  constructor(dataPath: string) {
    super(dataPath);
  }

  models = {
    chores: new ChoreRepository(),
    categories: new CategoryRepository(),
  };
}

class ChoreRepository extends Repository<Chore> {
  constructor() {
    super();
  }

  public getAll(): Chore[] {
    return this.filter(() => true);
  }
}

class CategoryRepository extends Repository<Category> {
  constructor() {
    super();
  }

  public getAll(): Category[] {
    return this.filter(() => true);
  }
}
