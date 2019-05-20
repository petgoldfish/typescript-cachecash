#!/bin/sh
set -xe

case "$BUILD_MODE" in
    test)
        npm run test:prod
        npm run build
        ;;
    integration)
        chmod 0600 id_deploykey_go-cachecash
        ssh-agent bash -c 'ssh-add id_deploykey_go-cachecash; git clone git@github.com:cachecashproject/go-cachecash.git'

        cd go-cachecash
        echo "[*] Starting docker-compose deployment..."
        #docker-compose build
        docker-compose up -d

        echo "[*] Waiting until escrow is setup..."
        while ! curl -v 'http://127.0.0.1:7100/info' | jq -e '.Escrows|length==1'; do sleep 10; done
        cd ..

        echo "[*] Waiting for network to become healthy..."
        while ! psql 'host=127.0.0.1 port=5432 user=postgres dbname=publisher sslmode=disable' -c 'select 1;'; do sleep 10; done

        npm run integration
        ;;
esac
