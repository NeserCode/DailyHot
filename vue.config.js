module.exports = {
    lintOnSave: false,// 屏蔽EsLint
    publicPath: process.env.NODE_ENV === "local" ? "/" : "./",
    outputDir: 'dist',
    assetsDir: 'assets',
}