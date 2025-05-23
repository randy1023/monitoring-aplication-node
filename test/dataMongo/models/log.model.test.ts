import mongoose from "mongoose";
import { envs } from "../../../src/config/plugins/envs.plugin";
import { LogModel, MongoDatabase } from "../../../src/data/mongoDb";

describe("test on log.model.ts", () => {
  const log = {
    message: "https://google.com is working",
    level: "low",
    createdAt: "2025-05-08T20:02:45.795Z",
    origin: "check-services.ts",
  };
  beforeAll(async () => {
    await MongoDatabase.connect({
      dbName: envs.MONGO_DB_NAME,
      mongoUrl: envs.MONGO_URL,
    });
  });

  test("should return a log", async () => {
    const newLog = await LogModel.create(log);
    expect(newLog).toBeTruthy();
    expect(newLog).toEqual(
      expect.objectContaining({
        ...log,
        createdAt: expect.any(Date),
        id: expect.any(String),
      })
    );

    await LogModel.findByIdAndDelete(newLog.id);
    // expect(newLog).toMatchObject(
    //   expect.objectContaining({
    //     message: "https://google.com is working",
    //     origin: "check-services.ts",
    //     level: "low",
    //     createdAt: new Date("2025-05-08T20:02:45.795Z"),
    //     __v: 0,
    //   })
    // );
  });
  test("should return the schema object", () => {
    const schema = LogModel.schema.obj;
    expect(schema).toEqual(
      expect.objectContaining({
        message: { type: expect.any(Function), required: true },
        origin: { type: expect.any(Function) },
        level: {
          type: expect.any(Function),
          enum: ["low", "medium", "high"],
          default: "low",
        },
        createdAt: { type: expect.any(Function), default: expect.any(Date) },
      })
    );
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });
});
