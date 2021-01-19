const path = require('path');
const babiliPlugin = require('babili-webpack-plugin');

let plugins = [];

/**
 * Com o process teremos acesso a todas as variáveis de ambiente definidas no 
 * sistema operacional. Vamos testar se NODE_ENV é igual a production.
 * Se ele foi setado, com o método push(), jogaremos uma nova instancia new babiliPlugin().
 */
if(process.env.NODE_ENV == 'production') {
    plugins.push(new babiliPlugin());
}
module.exports = {
    entry: './app-src/app.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: 'dist'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            }
        ]
    },
    plugins
}