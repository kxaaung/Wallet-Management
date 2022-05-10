# Wallet Management API
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)
* [Features](#features)

## General Info
This project is the simple wallet management api.

## Technologies
The project created with :
* nodejs version : 14.18.2
* mongoose version: 6.3.2
* express version: 4.18.1

## Setup
To run this project, install it locally using npm:
```
$npm install
$npm start
```
For development environment :
```
$npm install
$npm run dev
```

## Features
### Users
* Create User
* Get Users List
* Get User by id
* Update User's Data by id
* Update User's Mail

### Wallets
* Deposit to a Wallet by wallet id
* Record deposit amount and time in deposit list of Wallet
* Get Wallets List
* Delete by wallet's id if the balance = 0
