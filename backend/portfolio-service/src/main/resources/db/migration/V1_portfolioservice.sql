CREATE TABLE IF NOT EXISTS `portfolio` (
  `portfolio_id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NULL DEFAULT NULL,
  `date` DATE NULL DEFAULT NULL,
  `amount` FLOAT NULL DEFAULT NULL,
  `crypto_id` INT NULL DEFAULT NULL,
  PRIMARY KEY (`portfolio_id`),
  INDEX `User_id` (`user_id` ASC) VISIBLE,
  CONSTRAINT `Portfolio_ibfk_1`
    FOREIGN KEY (`user_id`)
    REFERENCES `minet`.`user` (`user_id`)
    ON UPDATE RESTRICT)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;
