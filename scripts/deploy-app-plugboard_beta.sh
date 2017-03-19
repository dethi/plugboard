#!/bin/bash

set -euo pipefail

if [ $TRAVIS_BRANCH == 'develop' ]; then
    echo '=== Starting deployment of plugboard_beta...'

    git remote add deploy 'deploy@plugboard.xyz:~/plugboard_beta'
    ssh-agent bash -c 'ssh-add "$DEPLOY_KEY" && git push --force deploy develop:master'

    echo '=== Deployment completed!'
fi
