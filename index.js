const express = require('express');
const app = express();
const cors = require("cors");
const login = require('./utitlity/login');
const verifyToken = require('./utitlity/verifyToken');
const createShortcut = require('./utitlity/createShortcut');
const listAllShortcuts = require('./utitlity/listAllShortCuts');
const deleteShortCuts = require('./utitlity/deleteShortCut');
const searchShortcut = require('./utitlity/searchShortcut');
app.use(cors());
app.use(express.json());


app.post('/login',login.login);


app.post('/createShortcut',verifyToken.verifyToken,createShortcut.createShortcut);

app.post('/listAllShortcuts',verifyToken.verifyToken,listAllShortcuts.listAllShortcuts);

app.post('/deleteShortcuts',verifyToken.verifyToken,deleteShortCuts.deleteShortCuts);

app.post('/searchShortcut',verifyToken.verifyToken,searchShortcut.searchShortcuts);

app.post("/isValidToken",verifyToken.verifyToken,(req,res)=>{
    console.log(req.body);
    res.sendStatus(200);
});

app.listen(3001, () => {
    console.log("App Started at 3001");
});



