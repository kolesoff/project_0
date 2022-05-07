import path from 'path';
import webpack from 'webpack';
import 'webpack-dev-server';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';

const commonConfig: webpack.Configuration = {
    context: path.resolve(__dirname, '../..'),
    entry: './src/index.tsx',
    target: ['web', 'es5'],
    plugins: [
        new ForkTsCheckerWebpackPlugin({
            typescript: {
                diagnosticOptions: {
                    semantic: true,
                    syntactic: true,
                },
            },
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html'
        }),
    ],
    module: {
        rules: [
            {
                test: /\.ts$/,
                include: [path.resolve(__dirname, '../../src')],
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env', '@babel/preset-typescript'],
                    plugins: ["@babel/plugin-transform-runtime"],
                },
            },
            {
                test: /\.tsx$/,
                include: [path.resolve(__dirname, '../../src')],
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
                    plugins: ["@babel/plugin-transform-runtime"],
                },
            },
            {
                test: /\.js$/,
                include: [path.resolve(__dirname, '../../src')],
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env'],
                    plugins: ["@babel/plugin-transform-runtime"],
                },
            },
            {
                test: /\.less$/,
                include: [path.resolve(__dirname, '../../src')],
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: '[name]__[local]__[hash:base64:5]',
                            }
                        },
                    },
                    'less-loader',
                ],
            },
        ]
    },
    resolve: {
        plugins: [new TsconfigPathsPlugin()],
        extensions: ['.ts', '.tsx', '.js'],
    },
}

export default commonConfig;
