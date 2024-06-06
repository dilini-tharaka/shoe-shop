import express from "express";
import { PrismaClient } from "@prisma/client";
import * as Route from "./src/router/index";
import cors from "cors";

const app = express();
const prisma = new PrismaClient();
app.use(cors({
  origin: "http://localhost:3000",
}));

app.get("/", async (req, res) => {
  const users = await prisma.customer.findMany();
  res.json({
    message: "success",
    data: users,
  });
});

//middlewares
app.use(express.json());
app.use("/login", Route.Login);
app.use("/register", Route.Register);
app.use("/user", Route.User);
app.use("/supplier", Route.Supplier);
app.use("/product", Route.Product);
app.use("/invoice", Route.Invoice);
app.use("/stock", Route.Stock);


app.listen(8000, () => {
  console.log("Server is running on port 8000");
});

