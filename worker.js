var process = require('process');
var count = process.argv[2],
    end = process.argv[3];

var kickoff = ()=>{
  count++;
  if(count === 50) throw "Some error";
  if ( count > end){
    console.log('complete');
  } else {
    console.log('ran '+ count);
    kickoff()
  };
};

kickoff();
