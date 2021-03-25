const phin = require('phin')

const getJSON = phin.defaults({
    headers: {"Accept": "application/json"},
    method: 'GET',
    parse: "json"
});
const dadJokeUrl = "https://icanhazdadjoke.com/"
const chuckNorrisFactUrl = "https://api.chucknorris.io/jokes/random"

module.exports = {
    getDadJoke: async (req, res) => {
        let result;
        let status = 200;
        let jokeRes = await getJSON(dadJokeUrl)
        if (res.statusCode === 200) {
            let joke = jokeRes.body["joke"]
            result = {joke: joke}
        } else {
            status = 500
            result = ({error: 'Failed to get dad joke'})
        }
        res.status(status).send(result);
    },
    getChuckNorrisFact: async (req, res) => {
        let result;
        let status = 200;
        let factRes = await getJSON(chuckNorrisFactUrl)
        if (res.statusCode === 200) {
            let fact = factRes.body["value"]
            result = {fact: fact}
        } else {
            status = 500
            result = ({error: 'Failed to get Chuck Norris fact'})
        }
        res.status(status).send(result);
    }
}