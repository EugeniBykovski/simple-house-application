import cron from "node-cron";
import { cleanupExpiredMessages } from "./cleanup";

cron.schedule("0 * * * *", async () => {
  console.log("Running cleanup for expired messages...");
  await cleanupExpiredMessages();
});
