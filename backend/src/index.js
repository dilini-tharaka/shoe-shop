import express from "express";
import dotenv from "dotenv";
import mysql from "mysql";
// import all routes as ROUTE
import * as ROUTE from "./routes/index.js";

const app = express();
dotenv.config();

app.get("/", (req, res) => {
  res.send("Hello World");
});

//middlewares
app.use(express.json());
app.use("/login",ROUTE.Login);
app.use("/register",ROUTE.Register);
app.use("/product", ROUTE.Product);
app.use("/user", ROUTE.User);
app.use("/supplier", ROUTE.Supplier);

app.listen(process.env.APP_PORT, () => {
  console.log(
    `Express server is listning on ${process.env.APP_URL}:${process.env.APP_PORT}`
  );
});
