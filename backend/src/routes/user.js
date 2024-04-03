import express from 'express';

import { UserController } from '../controllers/index.js';

const user = express.Router();

user.get('/', (req, res) => {
    res.send("Response from user");
});

user.get('/:id', (req, res) => {
    const controller = new UserController();
    const user = controller.getUser("tharindunimesh.abc@gmail.com");
    res.json({
        'status': "success",
        user,
    });
});

export const User = user;