const auth = require('../service/auth');
const User = require('../models/users');

module.exports = {
    register: (req, res) => {
        const newUser = new User(req.body);
        let result = {};
        let status = 201;
        newUser.save(function (err, user) {
            if (err) {
                status = 400
                result = err
            }
            res.status(status).send(result);
        });
    },
    login: (req, res) => {
        let result = {};
        let status = 200;
        const {name, password} = req.body;
        User.findOne({name}, (err, user) => {
            if (err) {
                status = 400
                result = err
            } else if (!user || !user.comparePassword(password)) {
                status = 401
            } else {
                result = {"token": auth.createToken(user._id)}
            }
            res.status(status).send(result);
        })
            // select password for comparison
            .select('+password');
    },
    me: (req, res) => {
        let result = {};
        let status = 200;
        User.findById(req.user_id, (err, user) => {
            if (err) {
                status = 400
                result = err
            } else if (!user) {
                status = 404
            } else {
                result = user
            }
            res.status(status).send(result);
        });
    }
}
