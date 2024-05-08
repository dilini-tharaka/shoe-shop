export default class ProductItem {
  id: number;
  brand: string;
  name: string;

  constructor(brand: string, name: string) {
    this.brand = brand;
    this.name = name;
  }
}
