import express from "express";
import { PrismaClient } from "@prisma/client";
import * as Route from "./src/router/index";

const app = express();
const prisma = new PrismaClient();

app.get("/", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json({
    message: "success",
    data: users,
  });
});

//middlewares
app.use(express.json());
app.use("/login", Route.Login);
app.use("/register", Route.Register);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

