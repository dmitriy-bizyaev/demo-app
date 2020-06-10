const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    entry: path.join(__dirname, 'src/index.tsx'),
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.[hash].js',
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HTMLWebpackPlugin({
            template: path.join(__dirname, 'src/index.ejs'),
        }),
    ],
    module: {
        rules: [{
            test: /\.tsx?$/,
            use: [{
                loader: 'babel-loader',
            }],
        }],
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                secure: false
            },
        },
    },
};
