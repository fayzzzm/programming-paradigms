const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env) => ({
    entry: path.resolve(__dirname, env.PARADIGM, 'src/index.js'),
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, env.PARADIGM, 'dist'),
    },
    target: 'web',
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(
                __dirname,
                `public/index-${env.PARADIGM}.html`,
            ),
        }),
    ],
    devServer: {
        port: 9090,
        contentBase: path.resolve(__dirname, 'dist'),
        compress: true,
        hot: true,
        open: true,
    },
});
