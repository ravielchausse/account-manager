CREATE DATABASE  IF NOT EXISTS `account_manager` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `account_manager`;
-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: localhost    Database: account_manager
-- ------------------------------------------------------
-- Server version	5.7.20-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `acc_accounts_type`
--

DROP TABLE IF EXISTS `acc_accounts_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `acc_accounts_type` (
    `acc_id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    `acc_name` VARCHAR(100) NOT NULL,
    `acc_status` BIT(1) NOT NULL DEFAULT 1,
    `acc_created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`acc_id`),
    UNIQUE KEY `acc_name_UNIQUE` (`acc_name`)
)  ENGINE=INNODB AUTO_INCREMENT=10 DEFAULT CHARSET=UTF8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `acc_accounts_type`
--

LOCK TABLES `acc_accounts_type` WRITE;
/*!40000 ALTER TABLE `acc_accounts_type` DISABLE KEYS */;
INSERT INTO `acc_accounts_type` VALUES (1,'Alimentação',1,'2018-01-09 10:09:45'),(2,'Vestuário',1,'2018-01-09 10:09:45'),(3,'Moradia',1,'2018-01-09 10:09:45'),(4,'Saúde',1,'2018-01-09 10:09:45'),(5,'Veículos',1,'2018-01-09 10:09:45'),(6,'Hobby',1,'2018-01-09 10:09:45'),(7,'Diversos',1,'2018-01-09 10:09:45'),(8,'Educação',1,'2018-01-09 10:09:45'),(9,'Outros',1,'2018-01-09 10:09:45');
/*!40000 ALTER TABLE `acc_accounts_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `agr_account_groups`
--

DROP TABLE IF EXISTS `agr_account_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `agr_account_groups` (
    `agr_id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    `agr_name` VARCHAR(100) NOT NULL,
    `agr_status` BIT(1) NOT NULL DEFAULT 1,
    `agr_created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`agr_id`),
    UNIQUE KEY `agr_name_UNIQUE` (`agr_name`)
)  ENGINE=INNODB DEFAULT CHARSET=UTF8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `agr_account_groups`
--

LOCK TABLES `agr_account_groups` WRITE;
/*!40000 ALTER TABLE `agr_account_groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `agr_account_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bal_balance_sheets`
--

