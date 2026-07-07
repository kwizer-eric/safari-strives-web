import { logger } from "@/common/logger";

export type EmailMessage = {
  to: string;
  subject: string;
  body: string;
};

export interface EmailProvider {
  send(message: EmailMessage): Promise<void>;
}

export const consoleEmailProvider: EmailProvider = {
  async send(message) {
    logger.info("email.send", {
      to: message.to,
      subject: message.subject,
    });
  },
};
