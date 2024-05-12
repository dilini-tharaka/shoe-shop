import express from "express";
import Supplierdto from "../dtos/supplierdto";
import SupplierDetails from "../modules/SupplierController";

const supplier = express.Router();
const suppliers: SupplierDetails[] = [];
supplier.get("/", (req, res) => {
  res.send(suppliers);
});

supplier.post("/", (req, res) => {
  const { name, nic, email, address, mobile, availableBrands, bankDetails } =
    req.body as SupplierDetails;
  const supplier = new SupplierDetails(
    name,
    nic,
    email,
    address,
    mobile,
    availableBrands,
    bankDetails
  );
  suppliers.push(supplier);
  res.json(supplier);
});

export const Supplier = supplier;
