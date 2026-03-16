// Import required packages
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const sequelize = require("./config/connection");
const routes = require("./routes");

// Initialise Express application
const app = express();
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3001;

const rebuild = process.argv[2] === "--rebuild";

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// Handle GET request at the root route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get('/test', (req, res) => {
  console.log("The server alive. Request received at /test");
  res.send("Server is alive and says hello!");
});

// Add routes
app.use(routes);

// Sync database // only use during development
sequelize.sync({ force: rebuild }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});
