let dotenv = require('dotenv');
let command_line_args = require('command-line-args');
let options = command_line_args([
    {
        name: 'env',
        alias: 'e',
        defaultValue: 'development',
        type: String
    },
]);
let result = dotenv.config({
    path: "./env/" + options.env + ".env"
});
if (result.error) {
    throw result.error;
}
