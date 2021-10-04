module.exports = {
    devServer: {
        open: true,
        proxy: {
            '/api': {
                target: 'http://localhost:6000/api/',//要代理的本地api地址，也可以换成线上测试地址
                changeOrigin: true,//允许跨域
                pathRewrite: { "^/api": "/" }//将/api开头替换为/
            }
        }
    },
    lintOnSave: false,// 屏蔽EsLint
    publicPath: process.env.NODE_ENV === "local" ? "/" : "./",
    outputDir: 'dist',
    assetsDir: 'assets',
}