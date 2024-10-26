import * as dotenv from "dotenv";

dotenv.config();

export const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://weather-app-nodejs-three.vercel.app/";
