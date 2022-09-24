SELECT
    total_count,
    chinese_count,
    english_count
FROM
    (
        SELECT
            count(id) AS total_count,
            count(DISTINCT chinese) AS chinese_count,
            count(DISTINCT english) AS english_count
        FROM
            `answer`
    ) as tab