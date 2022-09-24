-- CREATE TEMPORARY TABLE tmp_table SELECT distinct text FROM answer
drop table if exists tmp_table
CREATE TABLE tmp_table SELECT distinct text FROM answer order by text