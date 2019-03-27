const express = require('express');
const body = require('body-parser');
const cors = require('cors');
const api = require('./routes');

require('now-env');

const server = express();
const port = 9999;

server.use(body.json());
server.use(cors());
server.use(api);

server.listen(port, () => console.log(`Server is listening on ${port}...`));
