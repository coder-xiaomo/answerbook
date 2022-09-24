const mysql = require('mysql');
const closeWithGrace = require('close-with-grace');

//创建数据库连接池
let pool = mysql.createPool({
    connectionLimit: 10, //连接数量，默认是10
    charset: 'utf8mb4',
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: 3306,
    database: 'answerbook'
});

//从连接池中获取连接时，将触发该事件
pool.on('acquire', function (conn) {
    // console.log('获取连接', conn.threadId);
});

//在连接池中建立新连接时，将触发该事件
pool.on('connection', function (conn) {
    console.log('建立新连接', conn.threadId);
});

//等待可用连接时，将触发该事件
pool.on('enqueue', function () {
    console.log('等待可用连接');
});

//当连接释放回池中时，触发该事件
pool.on('release', function (conn) {
    // console.log('连接被释放回池中', conn.threadId);
});


async function query(sql = 'select * from answer') {
    return await new Promise(function (resolve, reject) {
        //pool.query()方法可以自动的帮我们在连接池中获取可用连接
        pool.query(sql, function (err, data) {
            if (err) reject(err);
            // console.log(data);
            resolve(data);
        });

        // //当然我们也可以手动获取可用连接
        // pool.getConnection(function (err, conn) {
        //     if (err) {
        //         throw err;
        //     }
        //     conn.query('select * from `order`', function (err, data) {
        //         if (err) {
        //             throw err;
        //         }
        //         data.forEach(function (value) {
        //             console.log(value.id, value.order_id, value.user_id);
        //         });

        //         //连接用完之后，需要释放，重新放回连接池中。
        //         //注意这里并没有销毁该连接，该连接仍然可用，但需要重新获取
        //         conn.release();
        //     });
        // });
    });
}

function close() {
    pool.end(function (err) {
        console.log('关闭连接池', err);
    });
}

module.exports = {
    query: query,
    close: close,
}