import { env } from "#/utils/env";
import { LogContext, Logger, LogLevel } from "../logger";

export class ConsoleLogger implements Logger {
  constructor(
    private appName = env?.VITE_APP_NAME || "unknown-app",
    private environment = env?.VITE_APP_ENV || "dev",
    private minLevel = LogLevel[env?.VITE_LOG_LEVEL as keyof typeof LogLevel] ||
      LogLevel.INFO
  ) {}

  private shouldLog(level: LogLevel): boolean {
    return level >= this.minLevel;
  }

  private formatMessage(
    level: LogLevel,
    message: string,
    context?: LogContext
  ) {
    return {
      timestamp: new Date().toISOString(),
      level: LogLevel[level],
      message,
      context,
      appName: this.appName,
      environment: this.environment,
    };
  }

  private output(level: LogLevel, message: string, context?: LogContext) {
    if (!this.shouldLog(level)) return;
    const logEntry = this.formatMessage(level, message, context);
    const logging: Record<LogLevel, (...args: any[]) => void> = {
      [LogLevel.ERROR]: console.error,
      [LogLevel.WARN]: console.warn,
      [LogLevel.INFO]: console.log,
      [LogLevel.DEBUG]: console.debug,
      [LogLevel.TRACE]: console.trace,
    };
    logging[level](logEntry);
  }

  trace(msg: string, ctx?: LogContext) {
    this.output(LogLevel.TRACE, msg, ctx);
  }
  debug(msg: string, ctx?: LogContext) {
    this.output(LogLevel.DEBUG, msg, ctx);
  }
  info(msg: string, ctx?: LogContext) {
    this.output(LogLevel.INFO, msg, ctx);
  }
  warn(msg: string, ctx?: LogContext) {
    this.output(LogLevel.WARN, msg, ctx);
  }
  error(msg: string, ctx?: LogContext) {
    this.output(LogLevel.ERROR, msg, ctx);
  }
}
