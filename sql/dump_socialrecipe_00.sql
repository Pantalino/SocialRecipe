CREATE DATABASE  IF NOT EXISTS `socialrecipe` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `socialrecipe`;
-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: socialrecipe
-- ------------------------------------------------------
-- Server version	8.0.34

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
-- Table structure for table `commenti`
--

DROP TABLE IF EXISTS `commenti`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `commenti` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `contenuto` varchar(255) DEFAULT NULL,
  `data` datetime(6) DEFAULT NULL,
  `id_ricetta` bigint DEFAULT NULL,
  `id_utente` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK3cbp8apyq02aawcoq68l7iddq` (`id_ricetta`),
  KEY `FK14lm27adnvetlb6x3qw2uvcw2` (`id_utente`),
  CONSTRAINT `FK14lm27adnvetlb6x3qw2uvcw2` FOREIGN KEY (`id_utente`) REFERENCES `utenti` (`id`),
  CONSTRAINT `FK3cbp8apyq02aawcoq68l7iddq` FOREIGN KEY (`id_ricetta`) REFERENCES `ricette` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `commenti`
--

LOCK TABLES `commenti` WRITE;
/*!40000 ALTER TABLE `commenti` DISABLE KEYS */;
INSERT INTO `commenti` VALUES (1,'Questa ricetta è fantastica!','2023-08-09 21:18:11.000000',1,2),(2,'Mi piace come hai spiegato i passaggi.','2023-08-09 21:18:11.000000',2,1);
/*!40000 ALTER TABLE `commenti` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ricette`
--

DROP TABLE IF EXISTS `ricette`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ricette` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `data` datetime(6) DEFAULT NULL,
  `ingredienti` varchar(255) DEFAULT NULL,
  `istruzioni` varchar(255) DEFAULT NULL,
  `titolo` varchar(255) DEFAULT NULL,
  `url_immagine` varchar(255) DEFAULT NULL,
  `id_utente` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKpfldavbqrivdd75g8hexbu8jr` (`id_utente`),
  CONSTRAINT `FKpfldavbqrivdd75g8hexbu8jr` FOREIGN KEY (`id_utente`) REFERENCES `utenti` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ricette`
--

LOCK TABLES `ricette` WRITE;
/*!40000 ALTER TABLE `ricette` DISABLE KEYS */;
INSERT INTO `ricette` VALUES (1,'2023-08-03 14:00:00.000000','Pasta, Pomodoro, Olio d\'oliva, Basilico','1. Cuoci la pasta...\n2. Prepara il sugo...','Pasta al Pomodoro','https://media-assets.lacucinaitaliana.it/photos/6411f3da3d6fc4cae3c3892b/16:9/w_3300,h_1856,c_limit/photo-07201503701.jpg',1),(2,'2023-08-04 16:30:00.000000','Savoiardi, Mascarpone, Caffè, Cacao','1. Prepara il caffè...\n2. Amalgama il mascarpone...','Tiramisù','https://www.tavolartegusto.it/wp/wp-content/uploads/2023/06/tiramisu-al-bicchiere.jpg',2);
/*!40000 ALTER TABLE `ricette` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `utenti`
--

DROP TABLE IF EXISTS `utenti`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `utenti` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `data` datetime(6) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `utenti`
--

LOCK TABLES `utenti` WRITE;
/*!40000 ALTER TABLE `utenti` DISABLE KEYS */;
INSERT INTO `utenti` VALUES (1,'2023-08-09 21:13:40.000000','dario@example.it','123','dario'),(2,'2023-08-09 21:14:50.000000','ma.ro@ex.it','rossi','mario');
/*!40000 ALTER TABLE `utenti` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-10 12:47:27
