import { FastifyInstance } from "fastify";
import { register } from "./controllers/register";
import { authenticate } from "./controllers/authenticate";
import { getUserProfileController } from "./controllers/get-user-profile";
import { getAllUsersController } from "./controllers/get-all-users";
import { deleteUser } from "./controllers/delete-user";
import { updateUser } from "./controllers/update-user";
import { registerUniversityController } from "./controllers/register-university";
import { getAllUniversityController } from "./controllers/get-all-university"
import { getUniversityController } from "./controllers/get-university";
import { deleteUniversityController } from "./controllers/delete-university";
import { updateUniversityController } from "./controllers/update-university";
import { profile } from "./controllers/profile";
import { refresh } from "./controllers/refresh";
import { verifyUserRole } from "./middleware/verify-user-role";

export async function appRoutes(app: FastifyInstance) {
  // User routes
    app.post("/users", register);
    app.post("/sessions",authenticate); 
    app.get("/users/:userId", getUserProfileController);
    app.get('/getallusers', { preHandler: verifyUserRole('ADMIN') }, getAllUsersController);
    app.delete("/deleteuser/:id", deleteUser);
    app.put("/users/:userId", updateUser);
    app.get("/me", profile)
    app.patch("/token/refresh", refresh)

  // University routes  
    app.post("/university", registerUniversityController);
    app.get("/getalluniversity", getAllUniversityController);
    app.get("/university/:id", getUniversityController);
    app.delete("/deleteuniversity/:id", deleteUniversityController);
    app.put("/university/:id", updateUniversityController);
  }