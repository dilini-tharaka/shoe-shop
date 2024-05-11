import express from 'express';
import Register from '../dtos/register';
import User from '../modules/RegisterController';

const register = express.Router();
const users: User[] = [];

register.get('/', (req, res) => {
  res.send(users);
});

register.post('/', (req, res) => {
  const { firstName,lastName ,userName, password } = req.body as Register ;
  const user = new User(firstName, lastName, userName, password);
  users.push(user);
  res.json(user);
});

export const Register = register;