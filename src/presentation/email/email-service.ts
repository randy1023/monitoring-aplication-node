import nodemailer from "nodemailer";
import { envs } from "../../config/plugins/envs.plugin";
const htmlBodyTemplate = `
  <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
    <h3 style="color: #007bff; margin-bottom: 10px;">¡Novedades Importantes del Sistema!</h3>
    <p style="margin-bottom: 15px;">
      Estimado usuario,
      <br><br>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </p>

    <div style="margin-bottom: 20px;">
      <a
        href="[LINK_AQUI]"
        style="display: inline-block; background-color: #28a745; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;"
      >
        Ver Detalles Ahora
      </a>
    </div>

    <p style="font-size: 0.9em; color: #777;">
      Para más información, por favor revise los documentos adjuntos o visite nuestro <a href="[LINK_A_NUESTRO_SITIO]" style="color: #007bff; text-decoration: none;">sitio web</a>.
    </p>

    <hr style="border: 1px solid #eee; margin-top: 30px; margin-bottom: 20px;">

    <p style="font-size: 0.8em; color: #999;">
      Este es un mensaje automático del sistema. Por favor, no responda a este correo.
    </p>
  </div>
`;

interface SendEmailOptions {
  to: string | string[];
  subject: string;
  htmlBody: string;
  attachments?: Attachments[];
}

interface Attachments {
  filename: string;
  path: string;
}
export class EmailService {
  private trasnporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_SECRET_KEY,
    },
  });

  constructor() {}

  async sendEmail(options: SendEmailOptions): Promise<boolean> {
    const { to, htmlBody, subject, attachments = [] } = options;
    try {
      const sendInformation = await this.trasnporter.sendMail({
        to,
        subject,
        html: htmlBody,
        attachments,
      });

      console.log(sendInformation);
      return true;
    } catch (error) {
      return false;
    }
  }

  async sendEmailWithFileSystemLogs(to: string | string[]) {
    const subject = "Logs del servidor";
    const attachments: Attachments[] = [
      { filename: "logs-all.log", path: "./logs/logs-all.log" },
      { filename: "logs-high.log", path: "./logs/logs-high.log" },
      { filename: "logs-medium.log", path: "./logs/logs-medium.log" },
    ];
    return this.sendEmail({
      to,
      subject,
      attachments,
      htmlBody: htmlBodyTemplate,
    });
  }
}
