const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit : 100,
    host            : '104.196.165.56',
    user            : 'teamDD',
    password        : 'BolajiRobertJovan2022',
    database        : 'KnowItAllSports'
  });

module.exports = pool;