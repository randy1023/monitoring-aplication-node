import { LogDatasource } from "../domain/datasources/log.datasource";
import { LogRepository } from "../domain/repositories/log.repository";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { fileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { LogImplRepository } from "../infrastructure/repositories/log-impl.repository";
import { CronService } from "./cron/cron-service";
const fileSystemImpRepository = new LogImplRepository(
  new fileSystemDatasource()
);
export class Server {
  public static start() {
    console.log("Server started...");

    CronService.createJob("*/5 * * * * *", () => {
      const url = "https://google.com";
      // const url = "http://localhost:3000";
      new CheckService(
        fileSystemImpRepository,
        () => console.log(`${url} is ok`),
        (error) => console.log(error)
      ).execute(url);
      // new CheckService().execute("http://localhost:3000");
    });
  }
}
