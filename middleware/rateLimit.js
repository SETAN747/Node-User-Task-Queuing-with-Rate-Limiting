const taskQueues = {};

// Rate limit middleware
function rateLimit(req, res, next) {
    const userId = req.body.user_id;

    if (!taskQueues[userId]) {
        taskQueues[userId] = [];
    }

    const currentTime = Date.now();

    // Remove tasks that are older than 60 seconds
    taskQueues[userId] = taskQueues[userId].filter((time) => time > currentTime - 60000);

    // Check the rate limit
    if (taskQueues[userId].length < 20) {
        taskQueues[userId].push(currentTime);
        next();
    } else {
        res.status(429).send("Rate limit exceeded. Please try again later.");
    }
}

module.exports = rateLimit;
