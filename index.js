'use strict';

const Hapi = require('hapi');
const mediaset = require('./media-set');


var server = new Hapi.Server();
server.connection({
  port: process.env.PORT || 5000,
  routes: {
    cors: true
  }
});

server.route([
  {
    method: '*',
    path: '/',
    handler (request, reply) {
      reply('MediaSet API');
    }
  },
  {
    method: 'GET',
    path: '/mediaset',
    handler: mediaset.list
  },
]);

server.start(() => {
  console.log('MediaSet API:', 'Started on ' + server.info.port);
});
