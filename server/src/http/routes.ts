  import { FastifyInstance } from "fastify";
  import { register } from "./controllers/register";
  import { authenticate } from "./controllers/authenticate";
  import { getUserProfileController } from "./controllers/get-user-profile";
  import { getAllUsersController } from "./controllers/get-all-users";
  import { deleteUser } from "./controllers/delete-user";
  import { updateUser } from "./controllers/update-user";
  import { registerUniversityController } from "./controllers/register-university";
  import { getAllUniversityController } from "./controllers/get-all-university";
  import { getUniversityController } from "./controllers/get-university";
  import { deleteUniversityController } from "./controllers/delete-university";
  import { updateUniversityController } from "./controllers/update-university";
  import { profile } from "./controllers/profile";
  import { refresh } from "./controllers/refresh";
  import { verifyUserRole } from "./middleware/verify-user-role";
  import { verifyJwt } from "./middleware/verify-jwt";

  declare module "fastify" {
    interface FastifyInstance {
      verifyJwt: typeof verifyJwt;
    }
  }

  export async function appRoutes(app: FastifyInstance) {
    // User routes
    app.post("/users", register);
    app.post("/sessions", authenticate);
    app.get("/users/:userId", { preValidation: [app.verifyJwt] }, getUserProfileController);
    app.get('/getallusers', { preValidation: [app.verifyJwt, verifyUserRole('ADMIN')] }, getAllUsersController);
    app.delete("/deleteuser/:id", { preValidation: [app.verifyJwt, verifyUserRole('ADMIN')] }, deleteUser);
    app.put("/users/:userId", { preValidation: [app.verifyJwt, verifyUserRole('ADMIN')] }, updateUser);
    app.get("/me", { preValidation: [app.verifyJwt] }, profile);
    app.patch("/token/refresh", refresh);

    // University routes
    app.post("/university", { preValidation: [app.verifyJwt, verifyUserRole('ADMIN')] }, registerUniversityController);
    app.get("/getalluniversity", { preValidation: [app.verifyJwt] }, getAllUniversityController);
    app.get("/university/:id", { preValidation: [app.verifyJwt] }, getUniversityController);
    app.delete("/deleteuniversity/:id", { preValidation: [app.verifyJwt, verifyUserRole('ADMIN')] }, deleteUniversityController);
    app.put("/university/:id", { preValidation: [app.verifyJwt, verifyUserRole('ADMIN')] }, updateUniversityController);
  }
