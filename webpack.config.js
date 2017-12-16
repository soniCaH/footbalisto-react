var config = {
    context: __dirname + "/app",
    entry: "./main.js",

    output: {
        filename: "bundle.js",
        path: __dirname + "/dist",
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
            serverUrl: "https://footbalisto.be/api"
        } : {
                serverUrl: "http://localhost:9000"
            })
    }
}
module.exports = config;
