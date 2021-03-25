require('../utils/loadEnv');

const mongoose = require('mongoose');

const initMongo = async () => {
    try {
        await mongoose.connect(process.env.MONGO_CONN_URI, {useNewUrlParser: true});
        console.log("Connected to mongo");
    } catch (err) {
        console.log(err);
        throw err;
    }
};
module.exports = initMongo