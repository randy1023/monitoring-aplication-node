import { LogDatasource } from "../domain/datasources/log.datasource";
import { LogSeverityLevel } from "../domain/entities/log.entity";
import { LogRepository } from "../domain/repositories/log.repository";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { fileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { MongoLogDatasource } from "../infrastructure/datasources/mongo-log.datasource";
import { LogImplRepository } from "../infrastructure/repositories/log-impl.repository";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email-service";
const logImpRepository = new LogImplRepository(
  //new fileSystemDatasource()
  new MongoLogDatasource()
);
const emailService = new EmailService();
export class Server {
  public static async start() {
    console.log("Server started......");

    // SEND EMAIL
    // new SendEmailLogs(emailService, fileSystemImpRepository).execute(
    //   "testrunnify@gmail.com"
    // );

    const logs = await logImpRepository.getLogs(LogSeverityLevel.low);
    console.log(logs);
    // CronService.createJob("*/5 * * * * *", () => {
    //   const url = "https://google.com";
    //   // const url = "http://localhost:3000";
    //   new CheckService(
    //     logImpRepository,
    //     () => console.log(`${url} is ok`),
    //     (error) => console.log(error)
    //   ).execute(url);
    //   // new CheckService().execute("http://localhost:3000");
    // });
  }
}
