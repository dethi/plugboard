#!/bin/bash

set -euo pipefail

if [ -n "${TRAVIS_PULL_REQUEST_BRANCH-}" ]; then
    echo "Cannot deploy pull-request"
    exit 1
fi

if [ -z "${TRAVIS_BRANCH+xxx}" ]; then
    if [ "$#" -ne 1 ]; then
        echo "usage: ./deploy.sh <git_branch>"
        exit 1
    fi

    export TRAVIS_BRANCH="$1"
fi

SCRIPT_PATH="$(dirname $0)"

echo "=== TRAVIS_BRANCH=$TRAVIS_BRANCH"
echo "=== SCRIPT_PATH=$SCRIPT_PATH"

cd $SCRIPT_PATH
for script in $(echo deploy-app-*.sh); do
    if { git remote | grep -q deploy; } then
        git remote rm deploy
    fi

    DEPLOY_KEY="key/deploy-key" ./$script
done
