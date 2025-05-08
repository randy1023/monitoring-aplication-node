import { envs } from "./config/plugins/envs.plugin";
import { MongoDatabase } from "./data/mongoDb/";
import { Server } from "./presentation/server";
import { PrismaClient } from "./../generated/prisma";
(async () => {
  main();
})();

async function main() {
  const { MONGO_DB_NAME, MONGO_URL } = envs;
  await MongoDatabase.connect({ mongoUrl: MONGO_URL, dbName: MONGO_DB_NAME });

  //const prisma = new PrismaClient();
  // const newLog = await prisma.logModel.create({
  //   data: {
  //     level: "HIGH",
  //     message: "Test message 3",
  //     origin: "App.ts",
  //   },
  // });

  // console.log({ newLog });
  // const logs = await prisma.logModel.findMany({
  //   where: {
  //     level: "HIGH",
  //   },
  // });
  //console.log({ logs });
  Server.start();
}
