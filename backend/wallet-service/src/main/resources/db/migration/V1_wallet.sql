CREATE TABLE IF NOT EXISTS `wallet` (
  `wallet_id` INT NOT NULL AUTO_INCREMENT,
  `total_balance` FLOAT NULL DEFAULT NULL,
  `user_id` INT NULL DEFAULT NULL,
  `crypto_id` INT NULL DEFAULT NULL,
  PRIMARY KEY (`wallet_id`),
  INDEX `User_id` (`user_id` ASC) VISIBLE,
  INDEX `Crypto_id` (`crypto_id` ASC) VISIBLE,
  CONSTRAINT `Wallet_ibfk_1`
    FOREIGN KEY (`user_id`)
    REFERENCES `minet`.`user` (`user_id`),
  CONSTRAINT `Wallet_ibfk_2`
    FOREIGN KEY (`crypto_id`)
    REFERENCES `minet`.`cryptocurrency` (`crypto_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `transaction` (
  `transaction_id` INT NOT NULL AUTO_INCREMENT,
  `wallet_id` INT NULL DEFAULT NULL,
  `transaction_type` ENUM('Purchased', 'Sold') NULL DEFAULT NULL,
  `transaction_price` FLOAT NULL DEFAULT NULL,
  `crypto_price` FLOAT NULL DEFAULT NULL,
  `date` DATE NULL DEFAULT NULL,
  `from_user` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`transaction_id`),
  INDEX `Wallet_id` (`wallet_id` ASC) VISIBLE,
  CONSTRAINT `Transaction_ibfk_1`
    FOREIGN KEY (`wallet_id`)
    REFERENCES `minet`.`wallet` (`wallet_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

