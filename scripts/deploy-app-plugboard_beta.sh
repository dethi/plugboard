#!/bin/bash

set -euo pipefail

if [ $TRAVIS_BRANCH == 'develop' ]; then
    echo '=== Starting deployment of plugboard_beta...'

    (
        cd ..
        rm -rf .git
        git init
        git add {.gitignore,artisan,composer.json,composer.lock}
        git add {app,bootstrap,config,database,public,resources/media,resources/lang,resources/views,routes,storage}
        git add -f {public/js,public/css,public/media,public/mix-manifest.json}
        git commit -m 'Deployment release'
    )

    git remote add deploy 'deploy@plugboard.xyz:~/plugboard_beta'
    ssh-agent bash -c 'ssh-add "$DEPLOY_KEY" && git push --force deploy develop:master'

    echo '=== Deployment completed!'
fi
