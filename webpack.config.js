var config = {
    context: __dirname + "/app",
    entry: "./main.js",

    output: {
        filename: "bundle.js",
        path: __dirname + "/dist",
    },

    devServer: {
        inline: true,
        port: 8080
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015']
                }
            }
        ],
    },
    externals: {
        'Config': JSON.stringify(process.env.ENV === 'production' ? {
            serverUrl: "https://footbalisto.be/api",
            refreshRate: 360000
        } : {
                serverUrl: "http://localhost:8085",
                refreshRate: 60000
            })
    }
}
module.exports = config;
