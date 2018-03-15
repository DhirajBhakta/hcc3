-- MySQL dump 10.16  Distrib 10.1.28-MariaDB, for Linux (x86_64)
--
-- Host: localhost    Database: HCC_DATABASE
-- ------------------------------------------------------
-- Server version	10.1.28-MariaDB

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
-- Current Database: `HCC_DATABASE`
--

/*!40000 DROP DATABASE IF EXISTS `HCC_DATABASE`*/;

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `HCC_DATABASE` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `HCC_DATABASE`;

--
-- Table structure for table `api_batch`
--

DROP TABLE IF EXISTS `api_batch`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `api_batch` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `batch` varchar(255) NOT NULL,
  `rack` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `expiry_date` date NOT NULL,
  `drug_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `api_batch_drug_id_67e4df21_fk_api_drug_id` (`drug_id`),
  CONSTRAINT `api_batch_drug_id_67e4df21_fk_api_drug_id` FOREIGN KEY (`drug_id`) REFERENCES `api_drug` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_batch`
--

LOCK TABLES `api_batch` WRITE;
/*!40000 ALTER TABLE `api_batch` DISABLE KEYS */;
INSERT INTO `api_batch` VALUES (1,'batch_001',1,100,'2020-03-09',1),(2,'batch_002',2,50,'2019-03-27',1),(3,'batch_003',3,75,'2022-03-12',1),(4,'batch_001',5,100,'2020-09-01',2),(5,'batch_002',6,50,'2020-06-11',2),(6,'batch_003',9,75,'2026-03-12',2),(7,'batch_01',11,100,'2019-12-23',3),(8,'batch_02',16,50,'2020-12-12',3),(9,'batch_03',14,75,'2019-03-27',3),(10,'batch_01',10,100,'2020-01-09',4),(11,'batch_02',11,50,'2021-01-01',4),(12,'batch_03',12,75,'2019-05-06',4),(13,'xxxXXX_01',8,100,'2025-11-11',5),(14,'xxxXXX_02',9,50,'2026-04-01',5),(15,'xxxXXX_03',20,75,'2018-12-06',5),(29,'batch_huchcha',2,269,'2019-11-15',1),(30,'batch_huchcha',9,269,'2019-11-15',2);
/*!40000 ALTER TABLE `api_batch` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `api_course`
--

DROP TABLE IF EXISTS `api_course`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `api_course` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(16) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_course`
--

LOCK TABLES `api_course` WRITE;
/*!40000 ALTER TABLE `api_course` DISABLE KEYS */;
INSERT INTO `api_course` VALUES (1,'B.Tech.'),(2,'M.Tech.'),(3,'MBA'),(4,'M.Sc'),(5,'MCA'),(6,'Ph.D');
/*!40000 ALTER TABLE `api_course` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `api_department`
--

DROP TABLE IF EXISTS `api_department`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `api_department` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(64) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_department`
--

LOCK TABLES `api_department` WRITE;
/*!40000 ALTER TABLE `api_department` DISABLE KEYS */;
INSERT INTO `api_department` VALUES (1,'Applied Mechanics and Hydraulics'),(2,'Chemical Engineering'),(3,'Chemistry'),(4,'Civil Engineering'),(5,'Computer Science and Engineering'),(6,'Electrical and Electronics Engineering'),(7,'Electronics and Communication Engineering'),(8,'Information Technology'),(9,'Mathematical and Computational Sciences'),(10,'Mechanical Engineering'),(11,'Metallurgical and Materials Engineering'),(12,'Mining Engineering'),(13,'Physics'),(14,'Placement and Training'),(15,'Humanities, Social Sciences and Management'),(16,'Administrative Office'),(17,'Central Computer Center'),(18,'Central Library'),(19,'Health Care Center'),(20,'Garden Section'),(21,'Hostel Office'),(22,'Resident Engineers Office'),(23,'Sports Section'),(24,'Security');
/*!40000 ALTER TABLE `api_department` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `api_dispenseddrug`
--

DROP TABLE IF EXISTS `api_dispenseddrug`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `api_dispenseddrug` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `quantity` int(11) NOT NULL,
  `batch_id` int(11) DEFAULT NULL,
  `record_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `api_dispenseddrug_batch_id_record_id_ca2eeaf1_uniq` (`batch_id`,`record_id`),
  KEY `api_dispenseddrug_record_id_8d98a65d_fk_api_pharmarecord_id` (`record_id`),
  CONSTRAINT `api_dispenseddrug_batch_id_78f4e751_fk_api_batch_id` FOREIGN KEY (`batch_id`) REFERENCES `api_batch` (`id`),
  CONSTRAINT `api_dispenseddrug_record_id_8d98a65d_fk_api_pharmarecord_id` FOREIGN KEY (`record_id`) REFERENCES `api_pharmarecord` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_dispenseddrug`
--

LOCK TABLES `api_dispenseddrug` WRITE;
/*!40000 ALTER TABLE `api_dispenseddrug` DISABLE KEYS */;
/*!40000 ALTER TABLE `api_dispenseddrug` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `api_doctor`
--

DROP TABLE IF EXISTS `api_doctor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `api_doctor` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `specialization` varchar(64) NOT NULL,
  `person_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `api_doctor_person_id_7d1c1275_uniq` (`person_id`),
  CONSTRAINT `api_doctor_person_id_7d1c1275_fk_api_person_id` FOREIGN KEY (`person_id`) REFERENCES `api_person` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_doctor`
--

LOCK TABLES `api_doctor` WRITE;
/*!40000 ALTER TABLE `api_doctor` DISABLE KEYS */;
INSERT INTO `api_doctor` VALUES (1,'Orthopaedics',2);
/*!40000 ALTER TABLE `api_doctor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `api_drug`
--

DROP TABLE IF EXISTS `api_drug`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `api_drug` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `generic_name` varchar(255) NOT NULL,
  `trade_name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_drug`
--

LOCK TABLES `api_drug` WRITE;
/*!40000 ALTER TABLE `api_drug` DISABLE KEYS */;
INSERT INTO `api_drug` VALUES (1,'glyburide','DIABETA'),(2,'ipratropium / albuterol solution','DUONEB'),(3,'dihydroergotamine mesylate','D.H.E. 45'),(4,'valproic acid','DEPAKENE'),(5,'dantrolene','DANTRIUM'),(6,'dummy','DUMMY'),(7,'dummy_02','DUMMY_02'),(8,'dummy_03','DUMMY_03'),(9,'dummy_04','DUMMY_04'),(10,'dummy_05','DUMMY_05');
/*!40000 ALTER TABLE `api_drug` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `api_person`
--

DROP TABLE IF EXISTS `api_person`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `api_person` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `date_of_birth` date NOT NULL,
  `gender` varchar(1) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `guardian_phone` varchar(15) DEFAULT NULL,
  `local_address` longtext NOT NULL,
  `permanent_address` longtext NOT NULL,
  `blood_group` varchar(3) NOT NULL,
  `patient_type` varchar(1) NOT NULL,
  `retired` tinyint(1) DEFAULT NULL,
  `designation` varchar(255) DEFAULT NULL,
  `course_id` int(11) DEFAULT NULL,
  `department_id` int(11) DEFAULT NULL,
  `patron_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`),
  KEY `api_person_course_id_59c7bf72_fk_api_course_id` (`course_id`),
  KEY `api_person_department_id_a3e90446_fk_api_department_id` (`department_id`),
  KEY `api_person_patron_id_2b6e5467_fk_api_person_id` (`patron_id`),
  CONSTRAINT `api_person_course_id_59c7bf72_fk_api_course_id` FOREIGN KEY (`course_id`) REFERENCES `api_course` (`id`),
  CONSTRAINT `api_person_department_id_a3e90446_fk_api_department_id` FOREIGN KEY (`department_id`) REFERENCES `api_department` (`id`),
  CONSTRAINT `api_person_patron_id_2b6e5467_fk_api_person_id` FOREIGN KEY (`patron_id`) REFERENCES `api_person` (`id`),
  CONSTRAINT `api_person_user_id_c3411bd2_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_person`
--

LOCK TABLES `api_person` WRITE;
/*!40000 ALTER TABLE `api_person` DISABLE KEYS */;
INSERT INTO `api_person` VALUES (1,'Dhiraj Bhakta K','1995-11-15','M','9483895729','9449331002','Room A401, MT2\r\nNITK Hostels,\r\nNITK Surathkal,\r\nKarnataka','\'Prithvi\', Opposite Sai Radha Empire Apartments\r\nChitpady,\r\nUdupi','O+','S',0,NULL,1,8,NULL,3),(2,'Bhaskar Bhandary','1965-03-12','M','9876543214','9865452365','Somewhere in NITK','Somewhere in India','B+','E',0,'Senior Doctor',NULL,19,NULL,4),(3,'Prashant the pharmacist','1989-03-22','M','7894568974','7899458795','Some room in HCC NITK','Somewhere in Udupi','AB+','E',0,'Junior Pharmacist',NULL,19,NULL,6),(4,'Professor Sriwidya','1965-09-14','M','9483895729',NULL,'Employee quarters , NITK','Employee quarters , NITK','A-','E',1,'Professor',NULL,6,NULL,7),(5,'Ramana Sriwidya','1996-05-01','M','9875478654','9874563211','Employee quarters, NITK','Employee quarters, NITK','B+','D',NULL,NULL,NULL,NULL,4,NULL),(6,'Prawina Sriwidya','1996-05-15','M','8745962135',NULL,'Employee quarters, NITK','Employee quarters, NITK','O+','D',NULL,NULL,NULL,NULL,4,NULL);
/*!40000 ALTER TABLE `api_person` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `api_pharmarecord`
--

DROP TABLE IF EXISTS `api_pharmarecord`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `api_pharmarecord` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `prescription_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `api_pharmarecord_prescription_id_cf084276_fk_api_prescription_id` (`prescription_id`),
  CONSTRAINT `api_pharmarecord_prescription_id_cf084276_fk_api_prescription_id` FOREIGN KEY (`prescription_id`) REFERENCES `api_prescription` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_pharmarecord`
--

LOCK TABLES `api_pharmarecord` WRITE;
/*!40000 ALTER TABLE `api_pharmarecord` DISABLE KEYS */;
/*!40000 ALTER TABLE `api_pharmarecord` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `api_pharmarecordbuffer`
--

DROP TABLE IF EXISTS `api_pharmarecordbuffer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `api_pharmarecordbuffer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `status` varchar(1) NOT NULL,
  `record_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `api_pharmarecordbuffer_record_id_775732d1_fk_api_pharmarecord_id` (`record_id`),
  CONSTRAINT `api_pharmarecordbuffer_record_id_775732d1_fk_api_pharmarecord_id` FOREIGN KEY (`record_id`) REFERENCES `api_pharmarecord` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_pharmarecordbuffer`
--

LOCK TABLES `api_pharmarecordbuffer` WRITE;
/*!40000 ALTER TABLE `api_pharmarecordbuffer` DISABLE KEYS */;
/*!40000 ALTER TABLE `api_pharmarecordbuffer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `api_prescribeddrug`
--

DROP TABLE IF EXISTS `api_prescribeddrug`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `api_prescribeddrug` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `quantity` int(11) NOT NULL,
  `comments` longtext NOT NULL,
  `drug_id` int(11) NOT NULL,
  `prescription_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `api_prescribeddrug_drug_id_f2aa6699_fk_api_drug_id` (`drug_id`),
  KEY `api_prescribeddrug_prescription_id_b5a0b09e_fk_api_presc` (`prescription_id`),
  CONSTRAINT `api_prescribeddrug_drug_id_f2aa6699_fk_api_drug_id` FOREIGN KEY (`drug_id`) REFERENCES `api_drug` (`id`),
  CONSTRAINT `api_prescribeddrug_prescription_id_b5a0b09e_fk_api_presc` FOREIGN KEY (`prescription_id`) REFERENCES `api_prescription` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_prescribeddrug`
--

LOCK TABLES `api_prescribeddrug` WRITE;
/*!40000 ALTER TABLE `api_prescribeddrug` DISABLE KEYS */;
INSERT INTO `api_prescribeddrug` VALUES (11,12,'1-1-1 daily',2,19),(12,21,'1-1-1-',4,20),(13,11,'1-1-1-1-1-1',2,21),(14,1,'1-1-1',2,22),(15,1,'1-1-1',2,23),(16,1,'1-0-0',4,24),(17,1,'1-0-0',4,25),(18,1,'1-0-0',4,26),(19,12,'1-1-1-1',3,27),(20,12,'1-1-1-1',3,28),(21,20,'1-1-1',1,29),(22,23,'1-1-1-1-1-1-1-1',4,30),(23,20,'2-1-2',1,31),(24,20,'2-3-2',2,32),(25,20,'2=2-3',3,33),(26,21,'2-1-2',3,34),(27,2,'1-2-3',2,35),(28,1,'1-0-0',5,36),(29,30,'2-1-23',5,37),(30,20,'20202',2,38);
/*!40000 ALTER TABLE `api_prescribeddrug` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `api_prescription`
--

DROP TABLE IF EXISTS `api_prescription`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `api_prescription` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `indication` varchar(255) NOT NULL,
  `date_time` datetime(6) NOT NULL,
  `doctor_id` int(11) DEFAULT NULL,
  `patient_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `api_prescription_doctor_id_0376905c_fk_api_doctor_id` (`doctor_id`),
  KEY `api_prescription_patient_id_3cc548c3_fk_api_person_id` (`patient_id`),
  CONSTRAINT `api_prescription_doctor_id_0376905c_fk_api_doctor_id` FOREIGN KEY (`doctor_id`) REFERENCES `api_doctor` (`id`),
  CONSTRAINT `api_prescription_patient_id_3cc548c3_fk_api_person_id` FOREIGN KEY (`patient_id`) REFERENCES `api_person` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_prescription`
--

LOCK TABLES `api_prescription` WRITE;
/*!40000 ALTER TABLE `api_prescription` DISABLE KEYS */;
INSERT INTO `api_prescription` VALUES (19,'hed pain','2018-03-13 14:09:43.444679',1,1),(20,'ddf','2018-03-13 14:24:35.646366',1,1),(21,'qwety','2018-03-13 14:29:27.252066',1,1),(22,'sdf','2018-03-13 14:42:31.178393',1,1),(23,'sdf','2018-03-13 14:42:36.153726',1,1),(24,'df','2018-03-13 14:43:32.007236',1,1),(25,'df','2018-03-13 14:43:37.558187',1,1),(26,'df','2018-03-13 14:43:40.016707',1,1),(27,'sdf','2018-03-13 14:44:11.829581',1,1),(28,'sdf','2018-03-13 14:44:14.584592',1,1),(29,'sdfsdf','2018-03-13 14:45:18.342435',1,4),(30,'fever','2018-03-13 14:48:11.290923',1,6),(31,'Hello','2018-03-13 15:36:16.223662',1,4),(32,'df','2018-03-13 15:37:41.129541',1,6),(33,'df','2018-03-13 15:38:22.186623',1,1),(34,'df','2018-03-13 15:39:10.929146',1,1),(35,'q','2018-03-13 15:40:08.392380',1,5),(36,'halth paoin','2018-03-13 15:41:38.572025',1,4),(37,'hello','2018-03-13 15:42:31.958354',1,1),(38,'eye oin','2018-03-13 15:44:30.073667',1,4);
/*!40000 ALTER TABLE `api_prescription` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group`
--

DROP TABLE IF EXISTS `auth_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_group` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(80) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group`
--

LOCK TABLES `auth_group` WRITE;
/*!40000 ALTER TABLE `auth_group` DISABLE KEYS */;
INSERT INTO `auth_group` VALUES (5,'DEVELOPER'),(2,'DOCTOR'),(1,'PATIENT'),(3,'PHARMA'),(4,'RECEPTIONIST');
/*!40000 ALTER TABLE `auth_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group_permissions`
--

DROP TABLE IF EXISTS `auth_group_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_group_permissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `group_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group_permissions`
--

LOCK TABLES `auth_group_permissions` WRITE;
/*!40000 ALTER TABLE `auth_group_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_permission`
--

DROP TABLE IF EXISTS `auth_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_permission` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `content_type_id` int(11) NOT NULL,
  `codename` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`),
  CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` VALUES (1,'Can add log entry',1,'add_logentry'),(2,'Can change log entry',1,'change_logentry'),(3,'Can delete log entry',1,'delete_logentry'),(4,'Can add permission',2,'add_permission'),(5,'Can change permission',2,'change_permission'),(6,'Can delete permission',2,'delete_permission'),(7,'Can add group',3,'add_group'),(8,'Can change group',3,'change_group'),(9,'Can delete group',3,'delete_group'),(10,'Can add user',4,'add_user'),(11,'Can change user',4,'change_user'),(12,'Can delete user',4,'delete_user'),(13,'Can add content type',5,'add_contenttype'),(14,'Can change content type',5,'change_contenttype'),(15,'Can delete content type',5,'delete_contenttype'),(16,'Can add session',6,'add_session'),(17,'Can change session',6,'change_session'),(18,'Can delete session',6,'delete_session'),(19,'Can add batch',7,'add_batch'),(20,'Can change batch',7,'change_batch'),(21,'Can delete batch',7,'delete_batch'),(22,'Can add drug',8,'add_drug'),(23,'Can change drug',8,'change_drug'),(24,'Can delete drug',8,'delete_drug'),(25,'Can add patient',10,'add_patient'),(26,'Can change patient',10,'change_patient'),(27,'Can delete patient',10,'delete_patient'),(28,'Can add department',9,'add_department'),(29,'Can change department',9,'change_department'),(30,'Can delete department',9,'delete_department'),(31,'Can add course',11,'add_course'),(32,'Can change course',11,'change_course'),(33,'Can delete course',11,'delete_course'),(34,'Can add person',12,'add_person'),(35,'Can change person',12,'change_person'),(36,'Can delete person',12,'delete_person'),(37,'Can add prescription',13,'add_prescription'),(38,'Can change prescription',13,'change_prescription'),(39,'Can delete prescription',13,'delete_prescription'),(40,'Can add prescribed drug',14,'add_prescribeddrug'),(41,'Can change prescribed drug',14,'change_prescribeddrug'),(42,'Can delete prescribed drug',14,'delete_prescribeddrug'),(43,'Can add doctor',15,'add_doctor'),(44,'Can change doctor',15,'change_doctor'),(45,'Can delete doctor',15,'delete_doctor'),(46,'Can add dispensed drug',16,'add_dispenseddrug'),(47,'Can change dispensed drug',16,'change_dispenseddrug'),(48,'Can delete dispensed drug',16,'delete_dispenseddrug'),(49,'Can add pharma record',17,'add_pharmarecord'),(50,'Can change pharma record',17,'change_pharmarecord'),(51,'Can delete pharma record',17,'delete_pharmarecord'),(52,'Can add pharma record buffer',18,'add_pharmarecordbuffer'),(53,'Can change pharma record buffer',18,'change_pharmarecordbuffer'),(54,'Can delete pharma record buffer',18,'delete_pharmarecordbuffer');
/*!40000 ALTER TABLE `auth_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user`
--

DROP TABLE IF EXISTS `auth_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) NOT NULL,
  `first_name` varchar(30) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `email` varchar(254) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user`
--

LOCK TABLES `auth_user` WRITE;
/*!40000 ALTER TABLE `auth_user` DISABLE KEYS */;
INSERT INTO `auth_user` VALUES (2,'pbkdf2_sha256$100000$sBwsjb68XyIY$uEYCiIq+SQuJsBstoQ1kbnieYGL2OryO+AVX+i5UU24=','2018-03-05 19:21:28.000000',1,'dhirajbhakta','','','dhirajbhakta110@gmail.com',1,1,'2018-03-05 19:21:05.000000'),(3,'pbkdf2_sha256$100000$ui7lIkpDRi7z$0hZcL3R70Tndzx0k2uDaBz46kFMEzkYZjSpwHYm62w4=',NULL,0,'14IT110','','','',0,1,'2018-03-05 20:08:04.000000'),(4,'pbkdf2_sha256$100000$WaM4Qd9HY4Lw$UwNiHqW+ClMVXRiKp0ABgBGalzlHrDvyBoeYSYymFro=',NULL,0,'DOC001','','','',0,1,'2018-03-09 08:22:39.000000'),(5,'pbkdf2_sha256$100000$qHGlDo6Xb8aD$g7QKoPfORn/O3Vg7OOYnPWFXmHx1aQ7vZ1/S0qX8xBU=',NULL,0,'DOC002','','','',0,1,'2018-03-09 08:23:24.000000'),(6,'pbkdf2_sha256$100000$ATNscJw8K5qW$53UcdZwZfjiBB5DoATdocGYyouC5x22CH0Q+G54BLGc=',NULL,0,'PHARMA001','','','',0,1,'2018-03-09 08:26:36.000000'),(7,'pbkdf2_sha256$100000$yXjjeupRwDDW$Ec5M0dQkwej0pFQ18wptaWAvAt1iWO5ou1y5FUY/09c=',NULL,0,'EMP001','Professor Sriwidya','','',0,1,'2018-03-11 14:13:26.000000');
/*!40000 ALTER TABLE `auth_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user_groups`
--

DROP TABLE IF EXISTS `auth_user_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_user_groups` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_groups_user_id_group_id_94350c0c_uniq` (`user_id`,`group_id`),
  KEY `auth_user_groups_group_id_97559544_fk_auth_group_id` (`group_id`),
  CONSTRAINT `auth_user_groups_group_id_97559544_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  CONSTRAINT `auth_user_groups_user_id_6a12ed8b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user_groups`
--

LOCK TABLES `auth_user_groups` WRITE;
/*!40000 ALTER TABLE `auth_user_groups` DISABLE KEYS */;
INSERT INTO `auth_user_groups` VALUES (2,2,5),(1,3,1),(3,4,2),(4,5,2),(5,6,3),(6,7,1);
/*!40000 ALTER TABLE `auth_user_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user_user_permissions`
--

DROP TABLE IF EXISTS `auth_user_user_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_user_user_permissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_user_permissions_user_id_permission_id_14a6b632_uniq` (`user_id`,`permission_id`),
  KEY `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user_user_permissions`
--

LOCK TABLES `auth_user_user_permissions` WRITE;
/*!40000 ALTER TABLE `auth_user_user_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user_user_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_admin_log`
--

DROP TABLE IF EXISTS `django_admin_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `django_admin_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint(5) unsigned NOT NULL,
  `change_message` longtext NOT NULL,
  `content_type_id` int(11) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  KEY `django_admin_log_user_id_c564eba6_fk` (`user_id`),
  CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `django_admin_log_user_id_c564eba6_fk` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=100 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_admin_log`
--

LOCK TABLES `django_admin_log` WRITE;
/*!40000 ALTER TABLE `django_admin_log` DISABLE KEYS */;
INSERT INTO `django_admin_log` VALUES (1,'2018-03-05 19:49:29.449547','1','Department object (1)',1,'[{\"added\": {}}]',9,2),(2,'2018-03-05 19:50:00.820976','2','Department object (2)',1,'[{\"added\": {}}]',9,2),(3,'2018-03-05 19:50:46.515608','3','Chemistry',1,'[{\"added\": {}}]',9,2),(4,'2018-03-05 19:50:55.478362','4','Civil Engineering',1,'[{\"added\": {}}]',9,2),(5,'2018-03-05 19:51:08.565000','5','Computer Science and Engineering',1,'[{\"added\": {}}]',9,2),(6,'2018-03-05 19:51:21.908127','6','Electrical and Electronics Engineering',1,'[{\"added\": {}}]',9,2),(7,'2018-03-05 19:51:44.491923','7','Electronics and Communication Engineering',1,'[{\"added\": {}}]',9,2),(8,'2018-03-05 19:51:56.026200','8','Information Technology',1,'[{\"added\": {}}]',9,2),(9,'2018-03-05 19:52:13.618091','9','Mathematical and Computational Sciences',1,'[{\"added\": {}}]',9,2),(10,'2018-03-05 19:52:31.650536','10','Mechanical Engineering',1,'[{\"added\": {}}]',9,2),(11,'2018-03-05 19:52:58.147440','11','Metallurgical and Materials Engineering',1,'[{\"added\": {}}]',9,2),(12,'2018-03-05 19:53:07.573662','12','Mining Engineering',1,'[{\"added\": {}}]',9,2),(13,'2018-03-05 19:53:14.793600','13','Physics',1,'[{\"added\": {}}]',9,2),(14,'2018-03-05 19:53:23.174026','14','Placement and Training',1,'[{\"added\": {}}]',9,2),(15,'2018-03-05 19:53:40.386353','15','Humanities, Social Sciences and Management',1,'[{\"added\": {}}]',9,2),(16,'2018-03-05 19:53:53.475329','16','Administrative Office',1,'[{\"added\": {}}]',9,2),(17,'2018-03-05 19:54:05.472687','17','Central Computer Center',1,'[{\"added\": {}}]',9,2),(18,'2018-03-05 19:54:14.169219','18','Central Library',1,'[{\"added\": {}}]',9,2),(19,'2018-03-05 19:54:23.875608','19','Health Care Center',1,'[{\"added\": {}}]',9,2),(20,'2018-03-05 19:54:33.713187','20','Garden Section',1,'[{\"added\": {}}]',9,2),(21,'2018-03-05 19:54:42.361938','21','Hostel Office',1,'[{\"added\": {}}]',9,2),(22,'2018-03-05 19:54:53.228151','22','Resident Engineers Office',1,'[{\"added\": {}}]',9,2),(23,'2018-03-05 19:55:01.830252','23','Sports Section',1,'[{\"added\": {}}]',9,2),(24,'2018-03-05 19:55:06.522309','24','Security',1,'[{\"added\": {}}]',9,2),(25,'2018-03-05 19:55:40.442744','1','Course object (1)',1,'[{\"added\": {}}]',11,2),(26,'2018-03-05 19:55:47.513032','2','Course object (2)',1,'[{\"added\": {}}]',11,2),(27,'2018-03-05 19:55:52.584980','3','Course object (3)',1,'[{\"added\": {}}]',11,2),(28,'2018-03-05 19:55:56.689405','4','Course object (4)',1,'[{\"added\": {}}]',11,2),(29,'2018-03-05 19:56:05.986320','5','Course object (5)',1,'[{\"added\": {}}]',11,2),(30,'2018-03-05 19:56:13.750231','6','Course object (6)',1,'[{\"added\": {}}]',11,2),(31,'2018-03-05 20:08:04.328278','3','14IT110',1,'[{\"added\": {}}]',4,2),(32,'2018-03-05 20:13:19.226267','1','Patient object (1)',1,'[{\"added\": {}}]',10,2),(33,'2018-03-08 18:43:43.272389','3','14IT110',2,'[{\"changed\": {\"fields\": [\"groups\"]}}]',4,2),(34,'2018-03-08 18:44:06.382181','2','dhirajbhakta',2,'[{\"changed\": {\"fields\": [\"groups\"]}}]',4,2),(35,'2018-03-09 08:22:39.512362','4','DOC001',1,'[{\"added\": {}}]',4,2),(36,'2018-03-09 08:22:57.637004','4','DOC001',2,'[{\"changed\": {\"fields\": [\"groups\"]}}]',4,2),(37,'2018-03-09 08:23:24.321302','5','DOC002',1,'[{\"added\": {}}]',4,2),(38,'2018-03-09 08:23:36.048620','5','DOC002',2,'[{\"changed\": {\"fields\": [\"groups\"]}}]',4,2),(39,'2018-03-09 08:26:36.496339','6','PHARMA001',1,'[{\"added\": {}}]',4,2),(40,'2018-03-09 08:26:45.738128','6','PHARMA001',2,'[{\"changed\": {\"fields\": [\"groups\"]}}]',4,2),(41,'2018-03-09 08:47:52.303925','2','Bhaskar Bhandary: E',1,'[{\"added\": {}}]',12,2),(42,'2018-03-09 08:50:57.249120','3','Prashant the pharmacist: E',1,'[{\"added\": {}}]',12,2),(43,'2018-03-11 14:13:26.544626','7','EMP001',1,'[{\"added\": {}}]',4,2),(44,'2018-03-11 14:13:59.407587','7','EMP001',2,'[{\"changed\": {\"fields\": [\"first_name\", \"groups\"]}}]',4,2),(45,'2018-03-11 14:19:13.943409','4','Professor Sriwidya: E',1,'[{\"added\": {}}]',12,2),(46,'2018-03-11 14:21:31.647464','5','Ramana Sriwidya: D',1,'[{\"added\": {}}]',12,2),(47,'2018-03-11 14:22:50.170974','6','Prawina Sriwidya: D',1,'[{\"added\": {}}]',12,2),(48,'2018-03-12 07:20:27.124022','1','Drug object (1)',1,'[{\"added\": {}}]',8,2),(49,'2018-03-12 07:21:06.780503','2','Drug object (2)',1,'[{\"added\": {}}]',8,2),(50,'2018-03-12 07:21:39.182804','3','Drug object (3)',1,'[{\"added\": {}}]',8,2),(51,'2018-03-12 07:22:12.248606','4','Drug object (4)',1,'[{\"added\": {}}]',8,2),(52,'2018-03-12 07:22:39.236615','5','Drug object (5)',1,'[{\"added\": {}}]',8,2),(53,'2018-03-12 07:27:11.006918','1','Batch object (1)',1,'[{\"added\": {}}]',7,2),(54,'2018-03-12 07:27:49.507825','2','Batch object (2)',1,'[{\"added\": {}}]',7,2),(55,'2018-03-12 07:28:32.237535','3','Batch object (3)',1,'[{\"added\": {}}]',7,2),(56,'2018-03-12 07:29:05.795152','4','Batch object (4)',1,'[{\"added\": {}}]',7,2),(57,'2018-03-12 07:29:29.689075','5','Batch object (5)',1,'[{\"added\": {}}]',7,2),(58,'2018-03-12 07:29:57.286829','6','Batch object (6)',1,'[{\"added\": {}}]',7,2),(59,'2018-03-12 07:36:49.878865','7','batch_01(D.H.E. 45 (dihydroergotamine mesylate))100',1,'[{\"added\": {}}]',7,2),(60,'2018-03-12 07:37:14.608028','8','batch_02(D.H.E. 45 (dihydroergotamine mesylate))50',1,'[{\"added\": {}}]',7,2),(61,'2018-03-12 07:39:01.160310','9','batch_03(D.H.E. 45 (dihydroergotamine mesylate))75',1,'[{\"added\": {}}]',7,2),(62,'2018-03-12 07:40:43.263506','10','batch_01(DEPAKENE (valproic acid))100',1,'[{\"added\": {}}]',7,2),(63,'2018-03-12 07:41:06.333104','11','batch_02(DEPAKENE (valproic acid))50',1,'[{\"added\": {}}]',7,2),(64,'2018-03-12 07:42:13.457616','12','batch_03(DEPAKENE (valproic acid))75',1,'[{\"added\": {}}]',7,2),(65,'2018-03-12 07:42:49.891218','13','xxxXXX_01(DANTRIUM (dantrolene))100',1,'[{\"added\": {}}]',7,2),(66,'2018-03-12 07:43:15.438789','14','xxxXXX_02(DANTRIUM (dantrolene))50',1,'[{\"added\": {}}]',7,2),(67,'2018-03-12 07:43:47.992262','15','xxxXXX_03(DANTRIUM (dantrolene))75',1,'[{\"added\": {}}]',7,2),(68,'2018-03-13 11:01:42.861286','1','Doctor object (1)',1,'[{\"added\": {}}]',15,2),(69,'2018-03-13 12:42:55.432508','2','Prescription object (2)',3,'',13,2),(70,'2018-03-13 12:42:55.493559','1','Prescription object (1)',3,'',13,2),(71,'2018-03-13 12:49:23.121947','8','Prescription object (8)',3,'',13,2),(72,'2018-03-13 12:49:23.157096','7','Prescription object (7)',3,'',13,2),(73,'2018-03-13 12:49:23.201707','6','Prescription object (6)',3,'',13,2),(74,'2018-03-13 12:49:23.313196','5','Prescription object (5)',3,'',13,2),(75,'2018-03-13 12:49:23.346497','4','Prescription object (4)',3,'',13,2),(76,'2018-03-13 12:49:23.379979','3','Prescription object (3)',3,'',13,2),(77,'2018-03-13 13:12:26.162209','13','Prescription object (13)',3,'',13,2),(78,'2018-03-13 13:12:26.242267','12','Prescription object (12)',3,'',13,2),(79,'2018-03-13 13:12:26.276002','11','Prescription object (11)',3,'',13,2),(80,'2018-03-13 13:12:26.309258','10','Prescription object (10)',3,'',13,2),(81,'2018-03-13 13:12:26.342645','9','Prescription object (9)',3,'',13,2),(82,'2018-03-13 13:20:58.035435','14','Prescription object (14)',3,'',13,2),(83,'2018-03-13 14:04:25.669798','18','Prescription object (18)',3,'',13,2),(84,'2018-03-13 14:04:25.743405','17','Prescription object (17)',3,'',13,2),(85,'2018-03-13 14:04:25.776847','16','Prescription object (16)',3,'',13,2),(86,'2018-03-13 14:04:25.810297','15','Prescription object (15)',3,'',13,2),(87,'2018-03-14 15:15:33.692118','18','batch_091(DIABETA (glyburide))10',3,'',7,2),(88,'2018-03-14 15:15:33.812179','17','batch_011(DIABETA (glyburide))20',3,'',7,2),(89,'2018-03-14 15:15:33.878246','16','batch_009(DIABETA (glyburide))20',3,'',7,2),(90,'2018-03-14 16:14:11.900523','28','batch_0919191(DUONEB (ipratropium / albuterol solution))75',3,'',7,2),(91,'2018-03-14 16:14:11.994745','27','batch_0919191(DIABETA (glyburide))75',3,'',7,2),(92,'2018-03-14 16:14:12.039077','26','batch_099(DUONEB (ipratropium / albuterol solution))75',3,'',7,2),(93,'2018-03-14 16:14:12.083623','25','batch_099(DIABETA (glyburide))75',3,'',7,2),(94,'2018-03-14 16:14:12.139442','24','batch_011(DUONEB (ipratropium / albuterol solution))75',3,'',7,2),(95,'2018-03-14 16:14:12.239771','23','batch_011(DIABETA (glyburide))75',3,'',7,2),(96,'2018-03-14 16:14:12.284295','22','batch_010(DUONEB (ipratropium / albuterol solution))75',3,'',7,2),(97,'2018-03-14 16:14:12.328931','21','batch_010(DIABETA (glyburide))75',3,'',7,2),(98,'2018-03-14 16:14:12.373525','20','batch_009(DUONEB (ipratropium / albuterol solution))75',3,'',7,2),(99,'2018-03-14 16:14:12.418066','19','batch_009(DIABETA (glyburide))75',3,'',7,2);
/*!40000 ALTER TABLE `django_admin_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_content_type`
--

DROP TABLE IF EXISTS `django_content_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `django_content_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_content_type`
--

LOCK TABLES `django_content_type` WRITE;
/*!40000 ALTER TABLE `django_content_type` DISABLE KEYS */;
INSERT INTO `django_content_type` VALUES (1,'admin','logentry'),(7,'api','batch'),(11,'api','course'),(9,'api','department'),(16,'api','dispenseddrug'),(15,'api','doctor'),(8,'api','drug'),(10,'api','patient'),(12,'api','person'),(17,'api','pharmarecord'),(18,'api','pharmarecordbuffer'),(14,'api','prescribeddrug'),(13,'api','prescription'),(3,'auth','group'),(2,'auth','permission'),(4,'auth','user'),(5,'contenttypes','contenttype'),(6,'sessions','session');
/*!40000 ALTER TABLE `django_content_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_migrations`
--

DROP TABLE IF EXISTS `django_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `django_migrations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'contenttypes','0001_initial','2018-03-05 18:25:58.958862'),(2,'auth','0001_initial','2018-03-05 18:26:05.993786'),(3,'admin','0001_initial','2018-03-05 18:26:07.636189'),(4,'admin','0002_logentry_remove_auto_add','2018-03-05 18:26:07.682815'),(5,'api','0001_initial','2018-03-05 18:26:09.492497'),(6,'api','0002_auto_20180305_1816','2018-03-05 18:26:09.637738'),(7,'contenttypes','0002_remove_content_type_name','2018-03-05 18:26:10.665528'),(8,'auth','0002_alter_permission_name_max_length','2018-03-05 18:26:11.334940'),(9,'auth','0003_alter_user_email_max_length','2018-03-05 18:26:12.028032'),(10,'auth','0004_alter_user_username_opts','2018-03-05 18:26:12.072285'),(11,'auth','0005_alter_user_last_login_null','2018-03-05 18:26:12.488152'),(12,'auth','0006_require_contenttypes_0002','2018-03-05 18:26:12.521792'),(13,'auth','0007_alter_validators_add_error_messages','2018-03-05 18:26:12.583105'),(14,'auth','0008_alter_user_username_max_length','2018-03-05 18:26:13.930393'),(15,'auth','0009_alter_user_last_name_max_length','2018-03-05 18:26:14.657252'),(16,'sessions','0001_initial','2018-03-05 18:26:15.262071'),(17,'api','0003_course_department_patient','2018-03-05 19:49:06.816666'),(18,'api','0002_auto_20180306_0646','2018-03-06 06:47:17.719127'),(19,'api','0003_auto_20180311_1417','2018-03-11 14:17:29.217278'),(20,'api','0004_auto_20180312_2134','2018-03-12 21:34:52.953053'),(21,'api','0005_auto_20180314_0713','2018-03-14 07:13:30.323983');
/*!40000 ALTER TABLE `django_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_session`
--

DROP TABLE IF EXISTS `django_session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_expire_date_a5c62663` (`expire_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_session`
--

LOCK TABLES `django_session` WRITE;
/*!40000 ALTER TABLE `django_session` DISABLE KEYS */;
INSERT INTO `django_session` VALUES ('4nfei86ky738n9wo7hks6u9agi11ekt4','Mzk5NDZhMTUwODRjZjljODQ5MzAwMWQ2MjdjMTIyYTQ1ODQ1ZTNiNzp7Il9hdXRoX3VzZXJfaWQiOiIyIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI1NTNlMjc4NDQwZWFmMGE0MGRmMGE5OTk4OTA1YTA1NDA3ZTE3Yjk3In0=','2018-03-19 19:21:28.483327');
/*!40000 ALTER TABLE `django_session` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-03-15 13:43:51
