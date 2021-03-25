require('./src/utils/loadEnv');
const initMongo = require("./src/storage/mongo");

// initialize db connection
initMongo()

// initialize server
let server = require('./src/server');
let port = Number(process.env.PORT || 3000);
server.listen(port);

