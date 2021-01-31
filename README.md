# eth-json-rpc-backbone

![nodejs](https://github.com/backbonecabal/eth-json-rpc-backbone/workflows/nodejs/badge.svg)


`json-rpc-engine` middleware for Backbone Cabal's REST endpoints.

### usage as provider

```js
const createCabalProvider = require('eth-json-rpc-backbone/src/createProvider')
const Ethjs = require('ethjs')

const provider = createCabalProvider({ network: 'mainnet', projectId: 'example' })
const eth = new Ethjs(provider)
```

### usage as middleware

```js
const createCabalMiddleware = require('eth-json-rpc-backbone')
const RpcEngine = require('json-rpc-engine')

const engine = new RpcEngine()
engine.push(createCabalMiddleware({ network: 'ropsten', projectId: 'example' }))
```
