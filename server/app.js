"use strict";

global.Promise = require("bluebird");
global.ROOT = require("app-root-path").path;

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const helmet = require("helmet");
const compression = require("compression");

// Set env
process.env.NODE_ENV = process.env.NODE_ENV || "dev";
require("dotenv").config({ path: path.join(__dirname, "..", `.env.${process.env.NODE_ENV}`) });

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });
mongoose.set("debug", process.env.MONGO_DEBUG);

mongoose.connection.on("open", () => {
	console.log("Connection established");
});
mongoose.connection.on("error", err => {
	console.error("Mongoose error:", err);
	process.exit(0);
});

const app = express();

app.use("/", express.static(path.join(__dirname, "..", "static")));
app.use(
	helmet({
		hsts: false
	})
);
app.use(compression({ level: 6 }));

if (process.env.NODE_ENV === "dev") {
	const morgan = require("morgan");
	app.use(morgan("combined"));
}

require("./router")(app);

app.listen(process.env.PORT, () => {
	console.log(`Server start on port ${process.env.PORT}, with env: ${process.env.NODE_ENV}`);
});

// TODO: graceful shutdown
// process.on('SIGINT', () => {
// });

// For start server by tests
module.exports = app;
