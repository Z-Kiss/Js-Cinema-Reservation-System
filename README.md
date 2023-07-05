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
* Sequelize
* Nuxt.js

## Plan

* Reservation
* Seats status change to pending, create reservation with email and seatId
* cron schedule task that after 2 minute will delete reservation if not paid and change back seats status
* Payment phase?, Sending email?
* ???


## Future plan 

Using websocket to see realtime seat status


### Day 1 

## Thoughts


- How to show and check seat status
    

    If I only fetch the database when render the seats, there could be a problem with timeing, if the seat will be reserved or freed up during the user picking seat.
    Either I need to check after the user picked the seat (before reserve it) and then if necessary fetch the seats status again and let the user choose again
    Or
    with websocket maybe I can do realtime checking and rendering

    Conclusion:
    It's felt it would be an overkill useing websocekt and checking realtime the seats status so instead I will create a middleware that will check the picked seat status.
    Maybe later I will implement just for curiosiy

- How to change seat status and delete reservation after 2 minute


    My first idea was useing a setTimeout but if the user closes the window it will not be executed.

    Conclusion:
    I will user cron to schedule a task at the backend and after 2 minute it will delete reservations that are hase a specific email and are not paid then change back seat statuses

- What libraries should I use:


    I tried to find libraries that are good for solveing specific problems. The badside of this that I needed to spend more time learn how to use those.

    Conclusion:
    Trial and Error and more research. I tried to use TypeORM because its looked similar to Spring Boot ORM but somewhat I coudn't use it so I changed to Sequelized.
    Maybe I should have asked what libraries are they useing.

- My solution is overcomplicated:


    When I came up with solution that are sounded very good on paper I needed to realize to focus on the core problem.

    Conclusion:
    I rethought my ideas and started to concentrate on solveing core problem and after if I have more time I will make it better.
    
