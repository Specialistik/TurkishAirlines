module.exports = {
    entry: "./src/entry.js",
    output: {
        path: __dirname + '/public',
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: [
                        "@babel/preset-env",
                        "@babel/preset-react",
                        "metro-react-native-babel"
                    ]
                }
            }
        ]
    },
    resolve: {
        alias: {
            "react-native": "react-native-web"
        },
        extensions: [ '.web.js', '.js' ]    
     }
};