var curl = require('curlrequest');

module.exports = function postToSlack (payload){
  const { url, channel, username, emoji, message } = payload;

  let options = {
    url: url,
    //data: `payload={"channel": "#vape-app", "username": "VapeDawn", "text": "${message}", "icon_emoji": "${emoji}"}`,
    data: `payload={"channel": "${channel}", "username": "${username}", "text": "${message}", "icon_emoji": "${emoji}"}`,
  };

  const cb = (err, res )=> {
    if(err){
      console.log('ERROR!' , err)
    }else{
      //console.log('> Slack notification successfully sent!')
      return res;
    }
  };

  curl.request(options, cb);
};

