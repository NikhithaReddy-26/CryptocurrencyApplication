CREATE TABLE IF NOT EXISTS `watchlist` (
  `watchlist_id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NULL DEFAULT NULL,
  `crypto_Id` INT NULL DEFAULT NULL,
  PRIMARY KEY (`watchlist_id`),
  INDEX `User_id` (`user_id` ASC) VISIBLE,
  INDEX `crypto_Id` (`crypto_Id` ASC) VISIBLE,
  CONSTRAINT `Watchlist_ibfk_1`
    FOREIGN KEY (`user_id`)
    REFERENCES `minet`.`user` (`user_id`),
  CONSTRAINT `Watchlist_ibfk_2`
    FOREIGN KEY (`crypto_Id`)
    REFERENCES `minet`.`cryptocurrency` (`crypto_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;