require("./locations");
const mongoose = require("mongoose");
var gracefulShutdown;

//const dbURI = 'mongodb://localhost/Loc8r';
const dbURL =
  "mongodb+srv://oscar2272:rhdtkd002@cluster0.jwfd01z.mongodb.net/Loc8r";

mongoose.set("strictQuery", true);
mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on("connected", function () {
  console.log("Mongoose connected to " + dbURL);
});

mongoose.connection.on("error", function (err) {
  console.log("Mongoose connected err " + dbURL);
});

mongoose.connection.on("disconnected", function () {
  console.log("Mongoose disconnected to " + dbURL);
});

var gracefulShutdown = function (msg, callback) {
  mongoose.connection.close(function () {
    console.log("Mongoose disconnected through " + msg);
    callback();
  });
};

process.once("SIGUSR2", function () {
  gracefulShutdown("nodemon restart", function () {
    process.kill(process.pid, "SIGUSR2");
  });
});

process.on("SIGINT", function () {
  gracefulShutdown("app termination shutdown", function () {
    process.exit(0);
  });
});

process.on("SIGTERM", function () {
  gracefulShutdown("Heroku app shutdown", function () {
    process.exit(0);
  });
});
