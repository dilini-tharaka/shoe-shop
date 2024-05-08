import express from "express";
import Productdto from "../dtos/product.ts";
import ProductItem from "../modules/product.ts";

const product = express.Router();
const products: ProductItem[] = [];

product.get("/", (req, res) => {
  res.send("Response from Product");
});

product.post("/", (req, res) => {
  const { name, brand } = req.body as Productdto;
  const product = new ProductItem(name, brand);
  products.push(product);
  res.json(product);
});

product.post("/:id", (req, res) => {
  res.send(`Product Updated ${req.params.id}`);
});

export const Product = product;
