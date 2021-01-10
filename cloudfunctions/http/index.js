// 云函数入口文件
const cloud = require('wx-server-sdk')

//引入request-promise用于做网络请求
const rp = require('request-promise');

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
    const method = event.method
    const header = event.header
    const params = event.params

    const options = {
        uri: event.url,
        json: true // Automatically parses the JSON string in the response
    }

    switch (method) {
        case 'GET':
            options.qs = params
            options.headers = {
                'User-Agent': 'Request-Promise'
            }
            break;
        case 'POST':
            options.method = method
            options.headers = header
            if (header['content-type'] === 'application/json; charset=utf-8') {
                options.body = params
            } else {
                options.formData = params
            }
            break;
    }

    return rp(options)
}