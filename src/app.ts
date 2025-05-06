import { envs } from "./config/plugins/envs.plugin";
import {  MongoDatabase } from "./data/mongoDb/";
import { Server } from "./presentation/server";

(async () => {
  main();
})();

async function main() {
  const { MONGO_DB_NAME, MONGO_URL } = envs;
  await MongoDatabase.connect({ mongoUrl: MONGO_URL, dbName: MONGO_DB_NAME });

  Server.start();
}
