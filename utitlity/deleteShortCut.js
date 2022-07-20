const executeQuery = require('./executeQuery');

module.exports={
    deleteShortCuts:async function(req,res){
        let result = await executeQuery.executeQuery(`select tagid from shortcuts where shortlink='${req.body.shortlink}' and username='${req.body.username}'`)
        // console.log(result)
        let tagids=[];
        for(let i=0;i<result.length;i++){
            tagids.push(result[i].tagid);
        }
        try{
        for(let i=0;i<tagids.length;i++){
            result = await executeQuery.executeQuery(`delete from tag where tagid=${tagids[i]}`);
            console.log(result);
        }
        }
        catch(err){
            console.log(err);
        }         
        result = await executeQuery.executeQuery(`delete from shortcuts where shortlink = '${req.body.shortlink}';`)
        res.send(200);
    }
};
