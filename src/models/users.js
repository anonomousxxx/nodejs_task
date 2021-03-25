require('../utils/loadEnv');

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

let saltingRounds = Number(process.env.SALTING_ROUNDS || 10);

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        minLength: 1
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 8,
        select: false
    },
    created: {
        type: Date,
        default: Date.now()
    }
});

// encrypt password before save
userSchema.pre('save', function (next) {
    const user = this;
    // do not rehash if it is an old user
    if (!user.isModified || !user.isNew) {
        next();
    } else {
        bcrypt.hash(user.password, saltingRounds, function (err, hash) {
            if (err) {
                console.log('Error hashing password for user', user.name);
                next(err);
            } else {
                user.password = hash;
                next();
            }
        });
    }
});
// compare password hashes
userSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password)
}

module.exports = mongoose.model('User', userSchema);