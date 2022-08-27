#!/bin/sh

DOCKER_ID=`docker ps -aq --filter name=re0-web`
if [ ! -z "$DOCKER_ID" ]; then
    docker stop $DOCKER_ID
    # docker rm $DOCKER_ID
fi
