import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import server from "./app.js";

const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);
mongoose.connect(DB).then((connect) => {});
// , {
//     // useNewUrlParser: true,
//     // useUnifiedTopology: true,
//     // useCreateIndex: true,
//     // useFindAndModify: false
// }).then(connect => {
//     console.log(connect.connections)
//     console.log('DB CONNECT SUCCESSFULLY')
// })
const port = process.env.PORT || 3000;
const server1 = server.listen(port, () => {
  console.log(" port " + port);
});

process.on("unhandleRejection", (err) => {
  console.log(err.name, err.message);
  server1.close(() => {
    process.exit(1);
  });
});
