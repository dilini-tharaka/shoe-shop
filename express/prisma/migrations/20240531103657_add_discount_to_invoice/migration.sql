-- CreateTable
CREATE TABLE `admin` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `nic` VARCHAR(20) NOT NULL,
    `mobile` VARCHAR(255) NOT NULL,
    `username` VARCHAR(45) NOT NULL,
    `password` VARCHAR(45) NOT NULL,

    UNIQUE INDEX `email_UNIQUE`(`email`),
    UNIQUE INDEX `nic_UNIQUE`(`nic`),
    UNIQUE INDEX `username_UNIQUE`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `assistant` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `nic` VARCHAR(20) NOT NULL,
    `mobile` VARCHAR(11) NOT NULL,
    `username` VARCHAR(45) NOT NULL,
    `password` VARCHAR(45) NOT NULL,

    UNIQUE INDEX `nic_UNIQUE`(`nic`),
    UNIQUE INDEX `username_UNIQUE`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `bankdetails` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `bank_name` VARCHAR(45) NOT NULL,
    `branch` VARCHAR(45) NOT NULL,
    `account_no` VARCHAR(45) NOT NULL,
    `account_owner` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `brand` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cashier` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `nic` VARCHAR(20) NOT NULL,
    `mobile` VARCHAR(11) NOT NULL,
    `userName` VARCHAR(45) NOT NULL,
    `password` VARCHAR(45) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `category` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(45) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `colors` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `customer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `firstName` VARCHAR(45) NOT NULL,
    `lastName` VARCHAR(45) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(45) NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL,
    `deleted_at` TIMESTAMP(0) NULL,

    UNIQUE INDEX `email_UNIQUE`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `images` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `path` VARCHAR(255) NOT NULL,
    `Product_id` INTEGER NOT NULL,

    INDEX `fk_Images_Product1_idx`(`Product_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `invoice` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `Invoice_at` TIMESTAMP(0) NOT NULL,
    `Cashier_id` INTEGER NOT NULL,
    `discount` INTEGER NOT NULL DEFAULT 5,

    INDEX `fk_Invoice_Cashier1_idx`(`Cashier_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `invoiceitem` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `qty` INTEGER NOT NULL,
    `total` DOUBLE NOT NULL,
    `StockDetails_id` INTEGER NOT NULL,
    `Invoice_id` INTEGER NOT NULL,

    INDEX `fk_InvoiceItem_Invoice1_idx`(`Invoice_id`),
    INDEX `fk_InvoiceItem_StockDetails1_idx`(`StockDetails_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `orderdetails` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `qty` INTEGER NOT NULL,
    `Orders_id` INTEGER NOT NULL,
    `Product_id` INTEGER NOT NULL,

    INDEX `fk_OrderDetails_Orders1_idx`(`Orders_id`),
    INDEX `fk_OrderDetails_Product1_idx`(`Product_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `orders` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `paid_amount` DOUBLE NOT NULL DEFAULT 0,
    `ordered_at` TIMESTAMP(0) NOT NULL,
    `ordered_by` INTEGER NOT NULL,
    `ordered_from` INTEGER NOT NULL,

    INDEX `fk_Orders_StockManager1_idx`(`ordered_by`),
    INDEX `fk_Orders_Supplier1_idx`(`ordered_from`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `product` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `selling_count` INTEGER NOT NULL DEFAULT 0,
    `Shoes_id` INTEGER NOT NULL,
    `Sizes_id` INTEGER NOT NULL,

    INDEX `fk_Product_Shoes_has_Colors1_idx`(`Shoes_id`),
    INDEX `fk_Product_Sizes1_idx`(`Sizes_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `role` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(45) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `shoes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(45) NOT NULL,
    `brand_id` INTEGER NOT NULL,

    INDEX `fk_Shoes_Brand1_idx`(`brand_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `shoeshascategory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `Shoes_id` INTEGER NOT NULL,
    `Category_id` INTEGER NOT NULL,

    INDEX `fk_Shoes_has_Category_Category1_idx`(`Category_id`),
    INDEX `fk_Shoes_has_Category_Shoes1_idx`(`Shoes_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `shoeshascolors` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `Shoes_id` INTEGER NOT NULL,
    `Colors_id` INTEGER NOT NULL,

    INDEX `fk_Shoes_has_Colors_Colors1_idx`(`Colors_id`),
    INDEX `fk_Shoes_has_Colors_Shoes1_idx`(`Shoes_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sizes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `length` VARCHAR(20) NOT NULL,
    `size` VARCHAR(20) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `stock` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `bought_at` TIMESTAMP(0) NOT NULL,
    `stock_value` DOUBLE NOT NULL,
    `paid_amount` DOUBLE NOT NULL,
    `Supplier_id` INTEGER NOT NULL,
    `StockManager_id` INTEGER NOT NULL,

    INDEX `fk_Stock_StockManager1_idx`(`StockManager_id`),
    INDEX `fk_Stock_Supplier1_idx`(`Supplier_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `stockdetails` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `qty` INTEGER NOT NULL,
    `buying_price` DOUBLE NOT NULL,
    `selling_price` DOUBLE NOT NULL,
    `barcode` VARCHAR(255) NOT NULL,
    `Product_id` INTEGER NOT NULL,
    `Stock_id` INTEGER NOT NULL,

    INDEX `fk_StockDetails_Product1_idx`(`Product_id`),
    INDEX `fk_StockDetails_Stock1_idx`(`Stock_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `stockmanager` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `nic` VARCHAR(20) NOT NULL,
    `mobile` VARCHAR(11) NOT NULL,
    `userName` VARCHAR(45) NOT NULL,
    `password` VARCHAR(45) NOT NULL,

    UNIQUE INDEX `email_UNIQUE`(`email`),
    UNIQUE INDEX `nic_UNIQUE`(`nic`),
    UNIQUE INDEX `userName_UNIQUE`(`userName`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `supplier` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `mobile` VARCHAR(11) NOT NULL,
    `nic` VARCHAR(20) NOT NULL,
    `address` VARCHAR(255) NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL,
    `deleted_at` TIMESTAMP(0) NULL,
    `bankDetails_id` INTEGER NOT NULL,

    UNIQUE INDEX `email_UNIQUE`(`email`),
    INDEX `fk_Supplier_bankDetails1_idx`(`bankDetails_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `supplierhasbrands` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `Brand_id` INTEGER NOT NULL,
    `Supplier_id` INTEGER NOT NULL,

    INDEX `fk_SupplierhasBrands_Brand1_idx`(`Brand_id`),
    INDEX `fk_SupplierhasBrands_Supplier1_idx`(`Supplier_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `mobile` VARCHAR(10) NOT NULL,
    `nic` VARCHAR(20) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `userName` VARCHAR(45) NOT NULL,
    `password` VARCHAR(45) NOT NULL,
    `last_active` TIMESTAMP(0) NULL,
    `created_at` TIMESTAMP(0) NOT NULL,
    `deleted_at` TIMESTAMP(0) NULL,
    `role_id` INTEGER NOT NULL,

    INDEX `fk_User_Role_idx`(`role_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wishlist` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `created_at` TIMESTAMP(0) NOT NULL,
    `Customer_id` INTEGER NOT NULL,

    INDEX `fk_Wishlist_Customer1_idx`(`Customer_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `images` ADD CONSTRAINT `fk_Images_Product1` FOREIGN KEY (`Product_id`) REFERENCES `product`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `invoice` ADD CONSTRAINT `fk_Invoice_Cashier1` FOREIGN KEY (`Cashier_id`) REFERENCES `cashier`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `invoiceitem` ADD CONSTRAINT `fk_InvoiceItem_Invoice1` FOREIGN KEY (`Invoice_id`) REFERENCES `invoice`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `invoiceitem` ADD CONSTRAINT `fk_InvoiceItem_StockDetails1` FOREIGN KEY (`StockDetails_id`) REFERENCES `stockdetails`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `orderdetails` ADD CONSTRAINT `fk_OrderDetails_Orders1` FOREIGN KEY (`Orders_id`) REFERENCES `orders`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `orderdetails` ADD CONSTRAINT `fk_OrderDetails_Product1` FOREIGN KEY (`Product_id`) REFERENCES `product`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `orders` ADD CONSTRAINT `fk_Orders_StockManager1` FOREIGN KEY (`ordered_by`) REFERENCES `stockmanager`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `orders` ADD CONSTRAINT `fk_Orders_Supplier1` FOREIGN KEY (`ordered_from`) REFERENCES `supplier`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `product` ADD CONSTRAINT `fk_Product_Shoes_has_Colors1` FOREIGN KEY (`Shoes_id`) REFERENCES `shoeshascolors`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `product` ADD CONSTRAINT `fk_Product_Sizes1` FOREIGN KEY (`Sizes_id`) REFERENCES `sizes`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `shoes` ADD CONSTRAINT `fk_Shoes_Brand1` FOREIGN KEY (`brand_id`) REFERENCES `brand`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `shoeshascategory` ADD CONSTRAINT `fk_Shoes_has_Category_Category1` FOREIGN KEY (`Category_id`) REFERENCES `category`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `shoeshascategory` ADD CONSTRAINT `fk_Shoes_has_Category_Shoes1` FOREIGN KEY (`Shoes_id`) REFERENCES `shoes`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `shoeshascolors` ADD CONSTRAINT `fk_Shoes_has_Colors_Colors1` FOREIGN KEY (`Colors_id`) REFERENCES `colors`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `shoeshascolors` ADD CONSTRAINT `fk_Shoes_has_Colors_Shoes1` FOREIGN KEY (`Shoes_id`) REFERENCES `shoes`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `stock` ADD CONSTRAINT `fk_Stock_StockManager1` FOREIGN KEY (`StockManager_id`) REFERENCES `stockmanager`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `stock` ADD CONSTRAINT `fk_Stock_Supplier1` FOREIGN KEY (`Supplier_id`) REFERENCES `supplier`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `stockdetails` ADD CONSTRAINT `fk_StockDetails_Product1` FOREIGN KEY (`Product_id`) REFERENCES `product`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `stockdetails` ADD CONSTRAINT `fk_StockDetails_Stock1` FOREIGN KEY (`Stock_id`) REFERENCES `stock`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `supplier` ADD CONSTRAINT `fk_Supplier_bankDetails1` FOREIGN KEY (`bankDetails_id`) REFERENCES `bankdetails`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `supplierhasbrands` ADD CONSTRAINT `fk_SupplierhasBrands_Brand1` FOREIGN KEY (`Brand_id`) REFERENCES `brand`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `supplierhasbrands` ADD CONSTRAINT `fk_SupplierhasBrands_Supplier1` FOREIGN KEY (`Supplier_id`) REFERENCES `supplier`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `fk_User_Role` FOREIGN KEY (`role_id`) REFERENCES `role`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `wishlist` ADD CONSTRAINT `fk_Wishlist_Customer1` FOREIGN KEY (`Customer_id`) REFERENCES `customer`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
