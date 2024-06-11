import express from "express";
import { PrismaClient } from "@prisma/client";
import * as Route from "./src/router/index";
import path from "path";
import cors from "cors";

const app = express();
const prisma = new PrismaClient();
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

//middlewares
app.use(express.json());
//app.use(express.urlencoded({ extended: true })); // To parse URL-encoded data

app.use("/login", Route.Login);
app.use("/register", Route.Register);
app.use("/user", Route.User);
app.use("/supplier", Route.Supplier);
app.use("/product", Route.Product);
app.use("/invoice", Route.Invoice);
app.use("/stock", Route.Stock);
app.use("/searchProduct", Route.SearchProduct);

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
