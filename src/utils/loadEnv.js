const dotenv = require('dotenv');
const command_line_args = require('command-line-args');
const options = command_line_args([
    {
        name: 'env',
        alias: 'e',
        defaultValue: 'development',
        type: String
    },
]);
const result = dotenv.config({
    path: "./env/" + options.env + ".env"
});
if (result.error) {
    throw result.error;
}