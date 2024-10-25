import axios from "axios";
import chalk from "chalk";
import { weatherStackAccessKey, weatherStackUrl } from "./config.js";

export const forecast = async (city) => {
  try {
    const { data } = await axios.get(`${weatherStackUrl}current`, {
      params: {
        access_key: weatherStackAccessKey,
        query: city,
      },
    });

    const { current } = data;
    if (current) {
      console.log(chalk.blue(`Weather: ${current.weather_descriptions[0]}`));
      console.log(chalk.blue(`Temperature: ${current.temperature}°C`));
      console.log(chalk.blue(`Feels Like: ${current.feelslike}°C`));
    } else {
      console.error(chalk.red("No weather data available."));
    }
  } catch (error) {
    console.error(chalk.red("Error fetching weather data:"), error.message);
  }
};
