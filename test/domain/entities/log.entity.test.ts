import {
  LogEntity,
  LogSeverityLevel,
} from "../../../src/domain/entities/log.entity";

describe("test on log.entity.ts", () => {
  const jsonData = `{"message":"https://google.com is working","level":"low","createdAt":"2025-05-08T20:02:45.795Z","origin":"check-services.ts"}`;
  const object = {
    message: "https://google.com is working",
    level: "low",
    createdAt: "2025-05-08T20:02:45.795Z",
    origin: "check-services.ts",
  };
  const dataObj = {
    message: "https://google.com is working",
    level: LogSeverityLevel.low,
    origin: "check-services.ts",
  };
  test("should created a LogEntity instance", () => {
    const log = new LogEntity(dataObj);

    expect(log).toBeInstanceOf(LogEntity);
    expect(log.message).toBe(dataObj.message);
    expect(log.level).toBe(dataObj.level);
    expect(log.origin).toBe(dataObj.origin);
    expect(log.createdAt).toBeInstanceOf(Date);
  });

  test("should create a LogEntity instance from json ", () => {
    const newLogEntity = LogEntity.fromJson(jsonData);
    expect(newLogEntity).toBeInstanceOf(LogEntity);
    expect(newLogEntity.message).toBe("https://google.com is working");
    expect(newLogEntity.level).toBe("low");
    expect(newLogEntity.origin).toBe("check-services.ts");
    expect(newLogEntity.createdAt).toBeInstanceOf(Date);
  });
  test("should create a LogEntity instance from object ", () => {
    const newLogEntity = LogEntity.fromObject(object);

    expect(newLogEntity).toBeInstanceOf(LogEntity);
    expect(newLogEntity.message).toBe(object.message);
    expect(newLogEntity.level).toBe(object.level);
    expect(newLogEntity.origin).toBe(object.origin);
    expect(newLogEntity.createdAt).toBeInstanceOf(Date);
  });
});
