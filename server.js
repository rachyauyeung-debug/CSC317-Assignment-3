
const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Serve the game files from the public folder.
app.use(express.static(path.join(__dirname, "public")));

// Start the Node.js server.
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Rhythm Rush running on port ${PORT}`);
});
