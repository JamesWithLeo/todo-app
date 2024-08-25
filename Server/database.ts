import { config } from "dotenv";
import "dotenv/config";
config({ debug: true });

import {
  Collection,
  Db,
  Document,
  MongoClient,
  ServerApiVersion,
  WithId,
  ObjectId,
} from "mongodb";

export const ConnectDb = (uri: string): Db => {
  try {
    const client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
    return client.db("TodoApp");
  } catch (err) {
    throw err;
  }
};

export async function fetchTodo(coll: Collection): Promise<WithId<Document>[]> {
  try {
    return await coll.find().toArray();
  } catch (err) {
    throw err;
  }
}
export async function addTodo(coll: Collection, doc: Document) {
  try {
    return await coll.insertOne(doc);
  } catch (err) {
    throw err;
  }
}

export async function deleteTodo(coll: Collection, _id: string) {
  try {
    return await coll.findOneAndDelete({
      // prettier-ignore
      "_id": new ObjectId(_id),
    });
  } catch (err) {
    throw err;
  }
}

export async function strikeTodo(
  coll: Collection,
  _id: string,
  strike: boolean,
) {
  try {
    // prettier-ignore
    const bool = strike ?? false
    return await coll.updateOne(
      { _id: new ObjectId(_id) },
      { $set: { status: bool } },
    );
  } catch (err) {
    throw err;
  }
}
