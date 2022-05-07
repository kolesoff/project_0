import path from 'path';
import webpack from 'webpack';
import { merge } from "webpack-merge";
import commonConfig from './webpack.common';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import CompressionPlugin from 'compression-webpack-plugin';

const prodConfig: webpack.Configuration = {
    mode: 'production',
    optimization: {
        minimize: true,
        minimizer: [new CssMinimizerPlugin(), "..."],
    },
    plugins: [new CompressionPlugin()],
    output: {
        path: path.resolve(__dirname, '../../dist'),
        filename: 'js/[name].[contenthash].js',
        library: {
            type: 'umd',
        },
        clean: true,
    },
}

export default merge(commonConfig, prodConfig);
