const http = require('http');
const express = require('express');
const app = express();
const users = require('./users/users.route');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */


const dbURI = "mongodb+srv://thenetninja:D12345@nodetuts.9ud37.mongodb.net/notetuts?retryWrites=true&w=majority";


mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(result => {
        server.listen(port);
        server.on('error', onError);
        server.on('listening', onListening);

    })
    .catch(err => console.log(err));


// respond with "hello world" when a GET request is made to the homepage
// app.get('/', function (req, res) {
//   res.send('hello world')
// })
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use('/api', users);


/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    console.log('Listening on ' + bind);
}
