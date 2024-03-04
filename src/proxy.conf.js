const PROXY_CONFIG = [
    {
        context: [
            '/api'
        ],
        target: "https://painelalentoapi.up.railway.app/",
        secure: false,
        changeOrigin: true,
        pathRewrite:{
            "^/": ""
        }
    }
]

module.exports = PROXY_CONFIG