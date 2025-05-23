import { LogDatasource } from "../../../src/domain/datasources/log.datasource";
import {
  LogEntity,
  LogSeverityLevel,
} from "../../../src/domain/entities/log.entity";
describe("Test on abstract class LogDatasource ", () => {
  const newLog = new LogEntity({
    createdAt: new Date("2025-05-08T20:02:45.795Z"),
    message: "https://google.com is working",
    level: LogSeverityLevel.low,
    origin: "check-services.ts",
  });
  class MockLogDatasource extends LogDatasource {
    async saveLog(log: any): Promise<void> {
      return;
    }
    async getLogs(severityLevel: any): Promise<LogEntity[]> {
      return [newLog];
    }
  }
  test("should initialize one class whith abstract class LogDatasource ", () => {
    const mockLogDatasource = new MockLogDatasource();
    expect(mockLogDatasource).toBeInstanceOf(MockLogDatasource);
  });
  test("should implements their method saveLog and getLogs ", () => {
    const mockLogDatasource = new MockLogDatasource();
    const saveLogSpy = jest.spyOn(mockLogDatasource, "saveLog");
    const getLogsSpy = jest.spyOn(mockLogDatasource, "getLogs");
    mockLogDatasource.saveLog(newLog);
    mockLogDatasource.getLogs(LogSeverityLevel.low);
    expect(saveLogSpy).toHaveBeenCalledWith(newLog);
    expect(getLogsSpy).toHaveBeenCalledWith(LogSeverityLevel.low);
  });
});
