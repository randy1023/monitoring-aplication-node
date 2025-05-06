import { LogModel } from "../../data/mongoDb";
import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

export class MongoLogDatasource implements LogDatasource {
  async saveLog(log: LogEntity): Promise<void> {
    const newLogs = await LogModel.create(log);
    await newLogs.save();
    console.log("Mongo log Created:", newLogs.id);
  }
  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    const logs = await LogModel.find({ level: severityLevel });

    return logs.map((mongoLog) => LogEntity.fromObject(mongoLog));
  }
}
