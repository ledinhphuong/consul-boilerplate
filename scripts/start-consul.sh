#!/bin/bash

if [ -z "`docker network ls | grep consul_network`" ]; then
  echo "Creating custom docker network for sharing connectivity ..."
  docker network create --driver bridge --subnet "172.30.0.0/16" consul_network
fi

echo "Starting Consul..."
docker-compose up -d
