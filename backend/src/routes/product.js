import express from 'express';

const product = express.Router();

product.get('/', (req, res) => {
    res.send("Response from Product");
});

export const Product = product;