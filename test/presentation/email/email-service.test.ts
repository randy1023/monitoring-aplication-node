import nodemailer from "nodemailer";
import {
  EmailService,
  type Attachments,
  type SendEmailOptions,
} from "../../../src/presentation/email/email-service";
describe("test on email-service.ts", () => {
  const gmail = "testrunnify@gmail.com";
  const mockSendMail = jest.fn();
  // Mock the nodemailer createTransport method
  nodemailer.createTransport = jest.fn().mockReturnValue({
    sendMail: mockSendMail,
  });
  const emailService = new EmailService();

  afterEach(() => {
    jest.clearAllMocks();
  });
  test("should send an email", async () => {
    const options: SendEmailOptions = {
      to: gmail,
      subject: "Test email",
      htmlBody: "<h1>Test</h1>",
    };

    const emailSent = await emailService.sendEmail(options);
    expect(emailSent).toBe(true);
    expect(mockSendMail).toHaveBeenCalledWith(
      expect.objectContaining({
        to: options.to,
        subject: options.subject,
        html: options.htmlBody,
      })
    );
  });
  test("should send an email with attachments", async () => {
    await emailService.sendEmailWithFileSystemLogs(gmail);

    expect(mockSendMail).toHaveBeenCalledWith(
      expect.objectContaining({
        to: gmail,
        subject: "Logs del servidor",
        attachments: expect.arrayContaining([
          expect.objectContaining({
            filename: "logs-all.log",
            path: "./logs/logs-all.log",
          }),
        ]),
      })
    );
  });
});
