#!/bin/bash

set -euo pipefail

if [ $TRAVIS_BRANCH == 'master' ]; then
    echo '=== Starting deployment of plugboard_prod...'

    git fetch --unshallow

    git remote add deploy 'deploy@plugboard.xyz:~/plugboard_prod'
    ssh-agent bash -c 'ssh-add "$DEPLOY_KEY" && git push --force deploy master:master'

    echo '=== Deployment completed!'
fi
