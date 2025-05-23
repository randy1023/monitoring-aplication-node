import { LogEntity } from "../../../../src/domain/entities/log.entity";
import { SendEmailLogs } from "../../../../src/domain/use-cases/email/send-email-logs";
import { EmailService } from "../../../../src/presentation/email/email-service";
describe("test on send-email-logs.ts", () => {
  const mockEmailService = new EmailService();
  const sendEmailWithFileSystemLogsMock = jest.spyOn(
    mockEmailService,
    "sendEmailWithFileSystemLogs"
  );
  const sendEmailSpy = jest.spyOn(mockEmailService, "sendEmail");
  const mockLogRepository = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  };
  const gmail = "testrunnify@gmail.com";
  afterEach(() => {
    jest.clearAllMocks();
  });
  const sendEmailLogs = new SendEmailLogs(mockEmailService, mockLogRepository);
  test("should call saveLog and sendEmailWithFilesSystem", async () => {
    const wasOk = await sendEmailLogs.execute(gmail);

    expect(wasOk).toBe(true);
    expect(mockLogRepository.saveLog).toHaveBeenCalledWith(
      expect.any(LogEntity)
    );
    expect(sendEmailWithFileSystemLogsMock).toHaveBeenCalledWith(gmail);
    expect(sendEmailSpy).toHaveBeenCalled();
  });
  test("should log in case of error", async () => {
    try {
      await sendEmailLogs.execute("7");

      expect(true).toBe(false);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(mockLogRepository.saveLog).toHaveBeenCalledTimes(1);
      expect(mockLogRepository.saveLog).toHaveBeenCalledWith(
        expect.any(LogEntity)
      );
    }

    // expect(mockLogRepository.saveLog).toHaveBeenCalledWith(
    //   expect.any(LogEntity)
    // );
    // expect(sendEmailWithFileSystemLogsMock).toHaveBeenCalledWith(gmail);
    // expect(sendEmailSpy).toHaveBeenCalled();
  });
});
