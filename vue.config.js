module.exports = {
    devServer: {
        host:'localhost',
        port:8090,
        proxy:{
            '/api':{
                target:'http://www.2yue.cc/index.php/',
                cahngeOrigin: true,
                pathRewrite:{
                    '^/api':''
                }
            }
        }
    }
}