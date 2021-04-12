import { getRepository, Repository } from "typeorm";
import { ICreateSpecificationDto, ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";
import { Specification } from "../entities/Specification";



class SpecificationsRepository implements ISpecificationsRepository {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = getRepository(Specification);
  }

  async create({ name, description }: ICreateSpecificationDto): Promise<void> {
    const specification = this.repository.create({
      name,
      description,
    });

    await this.repository.save(specification);
  }

  async list(): Promise<Specification[]> {
    const specifications = this.repository.find();
    return specifications;
  }

  async findByName(name: string): Promise<Specification> {
    const repository = this.repository.findOne({ name });
    return repository;
  }
}

export { SpecificationsRepository };
