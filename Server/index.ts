import { config } from "dotenv";
import "dotenv/config";
config({ debug: true });
// mongoDb Access keys
const USER = process.env.DB_USER;
const PASSWORD = process.env.DB_PASSWORD;
const CLUSTER = process.env.DB_CLUSTER;
const URI: string = `mongodb+srv://${USER}:${PASSWORD}@${CLUSTER}.wadd7q8.mongodb.net/?authMechanism=SCRAM-SHA-1`;

import {
  Collection,
  Db,
  WithId,
  Document,
  DeleteResult,
  UpdateResult,
} from "mongodb";
import {
  ConnectDb,
  fetchTodo,
  addTodo,
  deleteTodo,
  strikeTodo,
  updateTodo,
} from "./database";
// initialize database
const DATABASE: Db = ConnectDb(URI);
const TODO_COLLECTION: Collection = DATABASE.collection("todo");

// initialize server
import express from "express";
const SERVER = express();
const PORT: Number = 8080;
// use parser middleware
SERVER.use(express.json());
SERVER.get("/todo", async (req, res) => {
  try {
    DATABASE.command({ ping: 1 })
      .then(async (pingResponse) => {
        await fetchTodo(TODO_COLLECTION).then((todos: WithId<Document>[]) => {
          res.status(200).json({
            ExpressConnected: true,
            DatabaseConnected: { status: true, pingResponse },
            todos: todos,
          });
        });
      })
      .catch((pingResponse) => {
        res.status(200).json({
          ExpressConnected: true,
          DatabaseConnected: { status: false, pingResponse },
        });
      });
  } catch (err) {
    throw err;
  }
});
SERVER.post("/todo/append", async (req, res) => {
  try {
    await addTodo(TODO_COLLECTION, req.body)
      .then((insertResult) => {
        res.status(200).json(insertResult);
      })
      .catch((rejectResult) => {
        res.status(200).json(rejectResult);
      });
  } catch (err) {
    throw err;
  }
});
SERVER.get("/todo/delete/:_id", async (req, res) => {
  try {
    await deleteTodo(TODO_COLLECTION, req.params._id).then(
      (deleteResult: DeleteResult) => {
        res.status(200).json(deleteResult);
      },
    );
  } catch (err) {
    throw err;
  }
});
SERVER.put("/todo/update/:id", async (req, res) => {
  try {
    await updateTodo(TODO_COLLECTION, req.params.id, req.body).then(
      (updateResult) => {
        res.status(200).json(updateResult);
      },
    );
  } catch (err) {
    throw err;
  }
});

SERVER.get("/todo/strike/:_id/", async (req, res) => {
  try {
    const bool: boolean = req.query.strike === "true";
    await strikeTodo(TODO_COLLECTION, req.params._id, bool).then(
      (updateResult: UpdateResult) => {
        res.status(200).json(updateResult);
      },
    );
  } catch (err) {
    throw err;
  }
});

SERVER.listen(PORT, () => {
  console.log(`listening at : http://localhost:${PORT}`);
});
