const fs = require("fs");
const path = require("path");
const pino = require("pino")();
const Task = require("../models/task");

// Task function to log completion
async function task(user_id) {
    const logMessage = `${user_id}-task completed at-${Date.now()}\n`;
    fs.appendFileSync(path.join(__dirname, "../logs/task_log.txt"), logMessage);
    pino.info(logMessage);
}

// Task processing queue
async function processTasks(taskQueues) {
    for (const userId in taskQueues) {
        const userQueue = taskQueues[userId];
        if (userQueue.length > 0) {
            const currentTaskTime = userQueue.shift();
            await task(userId);
            await Task.create({ user_id: userId, timestamp: new Date(currentTaskTime) });
        }
    }
}

module.exports = { processTasks };
