const path = require('path');
const babiliPlugin = require('babili-webpack-plugin');
const extractTextPlugin = require('extract-text-webpack-plugin');
const optimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const webpack = require('webpack');

let plugins = [];

/* plugin para escopo global, pois o bootstrap usa o jquery, 
portanto é necessário importar de forma global, se importado no app.js, daria erro */
plugins.push(new webpack.ProvidePlugin({
    '$': 'jquery/dist/jquery.js',
    'jQuery': 'jquery/dist/jquery.js'
}))

plugins.push(
    new extractTextPlugin("styles.css")
);

/**
 * Com o process teremos acesso a todas as variáveis de ambiente definidas no 
 * sistema operacional. Vamos testar se NODE_ENV é igual a production.
 * Se ele foi setado, com o método push(), jogaremos uma nova instancia new babiliPlugin().
 */
if(process.env.NODE_ENV == 'production') {
    plugins.push(new babiliPlugin());

    /*como está produção, minificar o css, apenas em produção, em dev não é necessário
    Verificar o style.css na dist, irá está minificado */
    plugins.push(new optimizeCSSAssetsPlugin({
        cssProcessor: require('cssnano'),
        cssProcessorOptions: {
            discardComments: {  //remover os comentários
                removeAll: true
            },            
        },
        canPrint: true        
    }));
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
                use: {
                    loader: 'babel-loader'
                }
            },
            { 
                test: /\.css$/, 
                use: extractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                })
            },
            { 
                test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, 
                loader: 'url-loader?limit=10000&mimetype=application/font-woff' 
            },
            { 
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, 
                loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
            },
            { 
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, 
                loader: 'file-loader' 
            },
            { 
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, 
                loader: 'url-loader?limit=10000&mimetype=image/svg+xml' 
            }         
        ]
    },
    plugins
}