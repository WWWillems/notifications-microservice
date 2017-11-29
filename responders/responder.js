'use strict';

const Responder = require('cote').Responder;
var postToSlack = require('./../slack');

// Instantiate a new Responder component.
const notificationsReponder = new Responder({
  name: process.env.NAME + '_RESPONDER',
  namespace: process.env.NAME,
  respondsTo: ['send-notification'], // types of requests this responder can respond to.
});

// request handlers are like any event handler.
notificationsReponder.on('send-notification', function(req, cb) {
  var { channel, emoji, message} = req.val;

  postToSlack({
    url:      process.env.ENDPOINT,
    channel:  '#' + channel,
    username: process.env.NAME,
    emoji,
    message
  });

  cb(req.val);
});

