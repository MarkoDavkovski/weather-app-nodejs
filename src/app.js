import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import hbs from "hbs";
import { forecast } from "../utils.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup handlebars engine and views location
app.set("views", viewsPath);
app.set("view engine", "hbs");
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("/", (req, res) => {
  res.render("index", { title: "Weather", name: "Marko" });
});

app.get("/weather", async (req, res) => {
  const cityParam = req.query.city;
  if (!req.query.city)
    return res.status(400).send("Error: Please provide a city.");

  try {
    const forecastData = await forecast(cityParam);
    if (!forecastData)
      return res.send({ message: "No data found for requested city" });
    res.send(forecastData);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.get("/help", (req, res) => {
  res.render("help", { title: "Help Me", name: "Marko" });
});
app.get("/help/*", (req, res) => {
  res.render("errorPage", { title: "Help article not found!", name: "Marko" });
});
app.get("/about", (req, res) => {
  res.render("about", { title: "About me", name: "Marko" });
});
app.get("*", (req, res) => {
  res.render("errorPage", {
    title: "Error 404. Page not found!",
    name: "Marko",
  });
});
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
