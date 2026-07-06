import { env } from "@/config/env";
import { logger } from "@/common/logger";
import { startJobs } from "@/jobs/registry";
import { createApp } from "@/app";

const app = createApp();
startJobs();

app.listen(env.PORT, () => {
  logger.info("server.started", { port: env.PORT, env: env.NODE_ENV });
});
