import { app } from "./app";


app
  .listen({
    host: "0.0.0.0",
    port: process.env.PORT,
  })
  .then(() => console.log("🚀HTTP Server is running!"));
 
