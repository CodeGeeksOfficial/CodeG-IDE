const { startProcessing } = require("./rabbitmq-worker.js");

// *** Start listening for jobs in Queue service *** //
startProcessing();
