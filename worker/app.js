const { startQueueService } = require("./rabbitmq-worker.js");

// *** Start listening for jobs in Queue service *** //
startQueueService();
