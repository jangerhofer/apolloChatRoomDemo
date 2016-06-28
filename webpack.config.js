const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const merge = require('webpack-merge');
const validate = require('webpack-validator');

const parts = require('./config/parts');
const pkg = require('./package.json');

let ExtractTextPlugin = require('extract-text-webpack-plugin');
var CompressionPlugin = require("compression-webpack-plugin");
let extractCSS = new ExtractTextPlugin('[name].[chunkhash].css');


const PATHS = {
    app: path.join(__dirname, 'src'),
    build: path.join(__dirname, 'dist')
};


const common = {

    // Entry accepts a path or an object of entries.
    // We'll be using the latter form given it's
    // convenient with more complex configurations.
    entry: {
        app: PATHS.app + "/index.jsx",
        vendor: Object.keys(pkg.dependencies)
    },
    output: {
        path: PATHS.build,
        filename: '[name].js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
    module : {
      loaders : [{
          test: /\.(js|jsx)$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel', // 'babel-loader' is also a legal name to reference
          query: {
              presets: ['react', 'es2015']
          }
      }]
    }

};


var config;
switch (process.env.npm_lifecycle_event) {
    case 'build':
        config = merge(
            common, {
                devtool: 'source-map',
                output: {
                    path: PATHS.build,
                    filename: '[name].[chunkhash].js',
                    chunkFilename: '[chunkhash].js'
                },
                module: {
                    /*preLoaders: [{
                        test: /\.(js|jsx)$/,
                        loader: "eslint-loader?{rules:{semi:0}}",
                        exclude: /node_modules/
                    }],*/
                    loaders: [{
                        test: /\.sass$/i,
                        loader: extractCSS.extract(['css', 'sass'])
                    }]
                },
                plugins: [
                    extractCSS,
                ]
            },
            parts.clean(PATHS.build),
            parts.setFreeVariable(
                'process.env.NODE_ENV',
                'production'
            ),
            parts.minify()
            //  parts.extractCSS(PATHS.app)
        )
        break;
    default:
        config = merge(
            common, {
                devtool: 'eval-source-map',
                module: {
                    loaders: [{
                        test: /\.sass$/,
                        loaders: ['style', 'css', 'sass']
                    }]
                }
            },
            parts.devServer({
                // Customize host/port here if needed
                host: process.env.HOST,
                port: process.env.PORT
            }));
}

module.exports = validate(config, {
    quiet: true
});
