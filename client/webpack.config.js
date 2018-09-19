const packageJSON = require('./package.json');
const path = require('path');
const webpack = require('webpack');

const PATHS = {
    build: path.join(__dirname, 'target', 'classes', 'META-INF', 'resources', 'webjars', packageJSON.name, packageJSON.version)
};

module.exports = env => {
    return [{
        mode: env && env.dev ? 'development' : 'production',
        entry: './app/index.js',
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: ['babel-loader']
                }
            ]
        },
        resolve: {
            extensions: ['*', '.js', '.jsx']
        },
        output: {
            path: PATHS.build,
            publicPath: '/assets/',
            filename: 'bundle.js'
        }
    }]
};
