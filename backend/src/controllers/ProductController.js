const products = [
  {
    id: 1,
    brand: "adidas",
    name: "guval cycle",
  },

  {
    id: 2,
    brand: "nike",
    name: "air max",
  },

  {
    id: 3,
    brand: "puma",
    name: "ferrari",
  },
];

export default class ProductController {
  constructor(brands, name) {
    this.brands = brands;
    this.name = name;
  }
  getProducts() {
    return products;
  }

  getProduct(id) {
    const product = products.find((product) => {
      return product.id == id;
    });

    return product;
  }
}
