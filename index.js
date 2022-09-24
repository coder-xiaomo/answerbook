// const { createServer } = require('http')
const closeWithGrace = require('close-with-grace')
const dbPool = require('./src/db_pool')
const apiResult = require('./src/api_result')
const fs = require('fs');

const sqlFile = 'sql/answer.sql';

console.log('Starting ...');

async function doQuery() {
    try {
        // from： https://love.163.com/webapp/special/answerbook/#/ask
        let result = await apiResult.query({
            method: 'POST',
            url: "https://love.163.com/open/api/activity/answerBook/generateResult",
            timeout: 3000,
            headers: {
                "content-type": "application/x-www-form-urlencoded",
                "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36 Edg/105.0.1343.42",
                "origin": "https://love.163.com",
                "referer": "https://love.163.com/webapp/special/answerbook/",
            },
            form: {
                "resultPicUrl": "https://lovepicture.nosdn.127.net/-6910837894781852896?imageView"
            }
        })
        let resultJSON = JSON.parse(result);
        // console.log(resultJSON);
        let data = resultJSON.data.activityVo;
        if (!!data.resultDetial) {
            let sql = `INSERT INTO answer (text) VALUES ('${data.resultDetial}');`;
            // console.log(data.resultDetial, sql);
            console.log(data.resultDetial);
            await dbPool.query(sql);
            // appendFile(sql);
        }
    } catch (e) {
        console.error(`[error] code: ${e.code}, message: ${e.message}`);
    }
}

async function sleep(ms) {
    await new Promise(function (resolve, reject) {
        setTimeout(resolve, ms);
    });
}

let isExit = false;
async function main() {
    for (let i = 0; i < 1000000; i++) {
        if (isExit) return;
        await doQuery();
        await sleep(2500);
    }
    dbPool.close();
}
// main();

function appendFile(string) {
    fs.appendFile('sqls.sql', `${string}\n`, (err) => {
        if (err) {
            console.log('出错')
        } else {
            console.log('追加内容')
        }
    })
}

// 答案转sql
function convertAnswerTxtToSql() {
    let lines = fs.readFileSync('answer.txt', 'utf8').split(/[\n\r]/);
    lines = Array.from(new Set(lines)).filter(s => !!s).map(s => {
        return `INSERT INTO \`answer\` (text) VALUES ('${s.replace('。', '')}');`;
    }).sort();
    fs.writeFileSync('answer.sql', lines.join('\n'));
}
convertAnswerTxtToSql();

// 去重
function removeDuplicate() {
    let lines = fs.readFileSync(sqlFile, 'utf8').split(/[\n\r]/);
    lines = Array.from(new Set(lines)).filter(s => !!s).sort();
    fs.writeFileSync(sqlFile, lines.join('\n'));
}
// 执行SQL
async function readSQLAndExecute() {
    let lines = fs.readFileSync(sqlFile, 'utf8').split(/[\n\r]/);
    let count = 0;
    let errCount = 0;
    for (let i = 0; i < lines.length; i++) {
        const sql = lines[i].trim();
        try {
            await dbPool.query(sql);
        } catch (err) {
            errCount++;
            // console.error(err);
        }
        console.log(`count: ${++count}, errCount: ${errCount}, total: ${lines.length}`);
        await sleep(10);
    }
    console.log("done");
}
removeDuplicate();
// readSQLAndExecute();

closeWithGrace({ delay: 1000 }, function (opts, cb) {
    console.log(opts, 'closing')
    isExit = true;
    dbPool.close();
})

