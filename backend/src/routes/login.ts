import express from "express";
import Login from "../dtos/login";
import User from "../modules/login";

const login = express.Router();
const users: User[] = [];

login.get("/", (req, res) => {
  res.send("Login");
});

login.post("/", (req, res) => {
  const { userName, password } = req.body as Login;
  const user = new User(userName, password);
  users.push(user);
  res.send(user);
});

export const Login = login;
