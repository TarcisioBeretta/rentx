import { Router } from "express";

import { DevolutionRentalController } from "@modules/cars/useCases/devolutionRental/DevolutionRentalController";
import { CreateRentalController } from "@modules/rentals/useCases/createRental/createRentalController";
import { ListRentalsByUserController } from "@modules/rentals/useCases/createRental/listRentalsByUser/ListRentalsByUserController";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const rentalRoutes = Router();

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();
const listRentalsByUserController = new ListRentalsByUserController();

rentalRoutes.post("/", ensureAuthenticated, createRentalController.handle);
rentalRoutes.post(
  "/devolution/:id",
  ensureAuthenticated,
  devolutionRentalController.handle
);
rentalRoutes.get(
  "/user",
  ensureAuthenticated,
  listRentalsByUserController.handle
);

export { rentalRoutes };
