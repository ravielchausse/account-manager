-- MySQL Workbench Synchronization
-- Generated: 2018-01-07 20:40
-- Model: New Model
-- Version: 1.0
-- Project: Account Manager
-- Author: Raviel Chausse Silveira

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

CREATE SCHEMA IF NOT EXISTS `account_manager` DEFAULT CHARACTER SET utf8 ;

CREATE TABLE IF NOT EXISTS `account_manager`.`use_users` (
    `use_id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    `use_name` VARCHAR(100) NOT NULL,
    `use_login` VARCHAR(100) NOT NULL,
    `use_email` VARCHAR(100) NOT NULL,
    `use_password` VARCHAR(100) NULL DEFAULT NULL,
    `use_status` BIT(1) NOT NULL DEFAULT 1,
    `use_created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`use_id`),
    UNIQUE INDEX `use_login_UNIQUE` (`use_login` ASC),
    UNIQUE INDEX `use_email_UNIQUE` (`use_email` ASC)
)  ENGINE=INNODB DEFAULT CHARACTER SET=UTF8;

CREATE TABLE IF NOT EXISTS `account_manager`.`pay_payment_methods` (
    `pay_id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    `pay_name` VARCHAR(100) NOT NULL,
    `pay_status` BIT(1) NOT NULL DEFAULT 1,
    `pay_created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`pay_id`),
    UNIQUE INDEX `pay_name_UNIQUE` (`pay_name` ASC)
)  ENGINE=INNODB DEFAULT CHARACTER SET=UTF8;

CREATE TABLE IF NOT EXISTS `account_manager`.`pri_priorities` (
    `pri_id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    `pri_name` VARCHAR(100) NOT NULL,
    `pri_status` BIT(1) NOT NULL DEFAULT 1,
    `pri_created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`pri_id`),
    UNIQUE INDEX `pri_name_UNIQUE` (`pri_name` ASC)
)  ENGINE=INNODB DEFAULT CHARACTER SET=UTF8;

CREATE TABLE IF NOT EXISTS `account_manager`.`pur_purchasers` (
    `pur_id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    `pur_name` VARCHAR(100) NOT NULL,
    `pur_status` BIT(1) NOT NULL DEFAULT 1,
    `pur_created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`pur_id`),
    UNIQUE INDEX `pur_name_UNIQUE` (`pur_name` ASC)
)  ENGINE=INNODB DEFAULT CHARACTER SET=UTF8;

CREATE TABLE IF NOT EXISTS `account_manager`.`ski_skills` (
    `ski_id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    `ski_value` VARCHAR(100) NOT NULL,
    `ski_status` BIT(1) NOT NULL DEFAULT 1,
    `ski_created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`ski_id`),
    UNIQUE INDEX `ski_value_UNIQUE` (`ski_value` ASC)
)  ENGINE=INNODB DEFAULT CHARACTER SET=UTF8;

CREATE TABLE IF NOT EXISTS `account_manager`.`bal_balance_sheets` (
    `bal_id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    `bal_id_accounts_type` INT(10) UNSIGNED NOT NULL,
    `bal_id_account_groups` INT(10) UNSIGNED NOT NULL,
    `bal_id_payment_methods` INT(10) UNSIGNED NOT NULL,
    `bal_id_payment_terms` INT(10) UNSIGNED NOT NULL,
    `bal_id_priorities` INT(10) UNSIGNED NOT NULL,
    `bal_id_purchasers` INT(10) UNSIGNED NOT NULL,
    `bal_id_skills` INT(10) UNSIGNED NOT NULL,
    `bal_date` DATE NOT NULL,
    `bal_account` VARCHAR(100) NOT NULL,
    `bal_value` DECIMAL(9 , 2 ) UNSIGNED NOT NULL DEFAULT 0,
    `bal_continued` TINYINT(3) UNSIGNED NOT NULL DEFAULT 0,
    `bal_comments` TEXT NULL DEFAULT NULL,
    `bal_status` BIT(1) NOT NULL DEFAULT 1,
    `bal_created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`bal_id`),
    INDEX `bal_balance_sheets_FKIndex1_idx` (`bal_id_accounts_type` ASC),
    INDEX `bal_balance_sheets_FKIndex2_idx` (`bal_id_account_groups` ASC),
    INDEX `bal_balance_sheets_FKIndex3_idx` (`bal_id_payment_terms` ASC),
    INDEX `bal_balance_sheets_FKIndex4_idx` (`bal_id_payment_methods` ASC),
    INDEX `bal_balance_sheets_FKIndex5_idx` (`bal_id_priorities` ASC),
    INDEX `bal_balance_sheets_FKIndex6_idx` (`bal_id_purchasers` ASC),
    INDEX `bal_balance_sheets_FKIndex7_idx` (`bal_id_skills` ASC),
    CONSTRAINT `bal_balance_sheets_FKIndex1` FOREIGN KEY (`bal_id_accounts_type`)
        REFERENCES `account_manager`.`acc_accounts_type` (`acc_id`)
        ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT `bal_balance_sheets_FKIndex2` FOREIGN KEY (`bal_id_account_groups`)
        REFERENCES `account_manager`.`agr_account_groups` (`agr_id`)
        ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT `bal_balance_sheets_FKIndex3` FOREIGN KEY (`bal_id_payment_terms`)
        REFERENCES `account_manager`.`pat_payment_terms` (`pat_id`)
        ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT `bal_balance_sheets_FKIndex4` FOREIGN KEY (`bal_id_payment_methods`)
        REFERENCES `account_manager`.`pay_payment_methods` (`pay_id`)
        ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT `bal_balance_sheets_FKIndex5` FOREIGN KEY (`bal_id_priorities`)
        REFERENCES `account_manager`.`pri_priorities` (`pri_id`)
        ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT `bal_balance_sheets_FKIndex6` FOREIGN KEY (`bal_id_purchasers`)
        REFERENCES `account_manager`.`pur_purchasers` (`pur_id`)
        ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT `bal_balance_sheets_FKIndex7` FOREIGN KEY (`bal_id_skills`)
        REFERENCES `account_manager`.`ski_skills` (`ski_id`)
        ON DELETE NO ACTION ON UPDATE NO ACTION
)  ENGINE=INNODB DEFAULT CHARACTER SET=UTF8;

CREATE TABLE IF NOT EXISTS `account_manager`.`agr_account_groups` (
    `agr_id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    `agr_name` VARCHAR(100) NOT NULL,
    `agr_status` BIT(1) NOT NULL DEFAULT 1,
    `agr_created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`agr_id`),
    UNIQUE INDEX `agr_name_UNIQUE` (`agr_name` ASC)
)  ENGINE=INNODB DEFAULT CHARACTER SET=UTF8;

CREATE TABLE IF NOT EXISTS `account_manager`.`acc_accounts_type` (
    `acc_id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    `acc_name` VARCHAR(100) NOT NULL,
    `acc_status` BIT(1) NOT NULL DEFAULT 1,
    `acc_created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`acc_id`),
    UNIQUE INDEX `acc_name_UNIQUE` (`acc_name` ASC)
)  ENGINE=INNODB DEFAULT CHARACTER SET=UTF8;

CREATE TABLE IF NOT EXISTS `account_manager`.`pat_payment_terms` (
    `pat_id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    `pat_name` VARCHAR(100) NOT NULL,
    `pat_status` BIT(1) NOT NULL DEFAULT 1,
    `pat_created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`pat_id`),
    UNIQUE INDEX `pat_name_UNIQUE` (`pat_name` ASC)
)  ENGINE=INNODB DEFAULT CHARACTER SET=UTF8;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
