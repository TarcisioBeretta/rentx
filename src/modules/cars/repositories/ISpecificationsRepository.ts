import { Specification } from "../entities/Specification";

export interface ICreateSpecificationDto {
  name: string;
  description: string;
}

export interface ISpecificationsRepository {
  findByName(name: string): Promise<Specification>;
  list(): Promise<Specification[]>;
  create({ name, description }: ICreateSpecificationDto): Promise<void>;
}
