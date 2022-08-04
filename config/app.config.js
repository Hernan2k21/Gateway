
require('dotenv').config()
const { fixRequestBody } = require('http-proxy-middleware');

module.exports = {
    server:{
        port: 8080,
    },
    database:{
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            host: process.env.DB_HOST,
            dialect: process.env.DB_DIALECT
    },
    jwt:{
        jwtSecretOrKey: process.env.JWT_SECRET,

    },
    services:  [
            {
                url: '/example',
                auth: true,
                proxy: {
                    target: "http://localhost:8081/",
                    changeOrigin: false,
                    pathRewrite: {
                        [`^/example`]: '',
                    },
                    onProxyReq: fixRequestBody,
                }
            }
    ]
    
  };
  