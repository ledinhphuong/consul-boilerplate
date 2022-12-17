## Usage Consul's TTL register and check with NodeJS app

### Requirements
```bash
node@10.x
```

### Start/stop Consul
```bash
cd scripts
bash ./start-consul.sh
bash ./stop-consul.sh
```

### Commands
```bash
yarn install
yarn build
cd scripts && bash register-app-to-consul.sh
```

### Other
```bash
# Check service id health
curl -X GET "http://localhost:8500/v1/agent/health/service/id/consul-boilerplate-id" -H "content-type: application/json"
```
