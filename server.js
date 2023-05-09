const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDB = require("./config/db");
const cluster = require("cluster");
const os = require("os");

const app = express();

dotenv.config({ path: process.cwd() + "./config/.env" });

connectDB();

app.use(express.json());

app.use(morgan("dev"));

const userRouter = require("./routes/user");

app.use("/api/users", userRouter);

app.use((req, res) => {
  res.status(404).json({ success: false, error: "Not found" });
});

const errorHandler = require("./middleware/error");
app.use(errorHandler);

if (cluster.isMaster && process.env.NODE_ENV === "production") {
  const numCPUs = os.cpus().length;

  console.log(`Master ${process.pid} is running`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
    cluster.fork();
  });

  const workerList = Object.values(cluster.workers);
  let nextWorkerIndex = 0;

  app.use((req, res, next) => {
    if (req.path.startsWith("/api")) {
      const worker = workerList[nextWorkerIndex];
      nextWorkerIndex = (nextWorkerIndex + 1) % workerList.length;
      worker.send(req);
    } else {
      next();
    }
  });
} else {
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`Worker ${process.pid} is running on port ${PORT}`);
  });
}

process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  server.close(() => process.exit(1));
});
