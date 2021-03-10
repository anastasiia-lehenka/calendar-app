const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        calendar: './src/js/calendar.js',
        createEvent: './src/js/createEvent.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
    },
    devServer: {
        open: true,
        openPage: 'calendar.html'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                        {
                            loader: 'babel-loader',
                            options: {
                                presets: ['es2015']
                            }
                        }
                    ]
            },
            {
                test: /\.scss$/,
                use: ['style-loader','css-loader', 'sass-loader']
            },
            {
                test: /\.html$/,
                use: ['html-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'calendar.html',
            template: 'src/calendar.html',
            chunks: ['calendar']
        }),
        new HtmlWebpackPlugin({
            filename: 'create-event.html',
            template: 'src/create-event.html',
            chunks: ['createEvent']
        }),
        new CleanWebpackPlugin(),
    ]
};