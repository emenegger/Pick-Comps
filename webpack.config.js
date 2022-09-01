const path = require("path");

module.exports = {
    mode: "development",
    entry: "./index.js",
    output: {
        path: path.resolve(__dirname, "public"),
        // publicPath: "/dist/",
        filename: "main.js",
    },
    target: "web",
    devServer: {
        port: "3000",
        static: ["./public"],
        open: true,
        hot: true,
        liveReload: true,
    },
    resolve: {
        extensions: [".js", ".jsx", ".json"]
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                use: "babel-loader",
                // options: { presets: ["@babel/env"] } 
            }, 
            // {
            //     test: /\.css$/i,
            //     use: ["style-loader", "css-loader"],
            // }, 
            {
                test: /\.s[ac]ss$/i,
                  use: [{
                    loader: "style-loader"
                  }, {
                    loader: "css-loader" 
                  }, {
                    loader: "sass-loader"
                  }]
            }
        ]
    },
}