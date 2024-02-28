
const mysql = require("mysql2");
const dotenv = require('dotenv');
dotenv.config();

var con = null;
try {
  con = mysql.createPool({
    host: "coviddb.cu4aa78nopao.us-east-1.rds.amazonaws.com",
    user: "root",
    password: "5252864Mi",
      port: 3306,
    database: "covid_db"
    
  }).promise();
    console.log("db connected");
} catch (err) {
  console.log(err);
}

async function s() {
    const res = await con.query('show tables');
    console.log(res);
    
}
s();