# Plugboard

## Installation

Requirements:
- PHP 7
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

# install dependencies
composer install

# generate laravel secret key
php artisan key:generate

# run migration
php artisan migrate

# link storage
php artisan storage:link
```

### Front-End

```sh
# install dependencies
yarn

# bundle js
yarn run watch
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
