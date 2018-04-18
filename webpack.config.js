const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: {
        index: path.join(__dirname, 'src', 'index.js'),
        axiosWatcher: path.join(__dirname, 'src', 'axios-example.js')
    },
    output: {
        filename: '[name].[hash].js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /.jsx?$/,
                include: [path.resolve(__dirname, 'src')],
                exclude: [path.resolve(__dirname, 'node_modules')],
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            title: 'Example',
            chunks: ['index'],
            filename: 'index.html',
            template: 'src/index.html'
        }),
        new HtmlWebpackPlugin({
            title: 'Example',
            chunks: ['axiosWatcher'],
            filename: 'axios-watcher.html',
            template: 'src/index.html'
        })
    ],
    resolve: {
        extensions: ['.json', '.js', '.jsx', '.css']
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        port: 9000
    },
    devtool: 'source-map'
}
