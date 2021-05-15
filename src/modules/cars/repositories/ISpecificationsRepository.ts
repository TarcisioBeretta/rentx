import { Specification } from "../infra/typeorm/entities/Specification";

export interface ICreateSpecificationDto {
  name: string;
  description: string;
}

export interface ISpecificationsRepository {
  list(): Promise<Specification[]>;
  create({
    name,
    description,
  }: ICreateSpecificationDto): Promise<Specification>;
  findByName(name: string): Promise<Specification>;
  findByIds(ids: string[]): Promise<Specification[]>;
}
