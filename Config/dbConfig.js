'use strict';

var mysql = require('mysql');

var mysql_pool  = mysql.createPool({
    host            : process.env.DB_IP || 'localhost',
    user            : process.env.DB_USER || 'root',
    password        : process.env.DB_PASSWORD || 'hello@123',
    database        : process.env.DB_NAME || 'test'
  });
 



  // let createUserTable = (connection) => {
  //   return new Promise( async (resolve, reject) => {
  //       try {
  //         let query = "CREATE TABLE t1 (i1 INT DEFAULT 0, i2 INT, i3 INT, i4 INT);"
  //         connection.query(query,function(err,rows){
  //             console.log(mysql_pool._freeConnections.indexOf(connection)); // -1
  //             connection.release();
  //             console.log(mysql_pool._freeConnections.indexOf(connection));  //0
  //             if(!err) {
  //                 resolve({rows: rows});
  //                 return;  
  //             }           
  //         });
  //         connection.on('error', function(err) {    
  //           console.log(err, '=====================DB ERROR')  
  //             reject(err);
  //             return;     
  //         });
  //       }
  //       catch(error) {
  //           console.log(error, '==xcvxcv==sdfsdfsdf================================');
  //           // expected output: SyntaxError: unterminated string literal
  //           // Note - error messages will vary depending on browser
  //         }
  //   });
  // }


  // (async () => {
  //   return new Promise((resolve, reject) => {
  //       try {
  //           mysql_pool.getConnection(async (err,connection) => {
  //                   if (err) {
  //                     await mysql_pool.query("CREATE DATABASE "+process.env.DB_NAME+"  CHARACTER SET utf8 COLLATE utf8_general_ci;" , function (err, result) {  
  //                       console.log(err, "CREATE DATABASE "+process.env.DB_NAME+"  CHARACTER SET utf8 COLLATE utf8_general_ci;")
  //                       if (err) return reject(err);
  //                         console.log("Database created");  
  //                       });   
  //                   }   
  //                 //  await createUserTable(connection);
  //               });
  //       }
  //       catch(error) {
  //           console.log(error, '==xcvxcv==sdfsdfsdf================================');
  //           // expected output: SyntaxError: unterminated string literal
  //           // Note - error messages will vary depending on browser
  //       }
  //   });
  // })();

module.exports = {
  mysql_pool :mysql_pool
}
