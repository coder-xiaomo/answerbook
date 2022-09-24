const request = require('request');

// 请求 APi 接口
async function query(opts) {
    var return_data = await new Promise((resolve) => {
        // console.log("opts", opts);
        request(opts, (error, response, result) => {
            // console.log("error, response, result", error, response, result);
            // console.log("error, result", error, result);
            if (!error && (response.statusCode == 200)) {
                // 请求成功
                resolve(result);
            } else {
                // 请求失败
                console.log(`error is ${error}`);
                resolve({});
            }
        });
    });
    // console.log(`return_data is ${JSON.stringify(return_data)}`);
    return return_data;
}

module.exports = {
    query: query,
}
