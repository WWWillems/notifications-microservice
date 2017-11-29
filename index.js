var path = require('path');

console.log('Looking for ENV variables in ' , path.resolve(__dirname, './.env'))

// Loads ENV variables
require('dotenv').config({path: path.resolve(__dirname, './.env'), silent: true});

const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const Pug = require('koa-pug');
const route = require('koa-route');

const app = new Koa();
app.use(bodyParser());

console.log('Booting' , process.env.NAME, '@', process.env.ENDPOINT, process.env.PASSWORD);

new Pug({
  viewPath: './views',
  app: app
});

// Init service
var requester = require('./requesters/requester');
var responder = require('./responders/responder');

// Lazy man's DB
var arrLogs = [];

const sendNotification = async (ctx) => {
  if(ctx.request.body){
    var { channel, emoji, message } = ctx.request.body;

    if(!channel || !emoji || !message){
      ctx.throw(500,'Not enough params, please define channel, emoji and message');
    }else{
      if (arrLogs.length == 4) {
        arrLogs = arrLogs.slice(1, arrLogs.length - 1);
      }

      arrLogs = arrLogs.concat({
        datetime: new Date().toUTCString(), channel, emoji, message
      });

      requester(channel, emoji, message);
    }
  }else{
    ctx.throw(500,'No body found, please define channel, emoji and message in the request body');
  }
}

app.use(route.post('/webhook', sendNotification));

app.use(async ctx => {
  ctx.render('index', { status: 'up', logs: arrLogs });
});

app.listen(process.env.PORT);
console.log(process.env.NAME + ":" + process.env.PORT +" is listening!");
