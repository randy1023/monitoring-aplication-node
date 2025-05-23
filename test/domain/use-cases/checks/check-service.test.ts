import { LogEntity } from "../../../../src/domain/entities/log.entity";
import { CheckService } from "../../../../src/domain/use-cases/checks/check-service";

describe("test on check-service.ts", () => {
  const mockLogRepository = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  };
  const successCallback = jest.fn();
  const errorCallback = jest.fn();
  const checkService = new CheckService(
    mockLogRepository,
    successCallback,
    errorCallback
  );
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should call successCallback when fetch returns true", async () => {
    const wasOk = await checkService.execute("https://google.com");
    expect(wasOk).toBe(true);
    expect(successCallback).toHaveBeenCalledTimes(1);
    expect(errorCallback).not.toHaveBeenCalled();
    expect(mockLogRepository.saveLog).toHaveBeenCalledWith(
      expect.any(LogEntity)
    );
  });
  test("should call errorCallback when fetch returns false", async () => {
    const wasNotOk = await checkService.execute("https://googleugugu.com");
    expect(wasNotOk).toBe(false);
    expect(errorCallback).toHaveBeenCalledTimes(1);
    expect(successCallback).not.toHaveBeenCalled();
    expect(mockLogRepository.saveLog).toHaveBeenCalledWith(
      expect.any(LogEntity)
    );
  });
});
