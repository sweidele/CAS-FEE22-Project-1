import express from 'express';
import bodyParser from 'body-parser';
import path, {dirname} from 'path';
import { todoItemsRoutes } from './routes/todoItemsRoutes.js';

import {fileURLToPath} from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export const app = express();

app.use(bodyParser.json());

app.get("/", function (req, res) {
    res.sendFile("/html/index.html", {root: __dirname + '/public/'});
});

app.get("/scripts/controllers/controller.js", function (req, res) {
    res.sendFile("/scripts/controllers/controller.js", {root: __dirname + '/public/'});
});

app.get("/styles/index.css", function (req, res) {
    res.sendFile("/styles/index.css", {root: __dirname + '/public/'});
});

app.get("/scripts/services/todoItemModel.js", function (req, res) {
    res.sendFile("/scripts/services/todoItemModel.js", {root: __dirname + '/public/'});
});

app.get("/scripts/services/http-service.js", function (req, res) {
    res.sendFile("/scripts/services/http-service.js", {root: __dirname + '/public/'});
});

app.get("/scripts/services/data/itemRemoteStore.js", function (req, res) {
    res.sendFile("/scripts/services/data/itemRemoteStore.js", {root: __dirname + '/public/'});
});


app.use(express.static(path.resolve('public/html')));
app.use(express.static(path.resolve('public')));

app.use("/todoItems", todoItemsRoutes);
