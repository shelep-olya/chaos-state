const { merge } = require("webpack-merge");
const basicConfig = require("./webpack.config");
const webpack = require("webpack");

const config = {
    mode: "development",
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            modules: {
                                mode: "local",
                                localIdentName: `[name]_[local]--[hash:base64:5]`,
                                namedExport: false,
                            },
                        },
                    },
                ],
            },
            {
                test: /\.jsx?$/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: ["@babel/preset-env", "@babel/preset-react"],
                            plugins: ["istanbul"],
                        },
                    },
                ],
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff2?|eot|ttf|otf)$/i,
                type: "asset/resource",
                generator: {
                    filename: "assets/[hash][ext][query]",
                },
            },
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                MAIN_TEST_ID: JSON.stringify(process.env.MAIN_TEST_ID),
                REACT_APP_API_URL: JSON.stringify(process.env.REACT_APP_API_URL),
            },
        }),
    ],
};

module.exports = merge(basicConfig, config);
