  import { FastifyInstance } from "fastify";
  import { register } from "./controllers/user/register";
  import { authenticate } from "./controllers/user/authenticate";
  import { getUserProfileController } from "./controllers/user/get-user-profile";
  import { getAllUsersController } from "./controllers/user/get-all-users";
  import { deleteUser } from "./controllers/user/delete-user";
  import { updateUser } from "./controllers/user/update-user";
  import { registerUniversityController } from "./controllers/university/register-university";
  import { getAllUniversityController } from "./controllers/university/get-all-university";
  import { getUniversityController } from "./controllers/university/get-university";
  import { deleteUniversityController } from "./controllers/university/delete-university";
  import { updateUniversityController } from "./controllers/university/update-university";
  import { profile } from "./controllers/user/profile";
  import { refresh } from "./controllers/user/refresh";
  import { verifyUserRole } from "./middleware/verify-user-role";
  import { verifyJwt } from "./middleware/verify-jwt";
  import { addNews } from "./controllers/news/add-news";
  import { getRSSFeed } from "./controllers/news/get-rss-feed";
  import { getNewsByUniversity } from "./controllers/news/get-news-by-university";
  import { getNews, createNews } from "./controllers/news/temp-news";
  import { getNpmData } from "./controllers/news/temp-npm";

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
    app.put("/university/:universityId", { preValidation: [app.verifyJwt, verifyUserRole('ADMIN')] }, updateUniversityController);

    // News routes
    // app.post('/news', addNews);
    // app.get('/news/:text', getRSSFeed);
    // app.get('/news/university/:text', getNewsByUniversity);
    app.get('/news/:text', getNews);
    app.post('/news', createNews);
    app.get('/npm/:text', getNpmData);
  }
