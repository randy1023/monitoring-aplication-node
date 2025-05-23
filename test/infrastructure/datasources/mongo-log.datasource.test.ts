import mongoose from "mongoose";
import { envs } from "../../../src/config/plugins/envs.plugin";
import { MongoDatabase } from "../../../src/data/mongoDb/init";
import {
  LogEntity,
  LogSeverityLevel,
} from "../../../src/domain/entities/log.entity";
import { MongoLogDatasource } from "../../../src/infrastructure/index";
import { LogModel } from "../../../src/data/mongoDb";
import { SeverityLevel } from "../../../generated/prisma";

describe("test on MongoLogDatasource", () => {
  const mongoLogDatasource = new MongoLogDatasource();
  const log = new LogEntity({
    message: `test log`,
    level: LogSeverityLevel.low,
    origin: "mongo-log.datasource.test.ts",
  });
  beforeAll(async () => {
    await MongoDatabase.connect({
      dbName: envs.MONGO_DB_NAME,
      mongoUrl: envs.MONGO_URL,
    });
  });
  beforeEach(async () => {
    await LogModel.deleteMany();
  });
  afterAll(async () => {
    await mongoose.connection.close();
  });
  test("should create a log", async () => {
    const logSpy = jest.spyOn(console, "log");
    await mongoLogDatasource.saveLog(log);
    expect(logSpy).toHaveBeenCalled();
    expect(logSpy).toHaveBeenCalledWith(
      "Mongo log Created:",
      expect.any(String)
    );
  });

  test("should gets logs by severetyLevel", async () => {
    await mongoLogDatasource.saveLog(log);
    const logs = await mongoLogDatasource.getLogs(LogSeverityLevel.low);
    expect(logs).toBeInstanceOf(Array);
    expect(logs[0]).toBeInstanceOf(LogEntity);
    expect(logs.length).toBeGreaterThan(0);
  });
});
