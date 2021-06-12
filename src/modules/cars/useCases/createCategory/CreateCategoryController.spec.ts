import { hash } from "bcryptjs";
import request from "supertest";
import { Connection, createConnection } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { app } from "@shared/infra/http/app";

describe("Create category controller", () => {
  let connection: Connection;

  beforeEach(async () => {
    connection = await createConnection();

    const id = uuidV4();
    const password = await hash("admin", 8);

    await connection.query(
      `
      INSERT INTO users(id, name, email, password, "isAdmin", created_at, driver_license)
      VALUES ('${id}', 'admin', 'admin@rentx.com.br', '${password}', true, 'now()', 'XXXXX')
      `
    );
  });

  it("should be able to create a new category", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "admin@rentx.com.br",
      password: "admin",
    });

    console.log(responseToken.body);

    const response = await request(app).post("/categories").send({
      name: "Category Supertest",
      description: "Category Supertest",
    });

    expect(response.status).toBe(201);
  });
});
