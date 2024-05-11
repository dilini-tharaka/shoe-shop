import express from "express";

const supplier = express.Router();

supplier.get("/", (req, res) => {
    res.send("Get all suppliers");
});

export const Supplier = supplier;