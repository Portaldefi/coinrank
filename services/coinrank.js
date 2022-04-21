'use strict';

const merge = require('lodash.merge');
const Service = require('@fabric/core/types/service');
const HTTPServer = require('@fabric/http/types/server');

const listAssets = require('../functions/listAssets');

class Coinrank extends Service {
  constructor (settings = {}) {
    super(settings);

    this.settings = merge({
      http: {
        host: '0.0.0.0',
        port: 9998
      }
    }, this.settings);

    this.http = new HTTPServer(this.settings.http);

    this._state = {
      content: {},
      status: 'PAUSED'
    };

    return this;
  }

  get assets () {
    return listAssets();
  }

  async start () {
    await this.http.start();
    return this;
  }
}

module.exports = Coinrank;