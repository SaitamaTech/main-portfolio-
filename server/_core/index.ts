import "dotenv/config";
import express from "express";
import { createServer } from "http";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./oauth";
import { publicPlatformScript } from "./publicConfig";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { sendContactEmail } from "./email";
import { serveStatic, setupVite } from "./vite";

async function startServer() {
  const app = express();
  const server = createServer(app);
  // Configure body parser with larger size limit for file uploads
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  app.get("/api/health", (_req, res) => res.json({ status: "ok" }));
  app.get("/api/platform/config.js", (_req, res) => {
    res.set("Cache-Control", "no-store").type("application/javascript").send(publicPlatformScript());
  });
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, subject, message } = req.body ?? {};

      if (typeof name !== "string" || typeof email !== "string" || typeof subject !== "string" || typeof message !== "string") {
        return res.status(400).json({ success: false, message: "A valid name, email, subject, and message are required." });
      }

      const cleaned = {
        name: name.trim(),
        email: email.trim(),
        subject: subject.trim(),
        message: message.trim(),
      };

      if (!cleaned.name || !cleaned.email || !cleaned.subject || !cleaned.message || !/^\S+@\S+\.\S+$/.test(cleaned.email)) {
        return res.status(400).json({ success: false, message: "Please complete every field with a valid email address." });
      }

      await sendContactEmail(cleaned);
      return res.status(200).json({ success: true, message: "Your message was sent successfully." });
    } catch (error) {
      console.error("Contact email failed:", error);
      return res.status(503).json({
        success: false,
        message: error instanceof Error ? error.message : "Unable to send your message right now. Please try again later.",
      });
    }
  });
  registerOAuthRoutes(app);
  // tRPC API
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );
  // development mode uses Vite, production mode uses static files
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const port = Number(process.env.PORT || "3000");
  if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error("Invalid PORT");
  server.on("error", error => { console.error("Server failed:", error.message); process.exit(1); });
  server.listen(port, "0.0.0.0", () => console.log(`Server listening on port ${port}`));
}

startServer().catch(error => { console.error(error); process.exit(1); });
