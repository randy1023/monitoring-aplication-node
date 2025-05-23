import fs from "fs";
import path from "path";
import { FileSystemDatasource } from "../../../src/infrastructure";
import {
  LogEntity,
  LogSeverityLevel,
} from "../../../src/domain/entities/log.entity";

describe("test on FileSystemDatasource", () => {
  const logPath = path.join(__dirname, "../../../logs");
  const log = new LogEntity({
    message: `test log`,
    level: LogSeverityLevel.low,
    origin: "postgres-log.datasource.test.ts",
  });
  const log2 = new LogEntity({
    message: `test log`,
    level: LogSeverityLevel.medium,
    origin: "postgres-log.datasource.test.ts",
  });
  const log3 = new LogEntity({
    message: `test log`,
    level: LogSeverityLevel.high,
    origin: "postgres-log.datasource.test.ts",
  });

  beforeEach(() => {
    fs.rmSync(logPath, { recursive: true, force: true });
    jest.clearAllMocks();
  });
  test("should create log files if they do not exist", () => {
    new FileSystemDatasource();
    const files = fs.readdirSync(logPath);
    expect(files.length).toBeGreaterThan(0);
    expect(files).toEqual(["logs-all.log", "logs-high.log", "logs-medium.log"]);
  });

  test("should save a log in all logs-file", () => {
    const fileSystemDatasource = new FileSystemDatasource();
    const fsAppendFileSyncSpy = jest.spyOn(fs, "appendFileSync");
    fileSystemDatasource.saveLog(log);
    const allLogs = fs.readFileSync(`${logPath}/logs-all.log`, "utf-8");
    expect(fsAppendFileSyncSpy).toHaveBeenCalledTimes(1);
    expect(fsAppendFileSyncSpy).toHaveBeenCalledWith(
      "logs/logs-all.log",
      expect.any(String)
    );
    expect(allLogs).toContain(JSON.stringify(log));
  });
  test("should save a log in logs-all.log and logs-medium.log ", () => {
    const fileSystemDatasource = new FileSystemDatasource();
    const fsAppendFileSyncSpy = jest.spyOn(fs, "appendFileSync");
    fileSystemDatasource.saveLog(log2);
    const allLogs = fs.readFileSync(`${logPath}/logs-all.log`, "utf-8");
    const mediumLogs = fs.readFileSync(`${logPath}/logs-medium.log`, "utf-8");
    expect(fsAppendFileSyncSpy).toHaveBeenCalledTimes(2);

    expect(allLogs).toContain(JSON.stringify(log2));
    expect(mediumLogs).toContain(JSON.stringify(log2));
  });

  test("should save a log in logs-all.log and logs-high.log ", () => {
    const fileSystemDatasource = new FileSystemDatasource();
    const fsAppendFileSyncSpy = jest.spyOn(fs, "appendFileSync");
    fileSystemDatasource.saveLog(log3);
    const allLogs = fs.readFileSync(`${logPath}/logs-all.log`, "utf-8");
    const highLogs = fs.readFileSync(`${logPath}/logs-high.log`, "utf-8");
    expect(fsAppendFileSyncSpy).toHaveBeenCalledTimes(2);
    expect(allLogs).toContain(JSON.stringify(log3));
    expect(highLogs).toContain(JSON.stringify(log3));
  });

  test("should get all logs", async () => {
    const fileSystemDatasource = new FileSystemDatasource();
    fileSystemDatasource.saveLog(log);
    fileSystemDatasource.saveLog(log2);
    fileSystemDatasource.saveLog(log3);
    const allLogs = await fileSystemDatasource.getLogs(log.level);
    const mediumLogs = await fileSystemDatasource.getLogs(log2.level);
    const highLogs = await fileSystemDatasource.getLogs(log3.level);

    expect(allLogs).toEqual(expect.arrayContaining([log, log2, log3]));
    expect(mediumLogs).toEqual(expect.arrayContaining([log2]));
    expect(highLogs).toEqual(expect.arrayContaining([log3]));
  });
});
