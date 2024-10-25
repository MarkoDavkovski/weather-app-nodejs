import * as dotenv from "dotenv";

dotenv.config();

export const weatherStackAccessKey = process.env.WEATHERSTACK_ACCESS_TOKEN;
export const weatherStackUrl = process.env.WEATHERSTACK_API_URL;
