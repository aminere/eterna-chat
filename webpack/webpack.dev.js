
const merge = require('webpack-merge').merge;
const path = require('path');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    devtool: "inline-source-map",
    mode: 'development',
    output: {
        path: path.resolve(__dirname + "/../dist"),
    }
});
