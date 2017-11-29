'use strict';

const Requester = require('cote').Requester;

const notificationRequester = new Requester({
  name: process.env.NAME + '_REQUESTER',
  namespace: process.env.NAME,
  requests: ['send-notification'],
});

function createRequest(channel, emoji, message) {
  const req = {
    type: 'send-notification',
    val: {
      channel,
      emoji,
      message
    },
  };

  notificationRequester.send(req, function(res) {
    console.log('Slack notification sent to: ' , res.channel);
  });
}

module.exports = createRequest;
