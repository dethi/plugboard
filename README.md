# Plugboard

## Installation

Requirements:
- PHP 7.1
- Composer
- Node.Js
- Yarn
- MySQL
- MongoDB
- Redis

### Back-End

```sh
# copy example settings and edit it
cp .env.example .env

# creates mandatory directories
mkdir -p bootstrap/cache
mkdir -p storage/app/public
mkdir -p storage/framework/cache
mkdir -p storage/framework/sessions
mkdir -p storage/framework/views
mkdir -p storage/logs

# install dependencies
composer install

# generate laravel secret key
php artisan key:generate

# run migration
php artisan migrate
```

### Front-End

```sh
# install dependencies
yarn

# build for developement
yarn run watch
# or for production
yarn run production
```

## Run Tests

### Back-End

```sh
# install phpunit
composer global require phpunit/phpunit

# run tests
phpunit
```

### Front-End

*(Not yet)*
