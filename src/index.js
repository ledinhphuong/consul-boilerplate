import BPromise from 'bluebird'

const SERVICE_ID = 'consul-boilerplate-id'
const CHECK_ID = `check-${SERVICE_ID}`
const CONSUL_HOST = '127.0.0.1'
const CONSUL_PORT = 8500

const requestAsync = BPromise.promisify(require('request'), { multiArgs: true })
const ttlCheckUrl = `http://${CONSUL_HOST}:${CONSUL_PORT}/v1/agent/check/pass/${CHECK_ID}`

async function testTTLCheck() {
  console.log('Calling TTL check to Consul...')
  const [{statusCode}] = await requestAsync({
    url: ttlCheckUrl,
    method: 'PUT',
    json: true
  })

  console.log(`Receive respond of TTL check: ${statusCode}`)
}

let terminateFlag = false
let ttlCheckInterval
async function main() {
  await testTTLCheck()
  ttlCheckInterval = setInterval(() => testTTLCheck(), 3000)

  while (!terminateFlag) {
    console.log('Running')
    await BPromise.delay(5000)
  }

  console.log('End.')
}

process.on('SIGINT', () => {
  terminateFlag = true
  console.log(`Terminated process`)
  if (ttlCheckInterval) clearInterval(ttlCheckInterval)
})

main()
