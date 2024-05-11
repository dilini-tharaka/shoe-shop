export default class ProductItem {
  id: number;
  brand: string;
  name: string;
  color: string;
  size: string;

  constructor(brand: string, name: string, color: string, size: string) {
    this.brand = brand;
    this.name = name;
    this.color = color;
    this.size = size;
  }
}
