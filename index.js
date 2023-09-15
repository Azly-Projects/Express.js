require('dotenv/config');

const fs = require('node:fs/promises');
const http = require('node:http');
const https = require('node:https');
const CLITable3 = require('cli-table3');
const listEndpoints = require('express-list-endpoints');

const routes = require('./src/routes');
const { debug, logger } = require('./config');
const models = require('./src/models');

async function boostrap() {
  let server;

  // SSL configuration check
  debug.app('SSL Enabled :', process.env.ENABLE_SSL === 'true');
  if (process.env.ENABLE_SSL === 'true') {
    const key = await fs.readFile(process.env.SSL_KEY_FILE);
    const cert = await fs.readFile(process.env.SSL_CERT_FILE);
    server = https.createServer({ key, cert }, routes);
  } else {
    server = http.createServer(routes);
  }

  await models.sequelize.sync({ alter: true });

  // listening event
  server.on('listening', () => {
    const addr = server.address();
    const endpoints = listEndpoints(routes);
    const endpointsTable = new CLITable3({
      head: ['methods', 'path', 'middlewares'],
    });
    const loadEndpoint = (e = 0) => {
      if (e < endpoints.length) {
        endpointsTable.push([
          endpoints[e].methods.join('|'),
          endpoints[e].path,
          endpoints[e].middlewares.length,
        ]);
        loadEndpoint(e + 1);
      }
    };

    loadEndpoint();

    logger.info(`Started on port ${addr.port}`);
    console.log(endpointsTable.toString());
    debug.app(`Listening on port ${addr.port}`);
  });

  // start listening
  server.listen(process.env.PORT || 3000);
}

debug.app('Initializing...');
boostrap();
