# eth-json-rpc-backbone

`json-rpc-engine` middleware for Backbone RPC's REST endpoints.

### usage as provider

```js
const createInfuraProvider = require('eth-json-rpc-backbone/src/createProvider')
const Ethjs = require('ethjs')

const provider = createInfuraProvider({ network: 'mainnet', projectId: 'sushiswap' })
const eth = new Ethjs(provider)
```

### usage as middleware

```js
const createInfuraMiddleware = require('eth-json-rpc-backbone')
const RpcEngine = require('json-rpc-engine')

const engine = new RpcEngine()
engine.push(createInfuraMiddleware({ network: 'mainnet', projectId: 'sushiswap' }))
```


## License 

SPDX-Identifier: ISC
