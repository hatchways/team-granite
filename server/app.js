const colors = require("colors");
const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const { notFound, errorHandler } = require("./middleware/error");
const connectDB = require("./db");
const { join } = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const { checkBoardData } = require("./mock/boardData");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const kanbanRouter = require("./routes/kanban");
const imageUploadRouter = require("./routes/image");

const UPLOAD_LIMIT = "1000kb";

const { json, urlencoded } = express;

connectDB();
checkBoardData();

const app = express();
const server = http.createServer(app);

const io = socketio(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {});

if (process.env.NODE_ENV === "development") {
  app.use(logger("dev"));
}

app.use(json({ limit: UPLOAD_LIMIT }));
app.use(urlencoded({ extended: false, limit: UPLOAD_LIMIT }));

app.use(cookieParser());
app.use(express.static(join(__dirname, "public")));

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/kanban", kanbanRouter);
app.use("/image", imageUploadRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname), "client", "build", "index.html")
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running");
  });
}

app.use(notFound);
app.use(errorHandler);

process.on("unhandledRejection", (err, promise) => {
  server.close(() => process.exit(1));
});

module.exports = { app, server };
