const { MongoMemoryServer } = require("mongodb-memory-server");
const { MongoClient } = require("mongodb");
const data = require("./data");

let database = null;

const mongo = new MongoMemoryServer();

async function startDatabase() {
  const mongoDBURL = await mongo.getUri();
  const connection = await MongoClient.connect(mongoDBURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  //Seed Database
  if (!database) {
    database = connection.db();
    await database.collection("webhooks").insertMany(data.Webhooks);
  }

  return database;
}

async function stopDatabase() {
  await mongo.stop();
}

module.exports = {
  startDatabase,
  stopDatabase
};