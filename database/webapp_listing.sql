-- MySQL dump 10.13  Distrib 8.0.21, for Win64 (x86_64)
--
-- Host: localhost    Database: webapp
-- ------------------------------------------------------
-- Server version	8.0.21

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
-- Table structure for table `listing`
--

DROP TABLE IF EXISTS `listing`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `listing` (
  `item_id` int NOT NULL AUTO_INCREMENT,
  `item_type` varchar(45) NOT NULL,
  `item_name` varchar(45) NOT NULL,
  `item_quantity` varchar(45) NOT NULL,
  `item_description` varchar(300) DEFAULT NULL,
  `item_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `item_image` varchar(100) NOT NULL,
  `item_lat` decimal(20,17) NOT NULL,
  `item_lon` decimal(20,17) NOT NULL,
  `farmer_id` varchar(45) NOT NULL,
  `item_status` enum('PENDING','ACCEPTED','REJECTED') NOT NULL DEFAULT 'PENDING',
  PRIMARY KEY (`item_id`),
  KEY `nic_idx` (`farmer_id`),
  CONSTRAINT `fk_nic` FOREIGN KEY (`farmer_id`) REFERENCES `farmer` (`nic`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `listing`
--

LOCK TABLES `listing` WRITE;
/*!40000 ALTER TABLE `listing` DISABLE KEYS */;
INSERT INTO `listing` VALUES (21,'organic_fruit','Apple','400','Organic apples 400 units from nuwaraeliya','2021-01-13 05:19:27','item_image-1610624333362.jpg',37.76851759999617000,-122.44558090860632000,'970000001V','ACCEPTED'),(22,'organic_veg','Cabbage','100','Non Organic Cabbage 100 units from awissawella','2021-01-13 06:05:53','item_image-1610498153325.jpg',6.95285463321903700,80.21449350086473000,'970000003V','ACCEPTED'),(23,'organic_veg','Carrot','100','Organic Carrot 100 units from nuwaraeliya','2021-01-13 06:10:48','item_image-1610498446941.jpg',6.93263533296798300,80.80706372773050000,'970000001V','ACCEPTED'),(24,'non_organic_veg','Tomatoes','400','Tomatoes 400','2021-01-13 06:15:10','item_image-1610498710645.jpg',7.10879960193605400,80.52116253526630000,'970000001V','REJECTED'),(25,'organic_fruit','Oranges','500','Oranges 500 units','2021-01-13 06:17:31','item_image-1610498851489.jpg',7.85641671507657300,80.65261711148307000,'970000001V','ACCEPTED'),(26,'organic_fruit','Coconut','450 ','Coconut 450 units from colombo','2021-01-13 06:19:47','item_image-1610498987258.jpg',6.92891974452804500,79.88076146540737000,'970000001V','PENDING'),(27,'non_organic_fruit','Mangus','500','mangus 500 units','2021-01-13 06:24:20','item_image-1610499260583.jpg',7.62832580856053700,80.50288545550988000,'970000002V','PENDING'),(28,'non_organic_fruit','Gava','200','guava 200 units','2021-01-13 06:26:26','item_image-1610499386314.jpg',7.50315185254507000,80.35091221112629000,'970000002V','PENDING'),(29,'organic_fruit','Oranges','400','400 oranges units','2021-01-13 06:28:06','item_image-1610499486387.jpg',6.69248073663096900,80.38400158029880000,'970000002V','PENDING'),(30,'organic_veg','Onions','500','Onions 500 units','2021-01-13 06:29:37','item_image-1610499577147.jpg',8.16406438471157600,80.18340472600794000,'970000002V','PENDING'),(31,'organic_fruit','Mangos','600','Mangos 600 units','2021-01-13 06:32:31','item_image-1610499751926.jpg',6.66173765154469600,79.97905327301369000,'970000003V','PENDING'),(32,'non_organic_veg','Corn','300','Corn 300 units','2021-01-13 06:34:32','item_image-1610499872839.jpg',7.28959774826583300,80.32994804391488000,'970000003V','PENDING'),(33,'organic_veg','Carrot','400','Carrot 400 units available','2021-01-13 06:37:23','item_image-1610500043132.jpeg',7.05880557402522500,80.64479708988611000,'970000003V','PENDING'),(34,'non_organic_veg','Beetroot','100','beet 100 units available','2021-01-13 06:40:06','item_image-1610500206442.jpg',7.48132817416572700,80.50717072848242000,'970000004V','PENDING'),(35,'organic_veg','Radish','90','Radish availble','2021-01-13 06:42:54','item_image-1610500374983.jpg',7.35095342454143450,80.65088949311861000,'970000004V','PENDING'),(37,'organic_fruit','Dragon Fruit','300','Dragon Fruit available','2021-01-13 06:46:16','item_image-1610500576592.jpg',7.75695185324700300,80.56614804848238000,'970000004V','ACCEPTED'),(38,'organic_fruit','Pineapples','50','pineapples availble','2021-01-13 06:47:58','item_image-1610500678516.jpg',6.85500903517438100,80.16868586021356000,'970000004V','PENDING');
/*!40000 ALTER TABLE `listing` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-01-14 19:12:27
