import { logger } from "@/common/logger";

export type ScheduledJob = {
  name: string;
  intervalMs: number;
  run: () => Promise<void> | void;
};

const jobs: ScheduledJob[] = [];
const timers: NodeJS.Timeout[] = [];

export function registerJob(job: ScheduledJob) {
  jobs.push(job);
}

export function startJobs() {
  jobs.forEach((job) => {
    logger.info("jobs.registered", {
      name: job.name,
      intervalMs: job.intervalMs,
    });
    const t = setInterval(async () => {
      try {
        await job.run();
      } catch (err) {
        logger.error("jobs.error", {
          name: job.name,
          error: (err as Error).message,
        });
      }
    }, job.intervalMs);
    timers.push(t);
  });
}

export function stopJobs() {
  timers.splice(0).forEach((t) => clearInterval(t));
}
