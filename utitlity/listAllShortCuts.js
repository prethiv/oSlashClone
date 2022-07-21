const executeQuery = require('./executeQuery');
const CONSTANTS = require('./constants/constants');
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

  function compareShortLink( a, b ) {
    if ( a.shortlink < b.shortlink ){
      return -1;
    }
    if ( a.shortlink > b.shortlink ){
      return 1;
    }
    return 0;
  }

  function compareDescription( a, b ) {
    if ( a.description_shortlink < b.description_shortlink ){
      return -1;
    }
    if ( a.description_shortlink > b.description_shortlink ){
      return 1;
    }
    return 0;
  }

  function compareFullUrl( a, b ) {
    if ( a.full_url < b.full_url ){
      return -1;
    }
    if ( a.full_url > b.full_url ){
      return 1;
    }
    return 0;
  }

  function compareTag( a, b ) {
    if ( a.tagid < b.tagid ){
      return -1;
    }
    if ( a.tagid > b.tagid ){
      return 1;
    }
    return 0;
  }

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


        let sort = req.body.sort;

        if(sort==='true'){
            let criteria = req.body.sortCriteria;
            switch(criteria){
                case CONSTANTS.SHORT_LINK:
                    res.json(shortcuts.sort(compareShortLink));
                    break;
                case CONSTANTS.DESC:
                    res.json(shortcuts.sort(compareDescription));
                    break;
                case CONSTANTS.FULL_URL:
                    res.json(shortcuts.sort(compareFullUrl));
                    break;
                case CONSTANTS.TAG:
                    res.json(shortcuts.sort(compareTag));
                    break;
            }
        }
        else{
            res.json(shortcuts);
        }
    }
}