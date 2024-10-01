const express = require("express");
const taskRoutes = require("./routes/taskRoutes");
require("./config/db"); // Database connection

const app = express();
app.use(express.json());
app.use("/api", taskRoutes); // Use the task routes under the /api prefix

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
