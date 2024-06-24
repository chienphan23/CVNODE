import express from "express";
import morgan from "morgan";
import compression from "compression";
import cors from "cors"
import bodyParser from "body-parser";
import http from 'http';

import userRouters from "./routers/userRouters.js";
import postRouters from "./routers/postRouters.js";
import chatBoxRouter from "./routers/chatBoxRouter.js";
import commentRouter from "./routers/commentRouter.js";
import notificationRouter from "./routers/notificationRouter.js";

import AppError from "./utils/appError.js";
import { globalErrorHandler } from "./controllers/errrorController.js";
import cookieParser from "cookie-parser";
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { createSocket } from "./realTime/socket.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const app = express();// middleware // có thể là máy chủ để lắng nghe trên cổng 3000 // đối tượng để xử lý yêu cầu
const server = http.createServer(app); // tạo máy chủ http để mở rộng tính năng của máy chủ có thể dụng đc socket // lắng nghe yêu cầu và chuyển vào express (app)

createSocket(server); // tạo socket

app.use(cors({
    origin: 'http://localhost:5173', //Chan tat ca cac domain khac ngoai domain nay
    credentials: true //Để bật cookie HTTP qua CORS
}))




app.use(morgan("dev"));
app.use(compression());
app.use(bodyParser.json())
app.use(express.json({ limit: "10kb" }));
app.use(cookieParser())


app.use((req, res, next) => {
  req.requestTime = new Date().toString();
  // const access_token = req.headers.access_token;
  // console.log("alo: "+ access_token)
  next();
});
app.use(express.static(`${__dirname}/public`))






app.use("/api/v1/users", userRouters);
app.use("/api/v1/posts", postRouters);
app.use("/api/v1/chatBox", chatBoxRouter);
app.use("/api/v1/comment", commentRouter);
app.use("/api/v1/notifications", notificationRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

export default server;
