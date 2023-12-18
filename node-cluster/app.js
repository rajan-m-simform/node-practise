const express = require("express");
const cluster = require("cluster");
const os = require("os");
const app = express();

function delay(duration) {
  const startTime = Date.now();
  console.time("blocking");
  while (Date.now() - startTime < duration) {
    //event loop is blocked...
  }
  console.timeEnd("blocking");
}

app.get("/", (req, res) => {
  // JSON.stringify({}) => "{}"
  // JSON.parse("{}") => {}
  // [5,1,2,3,4].sort()
  res.send(`Performance example: ${process.pid}`);
});

app.get("/timer", (req, res) => {
  delay(9000);
  res.send(`Ding ding ding! ${process.pid}`);
});

(() => {
  for (let i = 0; i < os.cpus().length; i++) {
    console.log(`worker thread ${i}`);
    if (cluster.isMaster) {
      cluster.fork();
      console.log("Master has been started...");
    } else {
      console.log("Worker process started.");
      app.listen(3003);
    }
  }
})();
