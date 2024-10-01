const express = require("express");
const rateLimit = require("../middleware/rateLimit");
const { processTasks } = require("../controllers/taskController");
const cron = require("node-cron");

const router = express.Router();
const taskQueues = {};

// Schedule task processing every second
cron.schedule("* * * * * *", () => processTasks(taskQueues));

// Define the POST route
router.post("/task", rateLimit, (req, res) => {
    console.log("Received request body:", req.body); // Log the request body

    try {
        // Ensure user_id is provided
        if (!req.body.user_id) {
            return res.status(400).send("user_id is required.");
        }

        // If everything is fine, send a success response
        res.send("Task queued for processing.");
    } catch (error) {
        // Log the error with detailed information
        pino.error("Error processing task:", error);
        res.status(500).send("An error occurred while processing the task.");
    }
});

// Test route
router.get("/test", (req, res) => {
    res.send("Test route is working.");
});

module.exports = router;
