const executeQuery = require('./executeQuery');
const axios = require('axios');
const CONSTANTS = require('./constants/constants');
module.exports = {
    searchShortcuts:async function(req,res){
        let result =await axios.post('http://localhost:3001/listAllShortcuts',{
            "token":req.body.token,
            "username":req.body.username,
            "sort":"false",
            "sortCriteria":""
        });
        let shortcuts = result.data;
        let searchText = req.body.searchText;
        let searchWith = req.body.searchWith;
        switch(searchWith){
            case CONSTANTS.SHORT_LINK:
                res.json(shortcuts.filter((value)=>{
                    if(value.shortlink.toLowerCase().includes(searchText.toLowerCase())){
                        return value;
                    }
                }));
                break;
            case CONSTANTS.DESC:
                res.json(shortcuts.filter((value)=>{
                    if(value.description_shortlink.toLowerCase().includes(searchText.toLowerCase())){
                        return value;
                    }
                }));
                break;
            case CONSTANTS.TAG:
                res.json(shortcuts.filter((value)=>{
                    if(value.tags.filter((v1)=>{
                        if(v1.tags.toLowerCase().includes(searchText.toLowerCase())){
                            return v1;
                        }
                    }).length>0){
                        return value;
                    }
                }));
                break;
            default:
                res.json({
                    "msg":"UNEXPECTED_COMPUTATIONAL_ERROR"
                })
        }
    } 
};