import nodemailer from "nodemailer";

export type ContactEmailInput = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export type EmailConfig = {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
  from: string;
  to: string;
};

export function getEmailConfig(env: NodeJS.ProcessEnv = process.env): EmailConfig {
  const host = env.EMAIL_HOST ?? "";
  const port = Number(env.EMAIL_PORT ?? "587");
  const user = env.EMAIL_USER ?? "";
  const pass = env.EMAIL_PASS ?? "";
  const from = (env.EMAIL_FROM ?? env.CONTACT_FROM ?? user) || "no-reply@example.com";
  const to = env.EMAIL_TO ?? env.CONTACT_TO ?? "";
  const secure = (env.EMAIL_SECURE ?? "true") === "true";

  return {
    host,
    port,
    secure,
    user,
    pass,
    from,
    to,
  };
}

export function buildContactEmail(input: ContactEmailInput, toAddress = "", fromAddress = "") {
  const cleanName = input.name.trim();
  const cleanEmail = input.email.trim();
  const cleanSubject = input.subject.trim() || "New enquiry from your website";
  const cleanMessage = input.message.trim();
  const finalTo = toAddress || getEmailConfig().to;
  const finalFrom = fromAddress || getEmailConfig().from;

  const text = [
    `Name: ${cleanName}`,
    `Email: ${cleanEmail}`,
    `Subject: ${cleanSubject}`,
    "",
    "Message:",
    cleanMessage,
  ].join("\n");

  const html = `
    <div style="font-family: Arial, sans-serif; color: #111827; line-height: 1.6;">
      <h2 style="margin: 0 0 16px;">New message from ${cleanName}</h2>
      <p><strong>Name:</strong> ${cleanName}</p>
      <p><strong>Email:</strong> <a href="mailto:${cleanEmail}">${cleanEmail}</a></p>
      <p><strong>Subject:</strong> ${cleanSubject}</p>
      <div style="margin-top: 16px; padding: 16px; background: #f3f4f6; border-radius: 8px;">
        ${cleanMessage.replace(/\n/g, "<br />")}
      </div>
    </div>
  `;

  return {
    from: finalFrom,
    to: finalTo,
    replyTo: cleanEmail,
    subject: cleanSubject,
    text,
    html,
  };
}

export async function sendContactEmail(input: ContactEmailInput, env: NodeJS.ProcessEnv = process.env) {
  const config = getEmailConfig(env);

  if (!config.host || !config.user || !config.pass || !config.to) {
    throw new Error(
      "Email delivery is not configured. Set EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS, and EMAIL_TO in your environment variables."
    );
  }

  const transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: {
      user: config.user,
      pass: config.pass,
    },
  });

  const mailOptions = buildContactEmail(input, config.to, config.from);
  const info = await transporter.sendMail(mailOptions);

  return { success: true, messageId: info.messageId };
}
