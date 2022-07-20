const mysql = require('mysql');
const dbConfig = require('../dbConfig/dbconfig.json');

module.exports={
    executeQuery:(sql)=>{
        return new Promise((resolve,reject)=>{
            const con = mysql.createConnection(dbConfig);
            con.connect(function(err){
                if(err){
                    reject(err);
                }
                con.query(sql,function(err, result, fields){
                    if(err){
                        reject(err);
                    }
                    con.end(()=>{
                        console.log("Connection ended successfully");
                    });
                    resolve(result);
                });
            });
    });
    }
} 