export declare global {
    namespace NodeJS {
      interface ProcessEnv {
        PORT: number,
        JWT_SECRET: string,
        NODE_ENV: "dev" | "test" | "production"	,
      }
    }
  }