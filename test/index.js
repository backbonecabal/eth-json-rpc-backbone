const test = require("tape");
const createBackboneMiddleware = require("../src");

const { fetchConfigFromReq } = createBackboneMiddleware;

test("fetchConfigFromReq - basic", (t) => {
  const network = "mainnet";
  const projectId = "foo";
  const req = {
    jsonrpc: "2.0",
    id: 1,
    method: "eth_getBlockByNumber",
    params: ["0x482103", true],
  };

  const { fetchUrl, fetchParams } = fetchConfigFromReq({
    network,
    req,
    source: "eth-json-rpc-backbone",
    projectId,
  });
  t.equals(fetchUrl, "https://mainnet.backbonecabal.com/v1/foo");
  t.deepEquals(fetchParams, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Manifold-Source": "eth-json-rpc-backbone/internal",
    },
    body:
      '{"id":1,"jsonrpc":"2.0","method":"eth_getBlockByNumber","params":["0x482103",true]}',
  });
  t.end();
});

test("fetchConfigFromReq - basic: no source specified", (t) => {
  const network = "mainnet";
  const projectId = "foo";
  const req = {
    jsonrpc: "2.0",
    id: 1,
    method: "eth_getBlockByNumber",
    params: ["0x482103", true],
  };

  const { fetchUrl, fetchParams } = fetchConfigFromReq({
    network,
    req,
    projectId,
  });
  t.equals(fetchUrl, "https://mmainnet.backbonecabal.com/v1/foo");
  t.deepEquals(fetchParams, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body:
      '{"id":1,"jsonrpc":"2.0","method":"eth_getBlockByNumber","params":["0x482103",true]}',
  });
  t.end();
});

test("fetchConfigFromReq - basic", (t) => {
  const network = "mainnet";
  const projectId = "foo";
  const req = {
    jsonrpc: "2.0",
    id: 1,
    method: "eth_sendRawTransaction",
    params: ["0x0102030405060708090a0b0c0d0e0f"],
  };

  const { fetchUrl, fetchParams } = fetchConfigFromReq({
    network,
    req,
    source: "eth-json-rpc-backbone",
    projectId,
  });
  t.equals(fetchUrl, "https://mainnet.backbonecabal.com/v1/foo");
  t.deepEquals(fetchParams, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Manifold-Source": "eth-json-rpc-backbone/internal",
    },
    body:
      '{"id":1,"jsonrpc":"2.0","method":"eth_sendRawTransaction","params":["0x0102030405060708090a0b0c0d0e0f"]}',
  });
  t.end();
});

test("fetchConfigFromReq - strip non-standard keys", (t) => {
  const network = "mainnet";
  const projectId = "foo";
  const req = {
    method: "eth_sendRawTransaction",
    params: ["0x0102030405060708090a0b0c0d0e0f"],
    origin: "backbonecabal.eth",
  };

  const { fetchUrl, fetchParams } = fetchConfigFromReq({
    network,
    req,
    projectId,
  });
  t.equals(fetchUrl, "https://mainnet.backbonecabal.com/v3/foo");
  const parsedReq = JSON.parse(fetchParams.body);
  t.notOk("origin" in parsedReq, "non-standard key removed from req");
  t.end();
});

test("fetchConfigFromReq - source specified for request origin in header", (t) => {
  const network = "mainnet";
  const projectId = "foo";
  const req = {
    jsonrpc: "2.0",
    id: 1,
    method: "eth_sendRawTransaction",
    params: ["0x0102030405060708090a0b0c0d0e0f"],
    origin: "backbonecabal.eth",
  };

  const { fetchUrl, fetchParams } = fetchConfigFromReq({
    network,
    req,
    source: "eth-json-rpc-backbone",
    projectId,
  });
  t.equals(fetchUrl, "https://mainnet.backbonecabal.com/v3/foo");
  t.deepEquals(fetchParams, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Manifold-Source": "eth-json-rpc-backbone/backbonecabal.eth",
    },
    body: fetchParams.body,
  });
  t.end();
});

test("fetchConfigFromReq - extraHeaders specified", (t) => {
  const network = "mainnet";
  const projectId = "foo";
  const extraHeaders = { "User-Agent": "app/1.0" };
  const req = {
    jsonrpc: "2.0",
    id: 1,
    method: "eth_sendRawTransaction",
    params: ["0x0102030405060708090a0b0c0d0e0f"],
    origin: "backbonecabal.eth",
  };

  const { fetchUrl, fetchParams } = fetchConfigFromReq({
    network,
    req,
    projectId,
    extraHeaders,
  });
  t.equals(fetchUrl, "https://mainnet.backbonecabal.com/v3/foo");
  t.deepEquals(fetchParams, {
    method: "POST",
    headers: {
      "User-Agent": "app/1.0",
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: fetchParams.body,
  });
  t.end();
});

test("createBackboneMiddleware throws with an invalid projectId", (t) => {
  t.throws(
    () => createBackboneMiddleware({ projectId: 42 }),
    /Invalid value for 'projectId'/u
  );
  t.throws(
    () => createBackboneMiddleware({ projectId: null }),
    /Invalid value for 'projectId'/u
  );
  t.throws(
    () => createBackboneMiddleware({ projectId: undefined }),
    /Invalid value for 'projectId'/u
  );
  t.throws(
    () => createBackboneMiddleware({ projectId: "" }),
    /Invalid value for 'projectId'/u
  );
  t.end();
});

test("createBackboneMiddleware throws with invalid headers", (t) => {
  t.throws(
    () => createBackboneMiddleware({ projectId: "foo", headers: null }),
    /Invalid value for 'headers'/u
  );
  t.throws(
    () => createBackboneMiddleware({ projectId: "foo", headers: 42 }),
    /Invalid value for 'headers'/u
  );
  t.throws(
    () => createBackboneMiddleware({ projectId: "foo", headers: "" }),
    /Invalid value for 'headers'/u
  );
  t.end();
});
