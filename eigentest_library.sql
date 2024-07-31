/*
 Navicat Premium Dump SQL

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 80300 (8.3.0)
 Source Host           : localhost:3306
 Source Schema         : eigentest_library

 Target Server Type    : MySQL
 Target Server Version : 80300 (8.3.0)
 File Encoding         : 65001

 Date: 31/07/2024 19:15:15
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for books
-- ----------------------------
DROP TABLE IF EXISTS `books`;
CREATE TABLE `books` (
  `code` varchar(10) NOT NULL,
  `title` varchar(255) NOT NULL,
  `author` varchar(255) NOT NULL,
  `stock` int NOT NULL,
  `isBorrowed` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of books
-- ----------------------------
BEGIN;
INSERT INTO `books` (`code`, `title`, `author`, `stock`, `isBorrowed`) VALUES ('HOB-83', 'The Hobbit, or There and Back Again', 'J.R.R. Tolkien', 1, 0);
INSERT INTO `books` (`code`, `title`, `author`, `stock`, `isBorrowed`) VALUES ('JK-45', 'Harry Potter', 'J.K Rowling', 1, 0);
INSERT INTO `books` (`code`, `title`, `author`, `stock`, `isBorrowed`) VALUES ('NRN-7', 'The Lion, the Witch and the Wardrobe', 'C.S. Lewis', 1, 0);
INSERT INTO `books` (`code`, `title`, `author`, `stock`, `isBorrowed`) VALUES ('SHR-1', 'A Study in Scarlet', 'Arthur Conan Doyle', 1, 0);
INSERT INTO `books` (`code`, `title`, `author`, `stock`, `isBorrowed`) VALUES ('TW-11', 'Twilight', 'Stephenie Meyer', 1, 0);
COMMIT;

-- ----------------------------
-- Table structure for borrowed_books
-- ----------------------------
DROP TABLE IF EXISTS `borrowed_books`;
CREATE TABLE `borrowed_books` (
  `id` int NOT NULL AUTO_INCREMENT,
  `memberCode` varchar(10) DEFAULT NULL,
  `bookCode` varchar(10) DEFAULT NULL,
  `borrowDate` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `memberCode` (`memberCode`),
  KEY `bookCode` (`bookCode`),
  CONSTRAINT `borrowed_books_ibfk_1` FOREIGN KEY (`memberCode`) REFERENCES `members` (`code`),
  CONSTRAINT `borrowed_books_ibfk_2` FOREIGN KEY (`bookCode`) REFERENCES `books` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of borrowed_books
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for members
-- ----------------------------
DROP TABLE IF EXISTS `members`;
CREATE TABLE `members` (
  `code` varchar(10) NOT NULL,
  `name` varchar(255) NOT NULL,
  `penaltyEndDate` datetime DEFAULT NULL,
  PRIMARY KEY (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of members
-- ----------------------------
BEGIN;
INSERT INTO `members` (`code`, `name`, `penaltyEndDate`) VALUES ('M001', 'Angga', NULL);
INSERT INTO `members` (`code`, `name`, `penaltyEndDate`) VALUES ('M002', 'Ferry', NULL);
INSERT INTO `members` (`code`, `name`, `penaltyEndDate`) VALUES ('M003', 'Putri', NULL);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
