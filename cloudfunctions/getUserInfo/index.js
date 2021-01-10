// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database({
    throwOnNotFound: false
})
const collection = db.collection('user')

// 云函数入口函数
exports.main = async (event, context) => {
    try {
        const { OPENID } = cloud.getWXContext()

        console.log(context)
        console.log(cloud.getWXContext())


        // 根据openid获取用户信息
        let userInfo = await collection.doc(OPENID).get().then(res => {
            return res ? res.data : null     // 处理查询为空
        })

        // 判断用户是否存在
        if (!userInfo) {  // 不存在，新增
            userInfo = await addUser(OPENID, event.parentId)
        }

        return userInfo
    } catch (err) {
        return Promise.reject(err)
    }
}

/**
 * 新增用户
 */
async function addUser(_id, parentId) {
    try {
        const data = {
            _id,
            parentId,
            userAvatar: 'https://images-1300484082.cos.ap-chengdu.myqcloud.com/default_headimg.png',
            userName: '用户' + _id.substr(-6),    // 用户orRoM4
            createTime: new Date(),        // 注册时间
        }

        await collection.add({
            data
        })

        return data
    } catch (err) {
        return Promise.reject(err)
    }
}