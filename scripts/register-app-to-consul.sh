#!/bin/bash

CONSUL_HOST=127.0.0.1
CONSUL_PORT=8500
SERVICE_ID="consul-boilerplate-id"
SERVICE_NAME="consul-boilerplate-name"

# Register the service first so that the Consul can return info when
# it starts
curl -X PUT http://$CONSUL_HOST:$CONSUL_PORT/v1/agent/service/register \
  -H 'Content-Type: application/json' \
  --data-binary @- << EOF
{
  "ID": "$SERVICE_ID",
  "Name": "$SERVICE_NAME"
}
EOF

pm2 start ecosystem.config.js
sleep 10 # make sure, app is ready

# Register service check after starting so that the check is success
curl -X PUT http://$CONSUL_HOST:$CONSUL_PORT/v1/agent/check/register \
  -H 'Content-Type: application/json' \
  --data-binary @- << EOF
{
  "Name": "Check $SERVICE_NAME online",
  "ID": "check-$SERVICE_ID",
  "ServiceID": "$SERVICE_ID",
  "DeregisterCriticalServiceAfter": "1m",
  "Status": "critical",
  "TTL": "10s"
}
EOF
