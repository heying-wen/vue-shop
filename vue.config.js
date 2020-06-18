module.exports = {
    devServer: {
        host:'localhost',
        port:8090,
        proxy:{
            '/api':{
                target:'http://api.4yue.top/index.php/',
                cahngeOrigin: true,
                pathRewrite:{
                    '^/api':''
                }
            }
        }
    },
    chainWebpack:config =>{
        config.plugins.delete('prefetch')
    }
}