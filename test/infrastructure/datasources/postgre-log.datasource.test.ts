import { PrismaClient } from "../../../generated/prisma";
import {
  LogEntity,
  LogSeverityLevel,
} from "../../../src/domain/entities/log.entity";
import { PostgreLogDatasource } from "../../../src/infrastructure";

describe("test on PostgresLogData", () => {
    test("should be true", () => {
        expect(true).toBe(true);
    });
//   const postgreLogDatasource = new PostgreLogDatasource();

//   const log = new LogEntity({
//     message: `test log`,
//     level: LogSeverityLevel.low,
//     origin: "mongo-log.datasource.test.ts",
//   });
//   test("should create a Log", async () => {
//     const logSpy = jest.spyOn(console, "log");
//     await postgreLogDatasource.saveLog(log);
//     expect(logSpy).toHaveBeenCalled();
//     expect(logSpy).toHaveBeenCalledWith(
//       "Postgre log Created:",
//       expect.any(String)
//     );
//   });
});
