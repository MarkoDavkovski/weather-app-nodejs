import chalk from "chalk";
import { forecast } from "./utils.js";

const location = process.argv[2];

const main = async () => {
  if (!location) {
    console.error(
      chalk.red(
        "Error: Please provide a location as an argument, e.g., `node app.js Skopje`"
      )
    );
    return;
  }
  try {
    await forecast(location);
  } catch (error) {
    console.error(chalk.red("Error:"), error.message);
  }
};

main();
