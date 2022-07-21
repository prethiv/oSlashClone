const executeQuery = require('./executeQuery');

String.prototype.hashCode = function() {
    var hash = 0, i, chr;
    if (this.length === 0) return hash;
    for (i = 0; i < this.length; i++) {
      chr   = this.charCodeAt(i);
      hash  = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
  };
const shortlinkAlreadyThere = (dbresult,shortlink)=>{
    let allShortLinks =[];
    for(let i=0;i<dbresult.length;i++){
        allShortLinks.push(dbresult[i].shortlink);
    }

    if(allShortLinks.includes(shortlink)){
        return true;
    }
    else{
        return false;
    }
}

module.exports={
    createShortcut:async (req,res)=>{
            console.log(req.body)
            let result =await executeQuery.executeQuery(`select shortlink from shortcuts where username='${req.body.username}'`);
            console.log(result);
            if(shortlinkAlreadyThere(result,req.body.shortlink)){
                res.json({
                    "err":"ShortLink Already Exists for this user with same name"
                });
            }
            else{
                let hash =req.body.username+req.body.shortlink;
                console.log(hash);
                console.log(hash.hashCode());
                let result = await executeQuery.executeQuery(`Insert into shortcuts Values ('${req.body.username}','${req.body.shortlink}','${req.body.description_shortlink}','${req.body.full_url}','${hash.hashCode()}');`)
                let tags = req.body.tags;
                for(let i=0;i<tags.length;i++){
                    result = await executeQuery.executeQuery(`Insert into tag Values ('${hash.hashCode()}','${tags[i]}')`);
                }
                res.json({
                    msg:"Shortcut created successfully"
                });
            } 
    }
};