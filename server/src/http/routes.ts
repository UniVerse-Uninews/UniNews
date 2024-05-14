import { FastifyInstance } from "fastify";
import { register } from "./controllers/register";
import { authenticate } from "./controllers/authenticate";
import { getUserProfileController } from "./controllers/get-user-profile";
import { getAllUsersController } from "./controllers/get-all-users";

export async function appRoutes(app: FastifyInstance) {
    app.post("/users", register);
    app.post("/sessions",authenticate); 
    app.get("/users/:userId", getUserProfileController);
    app.get("/getallusers", getAllUsersController);
  }