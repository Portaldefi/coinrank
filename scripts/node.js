'use strict';

const settings = require('../settings/local');
const Coinrank = require('../services/coinrank');

async function main (input = {}) {
  const coinrank = new Coinrank(input);

  coinrank.on('log', (msg) => {
    console.log('log:', msg);
  });

  await coinrank.start();
  
  return {
    id: coinrank.id
  };
}

main(settings).catch((exception) => {
  console.error('[COINRANK:NODE]', 'Main Process Exception:', exception);
}).then((output) => {
  console.log('[COINRANK:NODE]', 'Main Process Output:', output);
});
