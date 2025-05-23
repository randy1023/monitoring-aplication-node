import { MongoDatabase } from "../../src/data/mongoDb/init";
import { envs } from "../../src/config/plugins/envs.plugin";
import mongoose, { mongo } from "mongoose";
describe("Test on init mongoDatabase", () => {
  afterAll(async () => {
    await mongoose.connection.close();
  });
  test("should connect to MongoDb", async () => {
    const mongoDb = await MongoDatabase.connect({
      dbName: envs.MONGO_DB_NAME,
      mongoUrl: envs.MONGO_URL,
    });

    expect(mongoDb).toBeTruthy();
  });
  test("should throw error if mongodb no connected", async () => {
    try {
      await MongoDatabase.connect({
        dbName: envs.MONGO_DB_NAME,
        mongoUrl: envs.MONGO_URL + "test",
      });
      expect(true).toBe(false);
    } catch (error) {
      expect(error).toBeTruthy();
    }

    // ANOTHER WAY TO TEST THIS CASE
    
    // MongoDatabase.connect({
    //   dbName: envs.MONGO_DB_NAME,
    //   mongoUrl: envs.MONGO_URL + "test",
    // }).catch((err) => {
    //   expect(err).toBeTruthy();
    //   done();
    // });
  });

  
});
