const mysql = require('mysql');
const dbConfig = require('../dbConfig/dbconfig.json');
const jwt = require('jsonwebtoken');
module.exports={
    login:(req, res) => {
        let userName = req.body.username;
        let password = req.body.password;
        const con = mysql.createConnection(dbConfig);
        con.connect(function (err) {
            if (err) {
                res.sendStatus(500);
            };
            con.query(`SELECT * FROM users where username='${userName}'`, function (err, result, fields) {
                if (err) {
                    res.sendStatus(500);
                };
                //   console.log(result);
                con.end(() => {
                    console.log("Connection ended sucessfully");
                })
                //   console.log(result[0].pass);
                let passWordFromDB = result[0].pass;
                if (password === passWordFromDB) {
                    //TodO return Jwt
    
                    jwt.sign({
                        data: {
                            user:userName
                        }
                    }, 'secretKey', { expiresIn: '1h' }, (err, encoded) => {
                        if (err) {
                            res.sendStatus(500);
                        }
                        res.json(
                            {
                                token: encoded
                            }
                        )
                    });
                }
                else {
                    res.json({
                        "msg": "Unauthorized"
                    });
                }
            });
        });
    }
};