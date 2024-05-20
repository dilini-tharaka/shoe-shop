import express from "express";
import dotenv from "dotenv";
// import all routes as ROUTE
import * as ROUTE from "./routes/index.js";
import { PrismaClient } from "@prisma/client/edge";

dotenv.config();
const app = express();
const prisma = new PrismaClient();

app.get("/", async (req, res) => {
  const user = await prisma.user.findMany();
  return res.json({
    users: user,
  });
});

//middlewares
app.use(express.json());
app.use("/login", ROUTE.Login);
app.use("/register", ROUTE.Register);
app.use("/product", ROUTE.Product);
app.use("/user", ROUTE.User);
app.use("/supplier", ROUTE.Supplier);

app.listen(process.env.APP_PORT, () => {
  console.log(
    `Express server is listning on ${process.env.APP_URL}:${process.env.APP_PORT}`
  );
});
