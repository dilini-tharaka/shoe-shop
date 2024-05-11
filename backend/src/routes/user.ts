import express from "express";
import User from "../dtos/user.js";
import UserController from "../modules/UserController.js";

const user = express.Router();
const users: User[] = [
    new UserController("John Smith", 1234567890, "1234567890123", "john", "password", "admin"),
    new UserController("Jane Doe", 1234567890, "1234567890123", "jane", "password", "user"),
    new UserController("John Doe", 1234567890, "1234567890123", "johnny", "password", "user"),
    
];

user.get("/", (req, res) => {
  res.send(users);
});

user.post("/", (req, res) => {
  const { name, mobile, nic, userName, password, role } = req.body as UserController;
  const user = new UserController(name, mobile, nic, userName, password, role);
  users.push(user);
  res.json({
    status: "success",
    user,
  });
});

// user.get("/:id", (req, res) => {
//   const controller = new UserController();
//   const user = controller.getUser("johnsmith.abc@gmail.com");
//   res.json({
//     status: "success",
//     user,
//   });
// });

export const User = user;
