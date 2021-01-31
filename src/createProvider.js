/**
 * Cabal Middleware Provider
 * @param {createCabalMiddleware}
 * @extends providerFromEngine
 */

const RpcEngine = require("json-rpc-engine");
const providerFromEngine = require("eth-json-rpc-middleware/providerFromEngine");
const createCabalMiddleware = require(".");

module.exports = createProvider;

function createProvider(opts) {
  const engine = new RpcEngine();
  engine.push(createCabalMiddleware(opts));
  return providerFromEngine(engine);
}
