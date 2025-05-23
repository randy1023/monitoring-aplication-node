import {
  LogEntity,
  LogSeverityLevel,
} from "../../../src/domain/entities/log.entity";
import { LogRepository } from "../../../src/domain/repositories/log.repository";
import { LogImplRepository } from "../../../src/infrastructure/index";
describe("test on LogRepositoryImpl", () => {
  const log = new LogEntity({
    message: `test log`,
    level: LogSeverityLevel.low,
    origin: "log.respository.impl.test.ts",
  });
  const mockLogDatasource = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  };
  const logRepositoryImpl = new LogImplRepository(mockLogDatasource);

  afterEach(() => {
    jest.clearAllMocks();
  });
  test("should LogRepositoryImpl call saveLog method", async () => {
    await logRepositoryImpl.saveLog(log);
    expect(mockLogDatasource.saveLog).toHaveBeenCalledTimes(1);
    expect(mockLogDatasource.saveLog).toHaveBeenCalledWith(log);
    expect(mockLogDatasource.getLogs).not.toHaveBeenCalled();
  });
  test("should LogRepositoryImpl call getLog method", async () => {
    await logRepositoryImpl.getLogs(log.level);
    expect(mockLogDatasource.saveLog).not.toHaveBeenCalled();
    expect(mockLogDatasource.getLogs).toHaveBeenCalledWith(log.level);
    expect(mockLogDatasource.getLogs).toHaveBeenCalledTimes(1);
  });
});
