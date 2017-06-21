#!/bin/bash

set -euo pipefail

if [ $TRAVIS_BRANCH == 'master' ]; then
    echo '=== Starting deployment of plugboard_prod...'

    rm -rf .git
    git init
    git add {.gitignore,artisan,composer.json,composer.lock}
    git add {app,bootstrap,config,database,public,resources/media,resources/lang,resources/views,routes,storage}
    git add -f {public/js,public/css,public/media,public/mix-manifest.json}
    git commit -m 'Deployment release'

    git remote add deploy 'deploy@plugboard.xyz:~/plugboard_prod'
    ssh-agent bash -c 'ssh-add "$DEPLOY_KEY" && git push --force deploy master:master'

    echo '=== Deployment completed!'
fi
