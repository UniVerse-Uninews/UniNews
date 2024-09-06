  import { FastifyInstance } from "fastify";
  import { register } from "./controllers/user/register";
  import { authenticate } from "./controllers/user/authenticate";
  import { getUserProfileController } from "./controllers/user/get-user-profile";
  import { getAllUsersController } from "./controllers/user/get-all-users";
  import { deleteUser } from "./controllers/user/delete-user";
  import { updateUser } from "./controllers/user/update-user";
  import { registerUniversityController } from "./controllers/university/register-university";
  import { getAllUniversityController, getAllUniversityWithPaginationController } from "./controllers/university/get-all-university";
  import { getUniversityController } from "./controllers/university/get-university";
  import { deleteUniversityController } from "./controllers/university/delete-university";
  import { updateUniversityController } from "./controllers/university/update-university";
  import { profile } from "./controllers/user/profile";
  import { refresh } from "./controllers/user/refresh";
  import { verifyUserRole } from "./middleware/verify-user-role";
  import { verifyJwt } from "./middleware/verify-jwt";
  import { createNews } from "./controllers/news/temp-news";
  import { getNpmData, getNpmDataWithoutLimit } from "./controllers/news/temp-npm";
  import { getUniversityByNameController } from "./controllers/university/get-university-by-name";
  import { followUniversityHandler, saveNewsHandler,  getNewsByUrlHandler, getSavedNewsByUserIdHandler, removeNewsHandler, unfollowUniversityHandler, getFollowedUniversitiesHandler  } from "./controllers/save/save";
  import { requestPasswordResetHandler, resetPasswordHandler } from "./controllers/user/update-password";

  declare module "fastify" {
    interface FastifyInstance {
      verifyJwt: typeof verifyJwt;
    }
  }

  export async function appRoutes(app: FastifyInstance) {
    // User routes
    app.post("/users", register);
    app.post("/sessions", authenticate);
    app.get("/users/:userId", getUserProfileController);
    app.get('/getallusers', { preValidation: [app.verifyJwt, verifyUserRole('ADMIN')] }, getAllUsersController);
    app.delete("/deleteuser/:id", { preValidation: [app.verifyJwt, verifyUserRole('ADMIN')] }, deleteUser);
    app.put("/users/:userId", updateUser);
    app.get("/me", { preValidation: [app.verifyJwt] }, profile);
    app.patch("/token/refresh", refresh);
    app.post("/password-reset/request", requestPasswordResetHandler);
    app.post('/password-reset/reset', resetPasswordHandler);


    // University routes
    app.post("/university", { preValidation: [app.verifyJwt, verifyUserRole('ADMIN')] }, registerUniversityController);
    app.get("/getalluniversity", getAllUniversityController);
    app.get("/univesitypagination", getAllUniversityWithPaginationController);
    app.get("/university/:id", getUniversityController);
    app.get('/getuniversityfollowed', getFollowedUniversitiesHandler);
    app.get<{ Params: { name: string } }>('/university/name/:name', getUniversityByNameController);
    app.delete("/deleteuniversity/:id", { preValidation: [app.verifyJwt, verifyUserRole('ADMIN')] }, deleteUniversityController);
    app.put("/university/:universityId", { preValidation: [app.verifyJwt, verifyUserRole('ADMIN')] }, updateUniversityController);
    app.delete("/unfollowuniversity", unfollowUniversityHandler);

    // News routes
    app.post('/news', createNews);
    app.get('/npm/:text', getNpmData);
    app.get('/npm/university/:text', getNpmDataWithoutLimit);
    app.get('/news/:url', getNewsByUrlHandler);

    // Save and follow routes
    app.post('/followuniversity', followUniversityHandler);
    app.post('/save-news', saveNewsHandler);
    app.get('/saved-news', getSavedNewsByUserIdHandler);
    app.delete('/remove-news', removeNewsHandler)
    
  }
