import express from "express";
import { createServer } from "http";
import { createServer as createNetServer, type AddressInfo } from "net";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function findAvailablePort(startPort: number) {
  let port = startPort;

  while (true) {
    const availablePort = await new Promise<number>((resolve, reject) => {
      const probe = createNetServer();

      probe.once("error", (error: NodeJS.ErrnoException) => {
        probe.close();

        if (error.code === "EADDRINUSE") {
          resolve(0);
          return;
        }

        reject(error);
      });

      probe.once("listening", () => {
        const address = probe.address() as AddressInfo | null;
        const openPort = address?.port ?? port;

        probe.close(() => resolve(openPort));
      });

      probe.listen(port);
    });

    if (availablePort !== 0) {
      return availablePort;
    }

    port += 1;
  }
}

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  // Handle client-side routing - serve index.html for all routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const configuredPort = Number(process.env.PORT ?? 3000);
  const basePort = Number.isFinite(configuredPort) && configuredPort > 0 ? configuredPort : 3000;
  const port = process.env.PORT ? basePort : await findAvailablePort(basePort);

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
