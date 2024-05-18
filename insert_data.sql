Use `shoe-palace-db`;

-- -----------------------------------------------------
-- Table `Role`
-- -----------------------------------------------------
INSERT INTO Role (name) VALUES 
('Admin'),
('Stock Manager'), 
('Assistant'), 
('Cashier'), 
('Customer');

-- -----------------------------------------------------
-- Table `User`
-- -----------------------------------------------------
INSERT INTO User (`name`, `mobile`, `nic`, `email`, `userName`, `password`, `last_active`, `created_at`, `deleted_at`, `role_id`) VALUES 
('John Doe', '1234567890', 'NIC123456', 'john@example.com', 'john', 'password123', NULL, NOW(), NULL, 1),
('Jane Smith', '0987654321', 'NIC654321', 'jane@example.com', 'jane','password456', NULL, NOW(), NULL, 2),
('Alice Brown', '1122334455', 'NIC112233', 'alice@example.com', 'alice', 'password789', NULL, NOW(), NULL, 3),
('Bob White', '2233445566', 'NIC223344', 'bob@example.com', 'bob', ' password101', NULL, NOW(), NULL, 1),
('Charlie Green', '3344556677', 'NIC334455', 'charlie@example.com', 'charlie', 'password202', NULL, NOW(), NULL, 4);


