#!/bin/sh
set -xe

case "$BUILD_MODE" in
	test)
        npm run travis-deploy-once "npm run report-coverage"
        if [ "$TRAVIS_BRANCH" = "master" -a "$TRAVIS_PULL_REQUEST" = "false" ]; then
            npm run travis-deploy-once "npm run deploy-docs"
            npm run travis-deploy-once "npm run semantic-release"
        fi
        ;;
esac
