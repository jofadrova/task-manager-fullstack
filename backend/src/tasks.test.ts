const request = require("supertest");
const jwt = require("jsonwebtoken");
const app = require("./app.ts");

describe("POST /tasks", () => {
  it("rechaza crear una tarea con texto vacío", async () => {
    const token = jwt.sign(
      {
        id: 1,
        username: "usuario-prueba"
      },
      "taskmanager_secret"
    );

    const res = await request(app)
      .post("/tasks")
      .set("Authorization", `Bearer ${token}`)
      .send({ text: "" });

    expect(res.status).toBe(400);
  });
});