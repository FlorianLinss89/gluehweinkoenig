-- MariaDB dump 10.19  Distrib 10.6.11-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: gluehweinkoenig
-- ------------------------------------------------------
-- Server version	10.6.11-MariaDB-0ubuntu0.22.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `group_table`
--

DROP TABLE IF EXISTS `group_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `group_table` (
  `group_index` int(11) NOT NULL AUTO_INCREMENT,
  `group_name` text NOT NULL,
  PRIMARY KEY (`group_index`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `group_table`
--

LOCK TABLES `group_table` WRITE;
/*!40000 ALTER TABLE `group_table` DISABLE KEYS */;
INSERT INTO `group_table` VALUES (3,'IT-Lagune'),(5,'Mittelstandsvereinigung'),(7,'Wirtschaftsjunioren'),(8,'Sund-Explosion'),(9,'SWS');
/*!40000 ALTER TABLE `group_table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userbase`
--

DROP TABLE IF EXISTS `userbase`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `userbase` (
  `user_index` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` text NOT NULL,
  `user_group` text NOT NULL,
  `user_team` text NOT NULL,
  PRIMARY KEY (`user_index`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userbase`
--

LOCK TABLES `userbase` WRITE;
/*!40000 ALTER TABLE `userbase` DISABLE KEYS */;
INSERT INTO `userbase` VALUES (1,'Florian','IT-Lagune',''),(2,'Mario','IT-Lagune',''),(3,'Thomas','Mittelstandsvereinigung',''),(4,'Benutzer4','Mittelstandsvereinigung',''),(5,'Benutzer5','Mittelstandsvereinigung',''),(6,'Benutzer6','Wirtschaftsjunioren',''),(7,'Benutzer7','Wirtschaftsjunioren',''),(8,'Benutzer8','Wirtschaftsjunioren',''),(9,'Benutzer9','Sund-Explosion',''),(10,'Benutzer10','Sund-Explosion',''),(11,'Benutzer11','Sund-Explosion',''),(12,'Benutzer12','SWS',''),(13,'Benutzer13','SWS',''),(14,'Benutzer14','SWS',''),(15,'Benutzer15','SWS',''),(16,'Benutzer16','IT-Lagune',''),(17,'Benutzer17','IT-Lagune',''),(18,'Benutzer18','IT-Lagune',''),(19,'Benutzer19','IT-Lagune',''),(20,'Benutzer20','Mittelstandsvereinigung',''),(21,'Name mit Leerzeichen','SWS','');
/*!40000 ALTER TABLE `userbase` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-11-29 15:32:47
