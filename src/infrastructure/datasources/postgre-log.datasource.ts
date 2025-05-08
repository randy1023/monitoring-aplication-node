import { PrismaClient, SeverityLevel } from "./../../../generated/prisma";
import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

const prisma = new PrismaClient();

function mapSeverityLevelToPrisma(
  severityLevel: LogSeverityLevel
): SeverityLevel {
  switch (severityLevel) {
    case LogSeverityLevel.low:
      return "LOW";
    case LogSeverityLevel.medium:
      return "MEDIUM";
    case LogSeverityLevel.high:
      return "HIGH";
    default:
      throw new Error(`${severityLevel} not implement`);
  }
}
// otra manera de hacerlo de mapeo de difentes enums
// const severityLevelMap = {
//   low: SeverityLevel.LOW,
//   medium: SeverityLevel.MEDIUM,
//   high: SeverityLevel.HIGH,
// };

export class PostgreLogDatasource implements LogDatasource {
  async saveLog(log: LogEntity): Promise<void> {
    // const level = severityLevelMap[log.level];
    const newLog = await prisma.logModel.create({
      data: {
        ...log,
        level: mapSeverityLevelToPrisma(log.level),
      },
    });
    console.log("Postgre log Created:", newLog.id);
  }
  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    const logs = await prisma.logModel.findMany({
      where: {
        level: mapSeverityLevelToPrisma(severityLevel),
      },
    });

    return logs.map((log) => LogEntity.fromObject(log));
  }
}
