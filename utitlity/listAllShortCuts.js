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

module.exports ={
    listAllShortcuts:async (req,res)=>{
        let shortcuts;
        let result = await executeQuery.executeQuery(`select * from shortcuts where username='${req.body.username}'`);
        console.log(result);
        shortcuts = result;
        console.log(result.length);
        //TODO MAKE This Call Parallel
        let tagids = [];
        for(let i=0;i<result.length;i++){
            console.log(result[i].tagid);
            tagids.push(result[i].tagid);
        }
        console.log(tagids);
        // for(let i=0;i<shortcuts.length;i++){
        //     shortcuts[i].tags=[]
        // }
        for(let i=0;i<tagids.length;i++){
            result = await executeQuery.executeQuery(`select * from tag where tagid='${tagids[i]}'`)
            
            for(let i1=0;i1<shortcuts.length;i1++){
                if(shortcuts[i1].tagid===tagids[i]){
                    shortcuts[i1].tags=result;
                }
            }
        }
        res.json(shortcuts);
    }
}