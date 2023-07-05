### Bárdi Auto - HomeWork

## About

Create application that can reserve seats at the movie theater

## Task

* 1 You can reserve through web
* 2 Only 1 reservation to 1 free seat
* 3 One user can reserve 1 or 2 seat
* 4 If the payment was not successful the seat should be free again after 2 minute
* 5 Users should see the status of the seat
* 5 In case of a successful payment we need to ask the user's email to send out a mail and need to change the seat status

## Technologies to use

* Express.js
* Socket.IO / maybe
* TypeORM
* Nuxt.js

## Plan

* Reservation
* Seats status change to reserved
* cron schedule task
* Payment phase

If payment was successful seat status will change to paid
If payment was unsuccessful seat status will remain and the scheduled task will change the status back to free

## Future plan 

Using websocket to see realtime seat status

