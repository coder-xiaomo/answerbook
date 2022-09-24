SET
  FOREIGN_KEY_CHECKS = 0;

CREATE DATABASE `answerbook` CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_general_ci';

USE `answerbook`;

-- ----------------------------
-- Table structure for answer
-- ----------------------------
DROP TABLE IF EXISTS `answer`;
CREATE TABLE `answer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `chinese` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '中文',
  `english` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '英文',
  PRIMARY KEY (`id`),
  UNIQUE KEY `text` (`chinese`,`english`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

SET
  FOREIGN_KEY_CHECKS = 1;
