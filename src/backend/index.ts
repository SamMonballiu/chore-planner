import { Category, Chore } from "@/common/models";
import { CategoryPostmodel, ChorePostmodel } from "@/common/postmodels";
import cors from "cors";
import express from "express";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { DataContext } from "./repositoryContext";

const jsonFilePath = path.join(__dirname, "data.json");
const context = new DataContext(jsonFilePath);
context.initialize();

const app = express();
app.use(express.static(__dirname + "/public"));
const port = 1904;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: function (origin, callback) {
      return callback(null, true);
    },
    optionsSuccessStatus: 200,
    credentials: true,
  })
);

app.listen(port, () => {
  return console.log("Server listening on port " + port);
});

app.get("/hello", (req, res) => {
  res.send(
    "hello from the api server. " + req.protocol + "://" + req.get("host")
  );
});

app.get("/api/chores", (_, res) => {
  res.send(context.models.chores.getAll());
});

app.post("/api/chores", (req, res) => {
  const postmodel = req.body as ChorePostmodel;
  const chore: Chore = {
    ...postmodel,
    id: uuidv4(),
  };

  context.models.chores.add(chore.id, chore);
  context.saveChanges();
  res.send(chore.id);
});

app.put("/api/chores/:id", async (req, res) => {
  const id = req.params["id"];
  const { name, owner, categoryId, repeatInterval } =
    req.body as ChorePostmodel;
  const updated: Chore = {
    id,
    name,
    owner,
    categoryId,
    repeatInterval,
  };
  context.models.chores.upsert(id, updated);
  await context.saveChanges();
  return res.status(200).send("OK");
});

app.get("/api/categories", (_, res) => {
  res.send(context.models.categories.getAll());
});

app.post("/api/categories", (req, res) => {
  const postmodel = req.body as CategoryPostmodel;
  const category: Category = {
    ...postmodel,
    id: uuidv4(),
  };

  context.models.categories.add(category.id, category);
  context.saveChanges();
  res.send(category.id);
});
