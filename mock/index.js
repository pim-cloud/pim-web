import Mock from 'mockjs'
console.log('mock', Mock)

const data = Mock.mock({
  login:{token:'123133121231331231231331231231331233'},
})

Mock.setup({
    timeout: '200-600'
});

//登录
Mock.mock('/api/login/login', 'post',{
    code: 200,
    data: data.login
})
//
Mock.mock('/api/member/getMemberInfo', 'get', {
    code: 200,
    data: [
      {
        id:1,
        head_image:'https://v3.cn.vuejs.org/logo.png',
        username:'遇见',
        nickname:'遇见',
        email:'jksusuppx@qq.com',
        showName:'遇见',
        code:'1212121212121',
        config: {
          remarks:'哈哈',
          topping:'',
          disturb:'',
          star:'',
        },
        type:'personal'
      }
    ]
})

//好友列表
Mock.mock('/api/contacts/getContactsList', 'get', (config) => {
  return {"code":200,"data":{"336889873581494273":{"id":1737,"head_image":"https:\/\/cdn.jksusu.cn\/morentouxiang.png","username":"173991506","nickname":"61d3f524edb0a","email":"173991506@qq.com","showName":"亲爱的","code":"336889873581494273","config":{"remarks":"亲爱的","topping":0,"disturb":0,"star":0},"type":"personal"}}}
})
//群组列表
Mock.mock('/api/session/getContactGroups', 'get', (config) => {
    return {"code":200,"data":[]}
})

//群组列表
Mock.mock('/api/session/getSessionList', 'get', (config) => {
    return {"code":200,"data":[{"accept_code":"336889873581494273","accept_type":"personal","last_message":"fuck\n","last_message_type":"text","last_time":"2022-05-30T12:44:05.000000Z","session_id":282,"accept_info":{"remarks":null,"nickname":"61d3f524edb0a","head_image":"https:\/\/cdn.jksusu.cn\/morentouxiang.png","initials":"A"},"disturb":1,"topping":null,"unread":0}]}
})

//新的朋友
Mock.mock('/api/contacts/getFriendsRequestList', 'get', (config) => {
    return {"code":200,"data":[{"accept_code":"336889873581494273","accept_type":"personal","last_message":"fuck\n","last_message_type":"text","last_time":"2022-05-30T12:44:05.000000Z","session_id":282,"accept_info":{"remarks":null,"nickname":"61d3f524edb0a","head_image":"https:\/\/cdn.jksusu.cn\/morentouxiang.png","initials":"A"},"disturb":1,"topping":null,"unread":0}]}
})

//消息记录
Mock.mock('/api/message/getMsgRecord', 'get', (config) => {
    return {"code":200,"data":{"count":17,"send":{"code":"335089808995008513","nickname":"61cd68b420851","head_image":"https:\/\/cdn.jksusu.cn\/e556e34793b91c0dbbd01b7ad7dddeb6.png"},"accept":{"code":"336889873581494273","nickname":"61d3f524edb0a","head_image":"https:\/\/cdn.jksusu.cn\/morentouxiang.png"},"lists":[{"msg_id":16412813832430,"main_code":"335089808995008513","accept_code":"336889873581494273","read_state":"unread","created_at":"2022-01-04 15:29:43","content":"nihao \n","content_type":"text"},{"msg_id":16412813848060,"main_code":"335089808995008513","accept_code":"336889873581494273","read_state":"unread","created_at":"2022-01-04 15:29:44","content":"在吗\n","content_type":"text"}]}}
})

//编辑
Mock.mock('/api/contacts/edit', 'post', {"code":200})

//创建会话
Mock.mock('/api/session/create', 'post', {"code":200,"data":{"accept_code":"336889873581494273","accept_type":"personal","last_message":"fuck\n","last_message_type":"text","last_time":"2022-05-30T12:44:05.000000Z","session_id":282,"accept_info":{"remarks":null,"nickname":"61d3f524edb0a","head_image":"https:\/\/cdn.jksusu.cn\/morentouxiang.png","initials":"A"},"disturb":1,"topping":null,"unread":0}})

//发消息
Mock.mock('/api/message/sendMessage', 'post', {"code":200,"data":{"msg_id":"16545956368270","created_at":"2022-06-07 17:53:56"}})



