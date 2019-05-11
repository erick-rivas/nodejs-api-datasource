-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema playerdb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema playerdb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `playerdb` DEFAULT CHARACTER SET utf8 ;
USE `playerdb` ;

-- -----------------------------------------------------
-- Table `playerdb`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `playerdb`.`user` (
  `user_id` INT NOT NULL,
  `email` VARCHAR(128) NULL,
  `password` VARCHAR(256) NULL,
  PRIMARY KEY (`user_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `playerdb`.`team`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `playerdb`.`team` (
  `team_id` INT NOT NULL,
  `name` VARCHAR(45) NULL,
  `logo_url` VARCHAR(45) NULL,
  PRIMARY KEY (`team_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `playerdb`.`player`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `playerdb`.`player` (
  `player_id` INT NOT NULL,
  `name` VARCHAR(45) NULL,
  `photo_url` VARCHAR(45) NULL,
  `team_id` INT NULL,
  PRIMARY KEY (`player_id`),
  INDEX `fk_player_team_idx` (`team_id` ASC),
  CONSTRAINT `fk_player_team`
    FOREIGN KEY (`team_id`)
    REFERENCES `playerdb`.`team` (`team_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `playerdb`.`match`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `playerdb`.`match` (
  `match_id` INT NOT NULL,
  `date` DATETIME NULL,
  `type` VARCHAR(16) NULL,
  `visitor_id` INT NULL,
  `local_id` INT NULL,
  PRIMARY KEY (`match_id`),
  INDEX `fk_match_team1_idx` (`visitor_id` ASC),
  INDEX `fk_match_team2_idx` (`local_id` ASC),
  CONSTRAINT `fk_match_team1`
    FOREIGN KEY (`visitor_id`)
    REFERENCES `playerdb`.`team` (`team_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_match_team2`
    FOREIGN KEY (`local_id`)
    REFERENCES `playerdb`.`team` (`team_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `playerdb`.`score`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `playerdb`.`score` (
  `score_id` INT NOT NULL,
  `min` INT NULL,
  `player_id` INT NULL,
  `match_id` INT NULL,
  PRIMARY KEY (`score_id`),
  INDEX `fk_score_match_idx` (`match_id` ASC),
  INDEX `fk_score_player_idx` (`player_id` ASC),
  CONSTRAINT `fk_score_match`
    FOREIGN KEY (`match_id`)
    REFERENCES `playerdb`.`match` (`match_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_score_player`
    FOREIGN KEY (`player_id`)
    REFERENCES `playerdb`.`player` (`player_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `playerdb`.`user_team`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `playerdb`.`user_team` (
  `user_team_id` INT NOT NULL,
  `user_id` INT NULL,
  `team_id` INT NULL,
  PRIMARY KEY (`user_team_id`),
  INDEX `fk_user_team_user_idx` (`user_id` ASC),
  INDEX `fk_user_team_team_idx` (`team_id` ASC),
  CONSTRAINT `fk_user_team_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `playerdb`.`user` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_team_team`
    FOREIGN KEY (`team_id`)
    REFERENCES `playerdb`.`team` (`team_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `playerdb`.`user`
-- -----------------------------------------------------
START TRANSACTION;
USE `playerdb`;
INSERT INTO `playerdb`.`user` (`user_id`, `email`, `password`) VALUES (1, 'user@email.com', '1234');

COMMIT;


-- -----------------------------------------------------
-- Data for table `playerdb`.`team`
-- -----------------------------------------------------
START TRANSACTION;
USE `playerdb`;
INSERT INTO `playerdb`.`team` (`team_id`, `name`, `logo_url`) VALUES (1, 'Pumas', 'https://s3.amazonaws.com/lmxwebsite/docs/archdgtl/AfldDrct/logos/18/18.png');
INSERT INTO `playerdb`.`team` (`team_id`, `name`, `logo_url`) VALUES (2, 'América', 'https://s3.amazonaws.com/lmxwebsite/docs/archdgtl/AfldDrct/logos/1/1.png');
INSERT INTO `playerdb`.`team` (`team_id`, `name`, `logo_url`) VALUES (3, 'Chivas', 'https://s3.amazonaws.com/lmxwebsite/docs/archdgtl/AfldDrct/logos/7/7.png');
INSERT INTO `playerdb`.`team` (`team_id`, `name`, `logo_url`) VALUES (4, 'Tigres', 'https://s3.amazonaws.com/lmxwebsite/docs/archdgtl/AfldDrct/logos/16/16.png');
INSERT INTO `playerdb`.`team` (`team_id`, `name`, `logo_url`) VALUES (5, 'Cruz Azul', 'https://s3.amazonaws.com/lmxwebsite/docs/archdgtl/AfldDrct/logos/6/6.png');

COMMIT;


-- -----------------------------------------------------
-- Data for table `playerdb`.`player`
-- -----------------------------------------------------
START TRANSACTION;
USE `playerdb`;
INSERT INTO `playerdb`.`player` (`player_id`, `name`, `photo_url`, `team_id`) VALUES (1, 'Alejandro Arribas', 'https://s3.amazonaws.com/lmxwebsite/media/wpagephotos/69/2/130068/130068.jpg?rnd=201939', 1);
INSERT INTO `playerdb`.`player` (`player_id`, `name`, `photo_url`, `team_id`) VALUES (2, 'Pablo Barrera', 'https://s3.amazonaws.com/lmxwebsite/media/wpagephotos/69/2/34996/34996.jpg?rnd=201939', 1);
INSERT INTO `playerdb`.`player` (`player_id`, `name`, `photo_url`, `team_id`) VALUES (3, 'Agustín Marchesín', 'https://s3.amazonaws.com/lmxwebsite/media/wpagephotos/69/2/109037/109037.jpg?rnd=201939', 2);
INSERT INTO `playerdb`.`player` (`player_id`, `name`, `photo_url`, `team_id`) VALUES (4, 'Oribe Peralta', 'https://s3.amazonaws.com/lmxwebsite/media/wpagephotos/69/2/33927/33927.jpg?rnd=201939', 2);
INSERT INTO `playerdb`.`player` (`player_id`, `name`, `photo_url`, `team_id`) VALUES (5, 'Jair Pereira', 'https://s3.amazonaws.com/lmxwebsite/media/wpagephotos/69/2/47204/47204.jpg?rnd=201939', 3);
INSERT INTO `playerdb`.`player` (`player_id`, `name`, `photo_url`, `team_id`) VALUES (6, 'Alan Pulido', 'https://s3.amazonaws.com/lmxwebsite/media/wpagephotos/69/2/65740/65740.jpg?rnd=201939', 3);
INSERT INTO `playerdb`.`player` (`player_id`, `name`, `photo_url`, `team_id`) VALUES (7, 'André Gignac', 'https://s3.amazonaws.com/lmxwebsite/media/wpagephotos/69/2/111171/111171.jpg?rnd=201939', 4);
INSERT INTO `playerdb`.`player` (`player_id`, `name`, `photo_url`, `team_id`) VALUES (8, 'Jurgen Damn', 'https://s3.amazonaws.com/lmxwebsite/media/wpagephotos/69/2/78294/78294.jpg?rnd=201939', 4);
INSERT INTO `playerdb`.`player` (`player_id`, `name`, `photo_url`, `team_id`) VALUES (9, 'José Corona', 'https://s3.amazonaws.com/lmxwebsite/media/wpagephotos/69/2/17149/17149.jpg?rnd=201939', 5);
INSERT INTO `playerdb`.`player` (`player_id`, `name`, `photo_url`, `team_id`) VALUES (10, 'Elías Hernández', 'https://s3.amazonaws.com/lmxwebsite/media/wpagephotos/69/2/47256/47256.jpg?rnd=201939', 5);

COMMIT;


-- -----------------------------------------------------
-- Data for table `playerdb`.`match`
-- -----------------------------------------------------
START TRANSACTION;
USE `playerdb`;
INSERT INTO `playerdb`.`match` (`match_id`, `date`, `type`, `visitor_id`, `local_id`) VALUES (1, '2019-01-01 12:00:00', 'LEAGUE', 1, 2);
INSERT INTO `playerdb`.`match` (`match_id`, `date`, `type`, `visitor_id`, `local_id`) VALUES (2, '2019-01-01 14:00:00', 'LEAGUE', 3, 4);
INSERT INTO `playerdb`.`match` (`match_id`, `date`, `type`, `visitor_id`, `local_id`) VALUES (3, '2019-01-07 12:00:00', 'LEAGUE', 5, 1);
INSERT INTO `playerdb`.`match` (`match_id`, `date`, `type`, `visitor_id`, `local_id`) VALUES (4, '2019-01-08 14:00:00', 'LEAGUE', 2, 3);
INSERT INTO `playerdb`.`match` (`match_id`, `date`, `type`, `visitor_id`, `local_id`) VALUES (5, '2019-01-14 15:00:00', 'LEAGUE', 4, 5);
INSERT INTO `playerdb`.`match` (`match_id`, `date`, `type`, `visitor_id`, `local_id`) VALUES (6, '2019-01-14 17:00:00', 'LEAGUE', 1, 3);
INSERT INTO `playerdb`.`match` (`match_id`, `date`, `type`, `visitor_id`, `local_id`) VALUES (7, '2019-01-21 11:00:00', 'LEAGUE', 5, 2);
INSERT INTO `playerdb`.`match` (`match_id`, `date`, `type`, `visitor_id`, `local_id`) VALUES (8, '2019-01-21 11:00:00', 'LEAGUE', 4, 1);
INSERT INTO `playerdb`.`match` (`match_id`, `date`, `type`, `visitor_id`, `local_id`) VALUES (9, '2019-01-28 20:00:00', 'LEAGUE', 3, 5);
INSERT INTO `playerdb`.`match` (`match_id`, `date`, `type`, `visitor_id`, `local_id`) VALUES (10, '2019-01-28 20:00:00', 'LEAGUE', 2, 4);

COMMIT;


-- -----------------------------------------------------
-- Data for table `playerdb`.`score`
-- -----------------------------------------------------
START TRANSACTION;
USE `playerdb`;
INSERT INTO `playerdb`.`score` (`score_id`, `min`, `player_id`, `match_id`) VALUES (1, 20, 1, 1);
INSERT INTO `playerdb`.`score` (`score_id`, `min`, `player_id`, `match_id`) VALUES (2, 40, 2, 1);
INSERT INTO `playerdb`.`score` (`score_id`, `min`, `player_id`, `match_id`) VALUES (3, 65, 8, 2);
INSERT INTO `playerdb`.`score` (`score_id`, `min`, `player_id`, `match_id`) VALUES (4, 20, 2, 3);
INSERT INTO `playerdb`.`score` (`score_id`, `min`, `player_id`, `match_id`) VALUES (5, 48, 2, 3);
INSERT INTO `playerdb`.`score` (`score_id`, `min`, `player_id`, `match_id`) VALUES (6, 90, 2, 3);
INSERT INTO `playerdb`.`score` (`score_id`, `min`, `player_id`, `match_id`) VALUES (7, 70, 10, 5);
INSERT INTO `playerdb`.`score` (`score_id`, `min`, `player_id`, `match_id`) VALUES (8, 30, 1, 6);
INSERT INTO `playerdb`.`score` (`score_id`, `min`, `player_id`, `match_id`) VALUES (9, 80, 5, 6);
INSERT INTO `playerdb`.`score` (`score_id`, `min`, `player_id`, `match_id`) VALUES (10, 18, 9, 7);
INSERT INTO `playerdb`.`score` (`score_id`, `min`, `player_id`, `match_id`) VALUES (11, 50, 10, 7);
INSERT INTO `playerdb`.`score` (`score_id`, `min`, `player_id`, `match_id`) VALUES (12, 40, 2, 8);
INSERT INTO `playerdb`.`score` (`score_id`, `min`, `player_id`, `match_id`) VALUES (13, 45, 4, 10);
INSERT INTO `playerdb`.`score` (`score_id`, `min`, `player_id`, `match_id`) VALUES (14, 55, 8, 10);

COMMIT;


-- -----------------------------------------------------
-- Data for table `playerdb`.`user_team`
-- -----------------------------------------------------
START TRANSACTION;
USE `playerdb`;
INSERT INTO `playerdb`.`user_team` (`user_team_id`, `user_id`, `team_id`) VALUES (1, 1, 1);
INSERT INTO `playerdb`.`user_team` (`user_team_id`, `user_id`, `team_id`) VALUES (2, 1, 2);
INSERT INTO `playerdb`.`user_team` (`user_team_id`, `user_id`, `team_id`) VALUES (3, 1, 3);

COMMIT;

