//引入MySQL
const mysql = require('mysql');

async function query(sql = "select * from answer;") {
    //通过MySQL中方法创建链接对象
    var connection = mysql.createConnection({
        charset: 'utf8mb4',
        host: 'localhost',
        user: 'root',
        password: 'root',
        port: 3306,
        database: 'answerbook'
    });
    //开始连接
    connection.connect();
    //执行SQL语句 (添加、删除、更新、查询)
    connection.query(sql, (err, result) => {
        if (err) {
            console.error('err', err);
            return;
        }
        console.log('result', result);
    })
    //最后需要关闭连接
    connection.end();
}

module.exports = {
    query: query,
}