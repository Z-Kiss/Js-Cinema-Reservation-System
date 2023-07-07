# Homework

## About

Creating a seat reservation system


## The application built up with:

* Node.js
* Express.js
* Sequelize (ORM)
* MySql database


## Setup

1. After Cloning the repository you need to install the dependencies

From the root directory use this command:

```
npm install
```

2. Before you can start the application you need to fill out the _*.env*_ file in the root directory with the needed information to connect with the database

3. After that you can start the application with this command:

```
npm start
```

## Status

Currently, it's only a working backend that communicate with MySql database.

For testing purpose I implemented 2 helper function for populating the database.
One run after Login, but after there is an endpoint that you can call to add as much seat as you want for testing.
(I explain the endpoints a little bit later)

## Postman

For testing the project with Postman use this link to access the Workplace that I used:
https://app.getpostman.com/join-team?invite_code=24285dd7bdcf934e7ff0bde593bbb1f7&target_code=e5ace584b3b8a1e8b3a34aafb05769d8


## Features

 - Login/Logout. It's just a shell.
 - Populate database with given number of seats
 - Get all seats
 - Reserve seats
 - Get all reservations
 - Payment
 - Mail service

## Logic of the project

    
    I felt necessary to implement some minimalistic authentication system to be able
    to separate different reservations and control reservations per person.
    
    I check authentication, and necesarry variables in request bodies through middlewares,
    to throw back request as soon as I know its bad.

    For makeing a reservation I check:
    - authentication
    - how much reservation the user has
    - choosen seats are avaliable

    Then making a reservation and after changing the corresponding seat status.
    And the last I schedule a task to delete reservations,
    using setTimeout with given email and seatIds.

    If payment was succesful (email provided),
    I'm sending an email to the given email address.

    I planned the application in a way where you can modifyin the .env:
    MAXIMUM_AMOUNT_OF_SEAT_THAT_USER_CAN_RESERVE:, for setting up how much reservation the user can make
    RESERVATION_TIME_LIMIT:, timelimmit for paying

### Thoughts
    
    My opinion that I's not necessary to creat reservation records in the database,
    but I tought its more "real life" scenario like this. 

    At the beginning my idea was to use websocket,
    to be able to show correct status of the seats in realtime.
    I neede to realize it would be an overkill.

    I hope i'm not misunderstood the task of the homework,
    but in case of that I wanted to thank you for the opportunity.


# Implemented features:

## Authentication

- Login


    Login using "/auth" endpoint with POST requests,
    where you need to provide a "name" variable in the request body
    After provideing it will create a cooki that only store the username.
    The important endpoints are secured and you need to Login to use them.

- Logout


    Logout using "/auth" endpoint with GET requests,
    Only deleteing the cookie

## Seats

- Populate Database


    Using "/seats" endpoint with POST requests,
    requerie the next variables in the request body:
    "amountOfRow", how much row of seats in the room
    "amountOfSeatInRow", how much seat in a row
    (for deafault there is 2 seat in the room)

- Get all existing seats with status


    Using "/seats" endpoint with GET requests,
    Only returning all the seats from the database

## Reservation

- Get all reservations with paid status field


    Using "/reservation" endpoint with GET requests,
    return all the reservasions that users made

- Make reservation


    Using "/reservation" endpoint with POST request,
    require a "seatsId" variable that contains id of the seats in an Array.
    Those seat's status with the presented id will change to "foglalt",
    and reservation will created in database with fields:
    "name" that will contain the user's name who made the reservation
    "seatId" the reserved seat/seats id
    "paid" boolean field
    After 2 minute only those reservation will be deleted,
    that are'nt paid and made under the same name that given at the reservation


# Future plans

- Implement real authentication, authorization
- Create fronted for representing data
- Implement websocket technology to realtime seat status checking