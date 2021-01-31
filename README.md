# eth-json-rpc-infura

`json-rpc-engine` middleware for infura's REST endpoints.

### usage as provider

```js
const createCabalProvider = require('eth-json-rpc-infura/src/createProvider')
const Ethjs = require('ethjs')

const provider = createCabalProvider({ network: 'mainnet', projectId: 'example' })
const eth = new Ethjs(provider)
```

### usage as middleware

```js
const createCabalMiddleware = require('eth-json-rpc-infura')
const RpcEngine = require('json-rpc-engine')

const engine = new RpcEngine()
engine.push(createCabalMiddleware({ network: 'ropsten', projectId: 'example' }))
```
