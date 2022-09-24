SET
  FOREIGN_KEY_CHECKS = 0;

CREATE DATABASE `answerbook` CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_german2_ci';

USE `answerbook`;

-- ----------------------------
-- Table structure for answer
-- ----------------------------
DROP TABLE IF EXISTS `answer`;

CREATE TABLE `answer` (
  `wy_id` int(11) DEFAULT NULL COMMENT '网易id',
  `text` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '问题答案',
  UNIQUE KEY `wy_id` (`wy_id`,`text`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;

CREATE TABLE `answer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `text` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '问题答案',
  PRIMARY KEY (`id`),
  UNIQUE KEY `text` (`text`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

SET
  FOREIGN_KEY_CHECKS = 1;

