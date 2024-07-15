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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectDb = void 0;
exports.fetchTodo = fetchTodo;
exports.addTodo = addTodo;
exports.deleteTodo = deleteTodo;
exports.strikeTodo = strikeTodo;
exports.updateTodo = updateTodo;
const dotenv_1 = require("dotenv");
require("dotenv/config");
(0, dotenv_1.config)({ debug: true });
const mongodb_1 = require("mongodb");
const ConnectDb = (uri) => {
    try {
        const client = new mongodb_1.MongoClient(uri, {
            serverApi: {
                version: mongodb_1.ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            },
        });
        return client.db("TodoApp");
    }
    catch (err) {
        throw err;
    }
};
exports.ConnectDb = ConnectDb;
function fetchTodo(coll) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield coll.find().toArray();
        }
        catch (err) {
            throw err;
        }
    });
}
function addTodo(coll, doc) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield coll.insertOne(doc);
        }
        catch (err) {
            throw err;
        }
    });
}
function deleteTodo(coll, _id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield coll.deleteOne({
                // prettier-ignore
                "_id": new mongodb_1.ObjectId(_id),
            });
        }
        catch (err) {
            throw err;
        }
    });
}
function strikeTodo(coll, _id, strike) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // prettier-ignore
            const bool = strike !== null && strike !== void 0 ? strike : false;
            return yield coll.updateOne({ _id: new mongodb_1.ObjectId(_id) }, { $set: { status: bool } });
        }
        catch (err) {
            throw err;
        }
    });
}
function updateTodo(coll, _id, doc) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield coll.updateOne({
                // prettier-ignore
                "_id": new mongodb_1.ObjectId(_id),
            }, doc);
        }
        catch (err) {
            throw err;
        }
    });
}
