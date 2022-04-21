'use strict';

const settings = require('../settings/local');
const Ethereum = require('fabric-ethereum');

async function main (input = {}) {
  const ethereum = new Ethereum(input);

  ethereum.on('log', (msg) => {
    console.log('log:', msg);
  });

  await ethereum.start();

  return {
    id: ethereum.id
  };
}

main(settings).catch((exception) => {
  console.error('[SCAN:ETHEREUM]', 'Main Process Exception:', exception);
}).then((output) => {
  console.log('[SCAN:ETHEREUM]', 'Main Process Output:', output);
});
