import path from 'path';
import webpack from 'webpack';
import { merge } from "webpack-merge";
import commonConfig from './webpack.common';
import 'webpack-dev-server';

const devConfig: webpack.Configuration = {
    mode: 'development',
    devtool: 'source-map',
    devServer: {
        port: 3000,
        static: {
            directory: path.join(__dirname, '../../dist')
        },
    },
}

export default merge(commonConfig, devConfig);
