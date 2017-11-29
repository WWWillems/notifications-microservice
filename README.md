## Notification MicroService
Spins up a Notification service that runs on port 3005.
Send Slack messages to the webhook you defined in ENDPOINT

Uses:

- Koa
- Cote
- Docker 
- Curlrequest
- Pug
- Nodemon
- Node.js + npm
    
#### Environment variables
There should be a `.env` file in your `/` directory.
It should look like this:

    NAME=name_of_your_service
    ENDPOINT=https://hooks.slack.com/services/zzzzzzzzz/yyyyyyyyy/xxxxxxxxxxxxxxxxxxxxxxxx
    PASSWORD=your_pass_here

**NOTE:** You need this file for this project to work.

####  How to get an Endpoint?
Navigate to `https://YOUR_WORKSPACE.slack.com/apps/manage/custom-integrations` and add a custom integration.


####  MicroService status
    http://localhost:3005
    
####  Notification Webhook
This webhook endpoint sends a Slack notification.

    http://localhost:3005/webhook

Example    
    
    POST http://localhost:3005/webhook
    
    POST BODY
    {
        channel: 'general',
        emoji: ':fire:',
        message: 'Something happened!'
    }

####  Add to your docker-compose.yml

    version: '2'
    services:
      notifications:
        image: "wwwillems/notifications-microservice"
        environment:
          NAME: "NOTIFICATIONS_SERVICE"
          ENDPOINT: "https://hooks.slack.com/services/zzzzzzzzz/yyyyyyyyy/xxxxxxxxxxxxxxxxxxxxxxxx"
          PASSWORD: "vuurman"
          PORT: "3005"
        ports:
         - "3005:3005"
