export enum LogSeverityLevel {
  low = "low",
  medium = "medium",
  high = "high",
}
export interface LogEntityOptions {
  level: LogSeverityLevel;
  message: string;
  createdAt?: Date;
  origin: string;
}

export class LogEntity {
  public level: LogSeverityLevel; // enum
  public message: string;
  public createdAt: Date;
  public origin: string;

  constructor({
    level,
    message,
    origin,
    createdAt = new Date(),
  }: LogEntityOptions) {
    this.message = message;
    this.level = level;
    this.createdAt = createdAt;
    this.origin = origin;
  }

  static fromJson = (json: string): LogEntity => {
    const { message, level, createdAt, origin } = JSON.parse(json);
    const log = new LogEntity({ message, level, origin, createdAt });
    return log;
  };
}