DROP TABLE IF EXISTS `bal_balance_sheets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bal_balance_sheets` (
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
    `bal_value` DECIMAL(5 , 2 ) UNSIGNED NOT NULL DEFAULT '0.00',
    `bal_continued` TINYINT(3) UNSIGNED NOT NULL DEFAULT '0',
    `bal_comments` TEXT,
    `bal_status` BIT(1) NOT NULL DEFAULT 1,
    `bal_created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`bal_id`),
    KEY `bal_balance_sheets_FKIndex1_idx` (`bal_id_accounts_type`),
    KEY `bal_balance_sheets_FKIndex2_idx` (`bal_id_account_groups`),
    KEY `bal_balance_sheets_FKIndex3_idx` (`bal_id_payment_terms`),
    KEY `bal_balance_sheets_FKIndex4_idx` (`bal_id_payment_methods`),
    KEY `bal_balance_sheets_FKIndex5_idx` (`bal_id_priorities`),
    KEY `bal_balance_sheets_FKIndex6_idx` (`bal_id_purchasers`),
    KEY `bal_balance_sheets_FKIndex7_idx` (`bal_id_skills`),
    CONSTRAINT `bal_balance_sheets_FKIndex1` FOREIGN KEY (`bal_id_accounts_type`)
        REFERENCES `acc_accounts_type` (`acc_id`)
        ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT `bal_balance_sheets_FKIndex2` FOREIGN KEY (`bal_id_account_groups`)
        REFERENCES `agr_account_groups` (`agr_id`)
        ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT `bal_balance_sheets_FKIndex3` FOREIGN KEY (`bal_id_payment_terms`)
        REFERENCES `pat_payment_terms` (`pat_id`)
        ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT `bal_balance_sheets_FKIndex4` FOREIGN KEY (`bal_id_payment_methods`)
        REFERENCES `pay_payment_methods` (`pay_id`)
        ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT `bal_balance_sheets_FKIndex5` FOREIGN KEY (`bal_id_priorities`)
        REFERENCES `pri_priorities` (`pri_id`)
        ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT `bal_balance_sheets_FKIndex6` FOREIGN KEY (`bal_id_purchasers`)
        REFERENCES `pur_purchasers` (`pur_id`)
        ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT `bal_balance_sheets_FKIndex7` FOREIGN KEY (`bal_id_skills`)
        REFERENCES `ski_skills` (`ski_id`)
        ON DELETE NO ACTION ON UPDATE NO ACTION
)  ENGINE=INNODB DEFAULT CHARSET=UTF8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bal_balance_sheets`
--

LOCK TABLES `bal_balance_sheets` WRITE;
/*!40000 ALTER TABLE `bal_balance_sheets` DISABLE KEYS */;
/*!40000 ALTER TABLE `bal_balance_sheets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pat_payment_terms`
--

DROP TABLE IF EXISTS `pat_payment_terms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pat_payment_terms` (
    `pat_id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    `pat_name` VARCHAR(100) NOT NULL,
    `pat_status` BIT(1) NOT NULL DEFAULT 1,
    `pat_created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`pat_id`),
    UNIQUE KEY `pat_name_UNIQUE` (`pat_name`)
)  ENGINE=INNODB AUTO_INCREMENT=4 DEFAULT CHARSET=UTF8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pat_payment_terms`
--

LOCK TABLES `pat_payment_terms` WRITE;
/*!40000 ALTER TABLE `pat_payment_terms` DISABLE KEYS */;
INSERT INTO `pat_payment_terms` VALUES (1,'Contínua',1,'2018-01-09 10:09:53'),(2,'A Vista',1,'2018-01-09 10:09:53'),(3,'Parcelada',1,'2018-01-09 10:09:53');
/*!40000 ALTER TABLE `pat_payment_terms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pay_payment_methods`
--

DROP TABLE IF EXISTS `pay_payment_methods`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pay_payment_methods` (
    `pay_id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    `pay_name` VARCHAR(100) NOT NULL,
    `pay_status` BIT(1) NOT NULL DEFAULT 1,
    `pay_created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`pay_id`),
    UNIQUE KEY `pay_name_UNIQUE` (`pay_name`)
)  ENGINE=INNODB AUTO_INCREMENT=4 DEFAULT CHARSET=UTF8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pay_payment_methods`
--

LOCK TABLES `pay_payment_methods` WRITE;
/*!40000 ALTER TABLE `pay_payment_methods` DISABLE KEYS */;
INSERT INTO `pay_payment_methods` VALUES (1,'Dinheiro',1,'2018-01-09 10:09:58'),(2,'Crédito',1,'2018-01-09 10:09:58'),(3,'Débito',1,'2018-01-09 10:09:58');
/*!40000 ALTER TABLE `pay_payment_methods` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pri_priorities`
--

DROP TABLE IF EXISTS `pri_priorities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pri_priorities` (
    `pri_id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    `pri_name` VARCHAR(100) NOT NULL,
    `pri_status` BIT(1) NOT NULL DEFAULT 1,
    `pri_created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`pri_id`),
    UNIQUE KEY `pri_name_UNIQUE` (`pri_name`)
)  ENGINE=INNODB AUTO_INCREMENT=4 DEFAULT CHARSET=UTF8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pri_priorities`
--

LOCK TABLES `pri_priorities` WRITE;
/*!40000 ALTER TABLE `pri_priorities` DISABLE KEYS */;
INSERT INTO `pri_priorities` VALUES (1,'Essencial',1,'2018-01-09 10:10:12'),(2,'Necessário',1,'2018-01-09 10:10:12'),(3,'Desnecessário',1,'2018-01-09 10:10:12');
/*!40000 ALTER TABLE `pri_priorities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pur_purchasers`
--

DROP TABLE IF EXISTS `pur_purchasers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pur_purchasers` (
    `pur_id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    `pur_name` VARCHAR(100) NOT NULL,
    `pur_status` BIT(1) NOT NULL DEFAULT 1,
    `pur_created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`pur_id`),
    UNIQUE KEY `pur_name_UNIQUE` (`pur_name`)
)  ENGINE=INNODB AUTO_INCREMENT=5 DEFAULT CHARSET=UTF8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pur_purchasers`
--

LOCK TABLES `pur_purchasers` WRITE;
/*!40000 ALTER TABLE `pur_purchasers` DISABLE KEYS */;
INSERT INTO `pur_purchasers` VALUES (1,'Casa',1,'2018-01-09 10:10:17'),(2,'Mayara',1,'2018-01-09 10:10:17'),(3,'Raviel',1,'2018-01-09 10:10:17'),(4,'Moana',1,'2018-01-09 10:10:17');
/*!40000 ALTER TABLE `pur_purchasers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ski_skills`
--

DROP TABLE IF EXISTS `ski_skills`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ski_skills` (
    `ski_id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    `ski_value` VARCHAR(100) NOT NULL,
    `ski_status` BIT(1) NOT NULL DEFAULT 1,
    `ski_created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`ski_id`),
    UNIQUE KEY `ski_value_UNIQUE` (`ski_value`)
)  ENGINE=INNODB AUTO_INCREMENT=4 DEFAULT CHARSET=UTF8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ski_skills`
--

LOCK TABLES `ski_skills` WRITE;
/*!40000 ALTER TABLE `ski_skills` DISABLE KEYS */;
INSERT INTO `ski_skills` VALUES (1,'2018.01',1,'2018-01-09 10:10:23'),(2,'2018.02',1,'2018-01-09 10:10:23'),(3,'2018.03',1,'2018-01-09 10:10:23');
/*!40000 ALTER TABLE `ski_skills` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `use_users`
--

DROP TABLE IF EXISTS `use_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `use_users` (
    `use_id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    `use_name` VARCHAR(100) NOT NULL,
    `use_login` VARCHAR(100) NOT NULL,
    `use_email` VARCHAR(100) NOT NULL,
    `use_password` VARCHAR(100) DEFAULT NULL,
    `use_status` BIT(1) NOT NULL DEFAULT 1,
    `use_created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`use_id`),
    UNIQUE KEY `use_login_UNIQUE` (`use_login`),
    UNIQUE KEY `use_email_UNIQUE` (`use_email`)
)  ENGINE=INNODB AUTO_INCREMENT=11 DEFAULT CHARSET=UTF8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `use_users`
--

LOCK TABLES `use_users` WRITE;
/*!40000 ALTER TABLE `use_users` DISABLE KEYS */;
INSERT INTO `use_users` VALUES (1,'Dalton Kings','daltonkings','daltonkings@nodejs.com',NULL,1,'2018-01-09 10:10:34'),(2,'Shavonne Nives','shavonnenives','shavonnenives@nodejs.com',NULL,1,'2018-01-09 10:10:34'),(3,'Idell Lichenstein','idelllichenstein','idelllichenstein@nodejs.com',NULL,1,'2018-01-09 10:10:34'),(4,'Courtney Scherich','courtneyscherich','courtneyscherich@nodejs.com',NULL,1,'2018-01-09 10:10:34'),(5,'Maryellen Drumheller','maryellendrumheller','maryellendrumheller@nodejs.com',NULL,1,'2018-01-09 10:10:34'),(6,'Adelle Grasmick','adellegrasmick','adellegrasmick@nodejs.com',NULL,1,'2018-01-09 10:10:34'),(7,'Hillary Kinahan','hillarykinahan','hillarykinahan@nodejs.com',NULL,1,'2018-01-09 10:10:34'),(8,'Valda Lenharr','valdalenharr','valdalenharr@nodejs.com',NULL,1,'2018-01-09 10:10:34'),(9,'Alena Sifers','alenasifers','alenasifers@nodejs.com',NULL,1,'2018-01-09 10:10:34'),(10,'Justin Bassiti','justinbassiti','justinbassiti@nodejs.com',NULL,1,'2018-01-09 10:10:34');
/*!40000 ALTER TABLE `use_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'account_manager'
--

--
-- Dumping routines for database 'account_manager'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-01-09  8:13:04
