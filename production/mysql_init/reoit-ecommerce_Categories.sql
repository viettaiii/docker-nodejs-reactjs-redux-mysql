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
-- Table structure for table `Categories`
--

DROP TABLE IF EXISTS `Categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Categories` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `categoryName` enum('IPhone','IPad','Mac','Watch','Âm thanh','Phụ kiện') COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `categoryName` (`categoryName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Categories`
--

LOCK TABLES `Categories` WRITE;
/*!40000 ALTER TABLE `Categories` DISABLE KEYS */;
INSERT INTO `Categories` VALUES ('052c5089-4a6c-4d0a-b439-ef4e957df1b8','Watch','https://res.cloudinary.com/dkkh1gtoj/image/upload/v1697898562/viettaiit-ecommerce/categories/xuabv3c3cowy0gbxguv0.png',NULL,NULL),('3f9d74d0-14c9-44d7-80b7-cd2d41104970','Phụ kiện','https://res.cloudinary.com/dkkh1gtoj/image/upload/v1697898562/viettaiit-ecommerce/categories/cpsrvtubjnycg8ek0dd0.png',NULL,NULL),('4dfe0b0c-eece-477e-aa19-2c15b51d1faa','Mac','https://res.cloudinary.com/dkkh1gtoj/image/upload/v1697898562/viettaiit-ecommerce/categories/yuh4hmscqk75nqod6dkr.png',NULL,NULL),('5102c8b2-1dd5-481a-96e7-d61250f2ea05','IPad','https://res.cloudinary.com/dkkh1gtoj/image/upload/v1698037897/viettaiit-ecommerce/categories/ipad_ff4r3b.webp',NULL,NULL),('b39ea7b2-cc38-4dd4-89f4-6c738903b3e0','Âm thanh','https://res.cloudinary.com/dkkh1gtoj/image/upload/v1697898562/viettaiit-ecommerce/categories/jqh2ucdo1lga8qxn0b7a.png',NULL,NULL),('f47ac10b-58cc-4372-a567-0e02b2c3d479','IPhone','https://res.cloudinary.com/dkkh1gtoj/image/upload/v1697898562/viettaiit-ecommerce/categories/uxxh2grpyoqognxietg1.png',NULL,NULL);
/*!40000 ALTER TABLE `Categories` ENABLE KEYS */;
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
