const path       = require("path"),
      webpack    = require("webpack"),
      mode       = process.env.NODE_ENV,
      production = mode !== "development",
      baseFolder = path.resolve(__dirname, process.env.BASE_FOLDER || "helpers")
      package    = require(path.resolve(baseFolder, "package.json")),
      entry      = path.resolve(baseFolder, "src", package.main),
      output     = { path: path.join(baseFolder, package.output || "dist") };

console.log(entry)

module.exports = {
  entry,
  mode,
  output,
  plugins: [new webpack.ProgressPlugin()],

  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      include: [path.resolve(baseFolder, "src")],
      loader: "babel-loader"
    }]
  },

  devServer: {
    open: true,
    host: "localhost"
  }
}
