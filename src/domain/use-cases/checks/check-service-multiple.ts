import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repositories/log.repository";

interface CheckServiceMultipleUseCase {
  execute(url: string): Promise<boolean>;
}
type SuccesCallback = () => void;
type ErrorCallback = (error: string) => void;

export class CheckServiceMultiple implements CheckServiceMultipleUseCase {
  constructor(
    private readonly logRepositories: LogRepository[],
    private readonly succesCallback?: SuccesCallback,
    private readonly errorCallback?: ErrorCallback
  ) {}
  private mapLogRepositories(log: LogEntity) {
    this.logRepositories.map((logRepository) => {
      logRepository.saveLog(log);
    });
  }
  async execute(url: string): Promise<boolean> {
    try {
      const req = await fetch(url);
      if (!req.ok) {
        throw new Error(`Error on check service ${url}`);
      }
      const log = new LogEntity({
        message: `${url} is working`,
        level: LogSeverityLevel.low,
        origin: "check-services.ts",
      });
      this.mapLogRepositories(log);
      this.succesCallback && this.succesCallback();
      return true;
    } catch (error) {
      const errorMessage = `${url} is not ok. ${error}`;
      const log = new LogEntity({
        message: errorMessage,
        level: LogSeverityLevel.high,
        origin: "check-services.ts",
      });
      this.mapLogRepositories(log);
      this.errorCallback && this.errorCallback(errorMessage);

      return false;
    }
  }
}
