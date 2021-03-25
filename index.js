require('./src/utils/loadEnv');
const initMongo = require("./src/storage/mongo");
const server = require('./src/server');

// initialize db connection
initMongo()

// initialize server
const port = Number(process.env.PORT || 3000);
server.listen(port);

