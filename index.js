/* eslint-disable import/extensions */
import express from "express";
import bodyParser from "body-parser";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { todoItemsRoutes } from "./routes/todoItemsRoutes.js";

// eslint-disable-next-line no-underscore-dangle
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
export default app;

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.sendFile("/html/index.html", { root: path.join(__dirname, "/public/") });
});

app.use(express.static(path.resolve("public")));

app.use("/todoItems", todoItemsRoutes);

const hostname = "127.0.0.1";
const port = 3333;

app.listen(port, hostname, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running at http://${hostname}:${port}/`);
});
