#!/bin/sh

docker run -d --rm -v "$PWD/gitbook:/gitbook" -p 4000:4000 --name="re0-web" expm02/gitbook-server gitbook serve