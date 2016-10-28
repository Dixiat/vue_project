var webpack = require('webpack');

module.exports = {
    entry: __dirname + '/src/main.js',
    output: {
        path: __dirname + '/dist',
        publicPath: 'dist/',
        filename: 'bundle.js'
    },

    module: {
        loaders: [
            {
                test: /\.vue$/,
                loader: 'vue'
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'file?name=[name].[ext]?[hash]'
            }
        ]
    },
    babel: {
        presets: ['es2015','stage-0'],
        plugins: ['transform-runtime']
    }
};

if(process.env.NODE_ENV === 'production') {
    module.exports.plugins = [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.optimize.OccurenceOrderPlugin()
    ];
} else {
    module.exports.devtool = '#source-map';
}
