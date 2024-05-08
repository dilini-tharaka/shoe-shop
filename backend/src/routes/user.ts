import express from 'express';
import { Router } from 'express';

import { UserController } from '../controllers/index.js';

const user = Router();

user.get('/', (req, res) => {
    res.send("Response from user");
});

user.get('/:id', (req, res) => {
    const controller = new UserController();
    const user = controller.getUser("johnsmith.abc@gmail.com");
    res.json({
        'status': "success",
        user,
    });
});

export const User = user;