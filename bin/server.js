'use strict'// ele força o js ser mais criterioso
const app = require('../src/app');
const http = require('http');
const debug = require('debug')('cursonodejs:server');
const express = require('express');


const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const server = http.createServer(app);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
console.log('Api rodando na porta', port);

function normalizePort(val) {
    const port = parseInt(val, 10);
    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
}
// recebe o erro do servidor
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const bind = typeof port === 'string' ?
        'Pipe' + port :
        'Port' + port;

    switch (error.code) {
        case 'EACCES':
            console.log.error(bind + 'requerem privilégios elevados');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.log.error(bind + 'Servidor está em uso');
            process.exit(1);
            break;
        default:
            throw error;
    }
}
function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string'
        ? 'pipe' + addr
        : 'port' + addr.port;
    debug('Listening on ' + bind);
}