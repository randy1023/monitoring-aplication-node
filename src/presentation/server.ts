import { CheckServiceMultiple } from "../domain/use-cases/index";
import {
  fileSystemDatasource,
  LogImplRepository,
  MongoLogDatasource,
  PostgreLogDatasource,
} from "../infrastructure/index";
import { CronService, EmailService } from "./index";

const fsLogImpRepository = new LogImplRepository(new fileSystemDatasource());
const mongoLogImpRepository = new LogImplRepository(new MongoLogDatasource());
const postgreLogImpRepository = new LogImplRepository(
  new PostgreLogDatasource()
);
//const emailService = new EmailService();
export class Server {
  public static async start() {
    console.log("Server started......");

    // SEND EMAIL
    // new SendEmailLogs(emailService, fileSystemImpRepository).execute(
    //   "testrunnify@gmail.com"
    // );

    // CronService.createJob("*/5 * * * * *", () => {
    //   const url = "https://google.com";
    //   // const url = "http://localhost:3000";
    //   new CheckServiceMultiple(
    //     [fsLogImpRepository, mongoLogImpRepository, postgreLogImpRepository],
    //     () => console.log(`${url} is ok`),
    //     (error) => console.log(error)
    //   ).execute(url);
    //   // new CheckService().execute("http://localhost:3000");
    // });
  }
}
