"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
require("dotenv/config");
(0, dotenv_1.config)({ debug: true });
// mongoDb Access keys
const USER = process.env.DB_USER;
const PASSWORD = process.env.DB_PASSWORD;
const CLUSTER = process.env.DB_CLUSTER;
const URI = `mongodb+srv://${USER}:${PASSWORD}@${CLUSTER}.wadd7q8.mongodb.net/?authMechanism=SCRAM-SHA-1`;
const database_1 = require("./database");
// initialize database
const DATABASE = (0, database_1.ConnectDb)(URI);
const TODO_COLLECTION = DATABASE.collection("todo");
// initialize server
const express_1 = __importDefault(require("express"));
const SERVER = (0, express_1.default)();
const PORT = 8080;
// use parser middleware
SERVER.use(express_1.default.json());
SERVER.get("/todo", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        DATABASE.command({ ping: 1 })
            .then((pingResponse) => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, database_1.fetchTodo)(TODO_COLLECTION).then((todos) => {
                res.status(200).json({
                    ExpressConnected: true,
                    DatabaseConnected: { status: true, pingResponse },
                    todos: todos,
                });
            });
        }))
            .catch((pingResponse) => {
            res.status(200).json({
                ExpressConnected: true,
                DatabaseConnected: { status: false, pingResponse },
            });
        });
    }
    catch (err) {
        throw err;
    }
}));
SERVER.post("/todo/append", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, database_1.addTodo)(TODO_COLLECTION, req.body)
            .then((insertResult) => {
            res.status(200).json(insertResult);
        })
            .catch((rejectResult) => {
            res.status(200).json(rejectResult);
        });
    }
    catch (err) {
        throw err;
    }
}));
SERVER.get("/todo/delete/:_id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, database_1.deleteTodo)(TODO_COLLECTION, req.params._id).then((deleteResult) => {
            res.status(200).json(deleteResult);
        });
    }
    catch (err) {
        throw err;
    }
}));
SERVER.get("/todo/strike/:_id/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bool = req.query.strike === "true";
        yield (0, database_1.strikeTodo)(TODO_COLLECTION, req.params._id, bool).then((updateResult) => {
            res.status(200).json(updateResult);
        });
    }
    catch (err) {
        throw err;
    }
}));
SERVER.listen(PORT, () => {
    console.log(`listening at : http://localhost:${PORT}`);
});
