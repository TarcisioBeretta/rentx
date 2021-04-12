import { Category } from "../../infra/typeorm/entities/Category";
import {
  ICategoriesRepository,
  ICreateCategoryDto,
} from "../ICategoriesRepository";

class CategoriesRepositoryInMemory implements ICategoriesRepository {
  categories: Category[] = [];

  async findByName(name: string): Promise<Category> {
    return this.categories.find((category) => category.name === name);
  }

  async list(): Promise<Category[]> {
    return this.categories;
  }

  async create({ name, description }: ICreateCategoryDto): Promise<void> {
    const category = new Category();
    Object.assign(category, {
      name,
      description,
    });

    this.categories.push(category);
  }
}

export { CategoriesRepositoryInMemory };
