SELECT
    total_count,
    distinct_count,
    total_count - distinct_count AS repeat_count
FROM
    (
        SELECT
            count(text) AS total_count,
            count(DISTINCT text) AS distinct_count
        FROM
            `answer`
    ) as tab