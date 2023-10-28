-- MySQL dump 10.13  Distrib 8.0.31, for macos12 (x86_64)
--
-- Host: 127.0.0.1    Database: reoit-ecommerce
-- ------------------------------------------------------
-- Server version	8.0.31

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Users` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` enum('admin','client') COLLATE utf8mb4_unicode_ci DEFAULT 'client',
  `isVerified` tinyint(1) DEFAULT '0',
  `isBlocked` tinyint(1) DEFAULT '0',
  `verifiedDate` datetime DEFAULT NULL,
  `verificationToken` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `passwordToken` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `passwordTokenExpire` datetime DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES ('43a21538-6981-493f-aa9d-99e5aac673bb','admin','admin@gmail.com','$2a$10$H3StP.pXYjnvLWRpm532oOPtOCHaTjj/0KT1NvKp6KpMJ9DZQuT92','admin',1,0,'2023-08-05 13:43:09',NULL,NULL,NULL,NULL,NULL),('49612e0f-87fb-4338-9d6a-9fa7a7afc842','viettaii2003','viettaii2003@gmail.com','$2a$10$H3StP.pXYjnvLWRpm532oOPtOCHaTjj/0KT1NvKp6KpMJ9DZQuT92','client',1,0,'2023-08-05 13:43:09',NULL,NULL,NULL,NULL,NULL),('77c5eafa-1543-49b7-95c6-a2824c0440d4','user1','user1@gmail.com','$2a$10$H3StP.pXYjnvLWRpm532oOPtOCHaTjj/0KT1NvKp6KpMJ9DZQuT92','client',1,0,'2023-08-05 13:43:09',NULL,NULL,NULL,NULL,NULL),('94a418de-e373-4fa6-a7f0-0e9c60ed80f6','test','test@gmail.com','$2a$10$H3StP.pXYjnvLWRpm532oOPtOCHaTjj/0KT1NvKp6KpMJ9DZQuT92','client',1,0,'2023-08-05 13:43:09',NULL,NULL,NULL,NULL,NULL),('b3a6a303-05ec-4e0b-b561-f011960c4498','user2','user2@gmail.com','$2a$10$H3StP.pXYjnvLWRpm532oOPtOCHaTjj/0KT1NvKp6KpMJ9DZQuT92','client',1,0,'2023-08-05 13:43:09',NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-10-23 18:23:31
