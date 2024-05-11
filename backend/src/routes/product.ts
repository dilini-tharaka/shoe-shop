import express from "express";
import Productdto from "../dtos/product.ts";
import ProductItem from "../modules/ProductController.ts";

const product = express.Router();
const products: ProductItem[] = [
  new ProductItem("Nike", "Air Max", "Black", "10"),
  new ProductItem("Adidas", "Ultra Boost", "White", "9"),
  new ProductItem("Reebok", "Classic", "Red", "8"),
  new ProductItem("Vans", "Old Skool", "Blue", "7"),
  new ProductItem("Converse", "Chuck Taylor", "Green", "6"),
];

product.get("/", (req, res) => {
  res.send(products);
});

product.post("/", (req, res) => {
  const { name, brand, color, size } = req.body as Productdto;
  const product = new ProductItem(name, brand, color, size);
  products.push(product);
  res.json(product);
});

product.get("/:id", (req, res) => {
  const product = products.find(
    (product) => product.id === parseInt(req.params.id)
  );
  if (!product) {
    res.status(404).send("Product not found!");
    return;
  }
  res.send(product);
});

product.put("/:id", (req, res) => {
  const { name, brand, color, size } = req.body as Productdto;
  const product = products.find(
    (product) => product.id === parseInt(req.params.id)
  );
  if (!product) {
    res.status(404).send("Product not found!");
    return;
  }

  product.name = name;
  product.brand = brand;
  product.color = color;
  product.size = size;

  res.json(product);
});

product.delete("/:id", (req, res) => {
  const index = products.findIndex(
    (product) => product.id === parseInt(req.params.id)
  );
  if (index === -1) {
    res.status(404).send("Product not found!");
    return;
  }

  products.splice(index, 1);
  res.send("Product deleted!");
});

export const Product = product;
