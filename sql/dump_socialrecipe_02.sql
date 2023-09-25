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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `commenti`
--

LOCK TABLES `commenti` WRITE;
/*!40000 ALTER TABLE `commenti` DISABLE KEYS */;
INSERT INTO `commenti` VALUES (1,'Questa ricetta è fantastica!','2023-08-09 21:18:11.000000',1,2),(2,'Mi piace come hai spiegato i passaggi.','2023-08-09 21:18:11.000000',2,1),(3,'Buona questa frittata!','2023-08-10 19:22:36.000000',3,2),(4,'Delisiosa questa carbonara','2023-08-10 19:22:36.000000',4,1),(5,'Mia nonna la fa meglio','2023-08-12 15:20:55.000000',1,3);
/*!40000 ALTER TABLE `commenti` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `follows`
--

DROP TABLE IF EXISTS `follows`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `follows` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `follower_id` bigint DEFAULT NULL,
  `following_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKmeeul2y6y6n2vqh6eek8n0135` (`follower_id`),
  KEY `FKe7q016tkmmfe3yy7dbbystd8t` (`following_id`),
  CONSTRAINT `FKe7q016tkmmfe3yy7dbbystd8t` FOREIGN KEY (`following_id`) REFERENCES `utenti` (`id`),
  CONSTRAINT `FKmeeul2y6y6n2vqh6eek8n0135` FOREIGN KEY (`follower_id`) REFERENCES `utenti` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `follows`
--

LOCK TABLES `follows` WRITE;
/*!40000 ALTER TABLE `follows` DISABLE KEYS */;
/*!40000 ALTER TABLE `follows` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `likes`
--

DROP TABLE IF EXISTS `likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `likes` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `id_ricetta` bigint DEFAULT NULL,
  `id_utente` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKjgej9quv40h8ikod4vxmptqha` (`id_ricetta`),
  KEY `FKhytyu14tavx8vjyg5t3wcqqby` (`id_utente`),
  CONSTRAINT `FKhytyu14tavx8vjyg5t3wcqqby` FOREIGN KEY (`id_utente`) REFERENCES `utenti` (`id`),
  CONSTRAINT `FKjgej9quv40h8ikod4vxmptqha` FOREIGN KEY (`id_ricetta`) REFERENCES `ricette` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `likes`
--

LOCK TABLES `likes` WRITE;
/*!40000 ALTER TABLE `likes` DISABLE KEYS */;
/*!40000 ALTER TABLE `likes` ENABLE KEYS */;
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
  `istruzioni` varchar(500) DEFAULT NULL,
  `titolo` varchar(255) DEFAULT NULL,
  `url_immagine` varchar(255) DEFAULT NULL,
  `id_utente` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKpfldavbqrivdd75g8hexbu8jr` (`id_utente`),
  CONSTRAINT `FKpfldavbqrivdd75g8hexbu8jr` FOREIGN KEY (`id_utente`) REFERENCES `utenti` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ricette`
--

LOCK TABLES `ricette` WRITE;
/*!40000 ALTER TABLE `ricette` DISABLE KEYS */;
INSERT INTO `ricette` VALUES (1,'2023-08-03 14:00:00.000000','Pasta, Pomodoro, Olio d\'oliva, Basilico','1. Cuoci la pasta...\n2. Prepara il sugo...','Pasta al Pomodoro','https://media-assets.lacucinaitaliana.it/photos/6411f3da3d6fc4cae3c3892b/16:9/w_3300,h_1856,c_limit/photo-07201503701.jpg',1),(2,'2023-08-04 16:30:00.000000','Savoiardi, Mascarpone, Caffè, Cacao','1. Prepara il caffè...\n2. Amalgama il mascarpone...','Tiramisù','https://www.tavolartegusto.it/wp/wp-content/uploads/2023/06/tiramisu-al-bicchiere.jpg',2),(3,'2023-08-10 18:58:38.000000','6 uova, 1kg di patate, parmigiano, pecorino, pangrattato, cipolla, sale e pepe q.b.','1. mescola le uova con sale e pepe, 2.taglia la cipolla in piccoli pezzi o a strisce e metti nelle uova, 3. 1 cucchiaio di pangrattato nelle uova,\r  4. 2 cucchiaia di parmigiano nelle uova, 5. 1 cucchiaio di pecorino e metti nelle uova, 6. metti la miscela in padella','Frittata con le patate','https://www.buttalapasta.it/wp-content/uploads/2016/09/frittata-di-patate.jpg',1),(4,'2023-08-10 19:07:50.000000','2 tuorli, 1 albume, gunaciale, parmigiano, pecorino, sale e pepe q.b.','1. mescola i due tuorli e l\'albune con due cucchiaia di pecorino, 1 cucchiaio di parmigiano, sale e pepe, 2.Cuoci la pasta, \n3. Amalgama la pasta in padella con il preparato e un pò di acqua di cottura,','Carbonara','https://blog.giallozafferano.it/albe/wp-content/uploads/2020/08/15FA1142-B5FA-410C-878B-2B8745B85F64.jpeg',2);
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
  `nome` varchar(255) DEFAULT NULL,
  `cognome` varchar(255) DEFAULT NULL,
  `foto` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `utenti`
--

LOCK TABLES `utenti` WRITE;
/*!40000 ALTER TABLE `utenti` DISABLE KEYS */;
INSERT INTO `utenti` VALUES (1,'2023-08-09 21:13:40.000000','dario@example.it','123','Dario','Pantaleo','https://us.123rf.com/450wm/grgroup/grgroup1705/grgroup170503204/78193675-sagoma-blu-con-met%C3%A0-corpo-di-chef-maschile-illustrazione-vettoriale.jpg'),(2,'2023-08-09 21:14:50.000000','ma.ro@ex.it','rossi','Mario','Rossi','https://us.123rf.com/450wm/grgroup/grgroup1705/grgroup170503204/78193675-sagoma-blu-con-met%C3%A0-corpo-di-chef-maschile-illustrazione-vettoriale.jpg'),(3,'2023-08-11 21:00:07.000000','vale.ve@ex.it','vale','Valeria','Verdi','https://us.123rf.com/450wm/grgroup/grgroup1705/grgroup170503399/78202782-sagoma-di-colore-e-spessore-contorno-di-met%C3%A0-corpo-di-illustrazione-vettoriale-cuoco-femminile.jpg?ver=6');
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

-- Dump completed on 2023-08-14 21:59:38
