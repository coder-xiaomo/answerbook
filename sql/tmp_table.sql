-- CREATE TEMPORARY TABLE tmp_table SELECT distinct text FROM answer

drop table if exists tmp_table;
CREATE TABLE tmp_table SELECT distinct text FROM answer order by text;
drop table if exists answer;
ALTER TABLE tmp_table RENAME answer;
ALTER TABLE `answer`
    ADD COLUMN `id` int NOT NULL AUTO_INCREMENT FIRST,
    ADD PRIMARY KEY (`id`),
    ADD UNIQUE INDEX(`text`);