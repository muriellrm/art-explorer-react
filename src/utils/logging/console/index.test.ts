import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

function mockEnv(overrides: Record<string, any>) {
  vi.doMock("#/utils/env", () => ({
    env: {
      VITE_APP_NAME: "TestApp",
      VITE_APP_ENV: "test",
      VITE_LOG_LEVEL: "TRACE",
      ...overrides,
    },
  }));
}

describe("ConsoleLogger", () => {
  let consoleErrorSpy: any;
  let consoleLogSpy: any;

  beforeEach(() => {
    consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    consoleLogSpy = vi.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.resetModules();
    vi.restoreAllMocks();
  });

  it("should log messages when level is >= minLevel", async () => {
    mockEnv({ VITE_LOG_LEVEL: "DEBUG" });
    const { ConsoleLogger } = await import("./");

    const logger = new ConsoleLogger();
    logger.info("Info message");
    logger.error("Error message");

    expect(consoleLogSpy).toHaveBeenCalledWith(
      expect.objectContaining({ message: "Info message", level: "INFO" })
    );
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      expect.objectContaining({ message: "Error message", level: "ERROR" })
    );
  });

  it("should not log messages below minLevel", async () => {
    mockEnv({ VITE_LOG_LEVEL: "ERROR" });
    const { ConsoleLogger } = await import("./");

    const logger = new ConsoleLogger();
    logger.info("Should not be logged");

    expect(consoleLogSpy).not.toHaveBeenCalled();
  });

  it("should include appName and environment in log entry", async () => {
    mockEnv({ VITE_APP_NAME: "CustomApp", VITE_APP_ENV: "dev" });
    const { ConsoleLogger } = await import("./");

    const logger = new ConsoleLogger();
    logger.error("Test message");

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        appName: "CustomApp",
        environment: "dev",
      })
    );
  });

  it("should log context object when provided", async () => {
    mockEnv({});
    const { ConsoleLogger } = await import("./");

    const logger = new ConsoleLogger();
    logger.error("With context", { userId: 123 });

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "With context",
        context: { userId: 123 },
      })
    );
  });
});
