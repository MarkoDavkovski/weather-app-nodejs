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

//Routes
app.get("/", (req, res) => {
  res.render("index", { title: "Weather", name: "Marko" });
});

app.get("/weather", async (req, res) => {
  const cityParam = req.query.city;
  if (!cityParam) {
    return res.status(400).json({ error: "Please provide a city." });
  }

  const forecastData = await forecast(cityParam);
  if (!forecastData) {
    return res.status(404).json({ error: "No data found for requested city" });
  }

  res.status(200).json(forecastData);
});

app.get("/help", (req, res) => {
  res.render("help", { title: "Help Me", name: "Marko" });
});
app.get("/about", (req, res) => {
  res.render("about", { title: "About me", name: "Marko" });
});
// Handle undefined routes
app.get("/help/*", (req, res) => {
  res.status(404).render("errorPage", {
    title: "Error 404. Page not found!",
    name: "Marko",
  });
});

app.get("*", (req, res) => {
  res.render("errorPage", {
    title: "Error 404. Page not found!",
    name: "Marko",
  });
});

//Start server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
