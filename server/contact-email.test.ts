import { describe, expect, it, vi } from "vitest";
import { buildContactEmail, getEmailConfig } from "./_core/email";

describe("contact email service", () => {
  it("reads SMTP settings from environment", () => {
    vi.stubEnv("EMAIL_HOST", "smtp.gmail.com");
    vi.stubEnv("EMAIL_PORT", "587");
    vi.stubEnv("EMAIL_USER", "me@example.com");
    vi.stubEnv("EMAIL_PASS", "secret");
    vi.stubEnv("EMAIL_TO", "hello@yourdomain.com");

    expect(getEmailConfig()).toMatchObject({
      host: "smtp.gmail.com",
      port: 587,
      user: "me@example.com",
      pass: "secret",
      to: "hello@yourdomain.com",
    });
  });

  it("builds a complete email message from visitor input", () => {
    const payload = {
      name: "Jane Doe",
      email: "jane@example.com",
      subject: "Project inquiry",
      message: "I want to build a new product.",
    };

    const result = buildContactEmail(payload);

    expect(result.subject).toBe("Project inquiry");
    expect(result.to).toBe("hello@yourdomain.com");
    expect(result.html).toContain("Jane Doe");
    expect(result.html).toContain("jane@example.com");
    expect(result.text).toContain("Project inquiry");
  });
});
