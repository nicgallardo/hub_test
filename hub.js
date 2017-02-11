

var config = {
  count: -1,
  iteration: 100,
  end: 1000
};

var hub = {
  writer: (log, string, cb)=>{
    var fs = require('fs');
    fs.appendFile(log + '.txt', string, (err) => {
      if (err) console.log('writing error : \n\t ' + err);
      cb(null, true);
    });
  },
  kickoff: ()=>{
    if(config.count > config.end){
      console.log('complete hub process');
      process.exit(1);
    }else{
      const execFile = require('child_process').execFile;
      // if(config.count === config.end - 101) config.iteration++;
      const child = execFile('node', ['worker.js' , config.count, config.count + config.iteration], (error, stdout, stderr) => {
        if (error || stderr) {
          var finalError = error || stderr;
          hub.writer('error_log', `\n!!!!!!!!!!!!!\n Error occured in count` + config.count + ` :\n \t\t` + finalError +`\n!!!!!!!!!!!!!\n`, (writeErr, writeRes)=>{
            config.count += 100;
            hub.kickoff();
          })
        };
        if (stdout){
          hub.writer('write_log', `\n*****\n`+  stdout +`\n*****\n`, (writeErr, writeRes)=>{
            config.count += 100;
            hub.kickoff();
          })
        };
      });
    }
  }
};

hub.kickoff()
