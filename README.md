# README


__Star Wars web site__

## Description
Web application displaying Star Wars characters

## Installation

#### System dependencies

* Ruby ~2.5.3

* Rails ~5.2.3

* Reactjs ~16.8.6

* PostgreSQL ~11 with Postgres ~2.2.4

* Node / NPM / Yarn

#### System Setup

Clone this repository
```bash
git clone 'https://github...'
cd repo
```

Open a new command window and run
```bash
bundle install
yarn install
$ rails webpacker:install
$ rails webpacker:install:react
$ rails generate react:install
```

#### Database creation

Database is populated with the seed.rb script
```bash
rake db:migrate
rake db:seed
```

#### Running the app

Simply run
```bash
rails server
```
Open your bowser on localhost:3000 and see the app running !

## Datas

All datas for characters are from the SWAPI free api

The images are from the starwars-visualguide website
