const amqp = require("amqplib");
const { processJob } = require("./jobProcessing.js");
const { setKey, getKey, delKey } = require("./redis-worker.js");
// *** Configure & Establish Connection *** //
const startQueueService = async () => {
  try {
    const amqpServerIP = "amqp://localhost:5672";
    const connection = await amqp.connect(amqpServerIP);
    channel = await connection.createChannel();
    await channel.assertQueue("jobs");
    channel.prefetch(1);
    console.log("Queue Listening for Jobs...");
  } catch (err) {
    console.log(
      `Error Connecting to Queue Service on Worker Node, Error: ${err}`
    );
  }

  // *** Start Processing Jobs *** //
  channel.consume("jobs", async (data) => {
    const job = JSON.parse(data.content.toString());
    await setKey(job.folder_name, "Processing");
    try {
      await processJob(job);
    } catch (err) {
      console.log(`Error while Processing Job: ${err}`);
    }
    channel.ack(data);
  });
};

module.exports = { startQueueService };