-- -----------------------------------------------------
-- Table ``StockManager`
-- -----------------------------------------------------
INSERT INTO `StockManager` (`name`, `email`, `nic`, `mobile`, `userName`, `password`) VALUES 
('Jane Smith', 'jane@example.com', 'NIC654321', '0987654321', 'jane', 'password456'),
('John Doe', 'john@example.com', 'NIC123456', '1234567890', 'john', 'password123');

-- -----------------------------------------------------
-- Table `Assistant`
-- -----------------------------------------------------
INSERT INTO `Assistant` (`name`, `email`, `nic`, `mobile`, `username`, `password`) VALUES 
('Alice Brown', 'alice@example.com', 'NIC112233', '1122334455', 'alice', 'password789');

-- -----------------------------------------------------
-- Table `Admin`
-- -----------------------------------------------------
INSERT INTO `Admin` (`name`, `email`, `nic`, `mobile`, `username`, `password`) VALUES 
('Bob White', 'bob@example.com', 'NIC223344', '2233445566', 'bob', 'password101');

-- -----------------------------------------------------
-- Table `Cashier`
-- -----------------------------------------------------
INSERT INTO `Cashier` (`name`, `email`, `nic`, `mobile`, `userName`, `password`) VALUES 
('Charlie Green', 'charlie@example.com', 'NIC334455', '3344556677', 'charlie', 'password202');

-- -----------------------------------------------------
-- Table `Customer`
-- -----------------------------------------------------
INSERT INTO `Customer` (`firstName`, `lastName`, `email`, `password`, `created_at`, `deleted_at`) VALUES 
('David', 'Lee', 'david@example.com', 'password303', NOW(), NULL),
('Ella', 'Brown', 'ella@example.com', 'password404', NOW(), NULL),
('Fiona', 'White', 'fiona@example.com', 'password505', NOW(), NULL);


-- -----------------------------------------------------
-- Table `Wishlist`
-- -----------------------------------------------------
INSERT INTO `Wishlist` (`created_at`, `Customer_id`) VALUES 
(NOW(), 1),
(NOW(), 2);


-- -----------------------------------------------------
-- Table `bankDetails`
-- -----------------------------------------------------
INSERT INTO `bankDetails` (`bank_name`, `branch`, `account_no`, `account_owner`) VALUES 
('Bank A', 'Branch X', '1234567890', 'Supplier One'),
('Bank B', 'Branch Y', '0987654321', 'Supplier Two'),
('Bank C', 'Branch Z', '1122334455', 'Supplier Three');

-- -----------------------------------------------------
-- Table `Supplier`
-- -----------------------------------------------------
INSERT INTO `Supplier` (`name`, `email`, `mobile`, `nic`, `address`, `created_at`, `deleted_at`, `bankDetails_id`) VALUES 
('Supplier One', 'supplier1@example.com', '4455667788', 'NIC556677', '123 Supplier St', NOW(), NULL, 1),
('Supplier Two', 'supplier2@example.com', '5566778899', 'NIC667788', '456 Supplier St', NOW(), NULL, 2),
('Supplier Three', 'supplier3@example.com', '6677889900', 'NIC778899', '789 Supplier St', NOW(), NULL, 3);

-- -----------------------------------------------------
-- Table `Brand`
-- -----------------------------------------------------
INSERT INTO `Brand` (`name`) VALUES 
('Brand A'),
('Brand B'),
('Brand C');

-- -----------------------------------------------------
-- Table `Colors`
-- -----------------------------------------------------
INSERT INTO `Colors` (`name`) VALUES 
('Red'), 
('Blue'), 
('Green');

-- -----------------------------------------------------
-- `Shoes`
-- -----------------------------------------------------
INSERT INTO `Shoes` (`name`, `brand_id`) VALUES 
('Shoe A', 1),
('Shoe B', 2),
('Shoe C', 3),
('Shoe D', 1),
('Shoe E', 2);

-- -----------------------------------------------------
-- Table `Category`
-- -----------------------------------------------------
INSERT INTO `Category` (`name`) VALUES 
('Men'),
('Women'),
('Kids'),
('Sport');

-- -----------------------------------------------------
-- Table `ShoesHasCategory`
-- -----------------------------------------------------
INSERT INTO `ShoesHasCategory` (`Shoes_id`, `Category_id`) VALUES 
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 1);

-- -----------------------------------------------------
-- Table `ShoesHasColors`
-- -----------------------------------------------------
INSERT INTO `ShoesHasColors` (`Shoes_id`, `Colors_id`) VALUES 
(1, 1), 
(1, 2), 
(1, 3), 
(2, 1), 
(2, 2), 
(3, 1), 
(3, 3), 
(4, 2), 
(4, 3), 
(5, 1), 
(5, 2);

-- -----------------------------------------------------
-- Table `Sizes`
-- -----------------------------------------------------
INSERT INTO `Sizes` (`length`, `size`) VALUES 
('10 cm', '22'),
('20 cm', '33'),
('30 cm', '38'),
('40 cm', '41'),
('50 cm', '46');

-- -----------------------------------------------------
-- Table `Product`
-- -----------------------------------------------------
INSERT INTO `Product` (`Shoes_id`, `selling_count`, `Sizes_id`) VALUES 
(1, 0, 1),
(2, 0, 2),
(3, 0, 3),
(4, 0, 4),
(5, 0, 5);

-- -----------------------------------------------------
-- Table `Stock`
-- -----------------------------------------------------
INSERT INTO `stock` (`bought_at`, `stock_value`, `paid_amount`, `Supplier_id`, `StockManager_id`) VALUES 
(NOW(), 500.00, 450.00, 1, 1),
(NOW(), 600.00, 550.00, 2, 2),
(NOW(), 700.00, 650.00, 3, 1);


-- -----------------------------------------------------
-- Table `StockDetails`
-- -----------------------------------------------------
INSERT INTO `StockDetails` (`qty`, `buying_price`, `selling_price`, `barcode`, `Stock_id`, `Product_id`) VALUES 
(100, 5.00, 10.00, '123456789012', 1, 1),
(200, 6.00, 12.00, '234567890123', 2, 2),
(300, 7.00, 14.00, '345678901234', 3, 3);

-- -----------------------------------------------------
-- Table `Orders`
-- -----------------------------------------------------
INSERT INTO `Orders` (`paid_amount`, `ordered_at`, `ordered_by`, `ordered_from`) VALUES 
(300.00, NOW(), 1, 1),
(400.00, NOW(), 2, 2),
(500.00, NOW(), 2, 3);

-- -----------------------------------------------------
-- Table `OrderDetails`
-- -----------------------------------------------------
INSERT INTO `OrderDetails` (`qty`, `Orders_id`, `Product_id`) VALUES 
(50, 19, 1),
(100, 20, 2),
(150, 21, 3);

-- -----------------------------------------------------
-- Table `Images`
-- -----------------------------------------------------
INSERT INTO `Images` (`path`, `Product_id`) VALUES 
('/images/shoe1.png', 1),
('/images/shoe2.png', 2),
('/images/shoe3.png', 3),
('/images/shoe4.png', 4),
('/images/shoe5.png', 5);   

-- -----------------------------------------------------
-- Table `Invoice`
-- -----------------------------------------------------
INSERT INTO `Invoice` (`Invoice_at`, `Cashier_id`) VALUES 
(NOW(), 1),
(NOW(), 1), 
(NOW(), 1);

-- -----------------------------------------------------
-- Table `InvoiceItem`
-- -----------------------------------------------------
INSERT INTO `InvoiceItem` (`qty`, `total`, `StockDetails_id`, `Invoice_id`) VALUES 
(1, 10.00, 1, 4),
(2, 24.00, 2, 5),
(3, 42.00, 3, 6);   

-- -----------------------------------------------------
-- Table `SupplierhasBrands`
-- -----------------------------------------------------
INSERT INTO `SupplierhasBrands` (`Brand_id`, `Supplier_id`) VALUES 
(1, 1),
(2, 2),
(3, 3);
