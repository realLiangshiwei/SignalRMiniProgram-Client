博客园博文地址 https://www.cnblogs.com/LiangSW/p/9415246.html

# SignalRMiniProgram

## AspNet Core SignalR 微信小程序客户端

### 效果演示
![](/img/1.gif)
![](/img/2.gif)


<img src="https://raw.githubusercontent.com/liangshiw/SignalRMiniProgram-Client/master/img/1.jpg" width="250" height="500" />
<img src="https://raw.githubusercontent.com/liangshiw/SignalRMiniProgram-Client/master/img/2.png" width="250" height="500" />
### Get Started

#### 创建对象

``` JavaScript
let hub  = new HubConnection();
```

#### 开启连接

``` JavaScript
hub.start(url,queryString);
例如
hub.start(url,{
    access_token:"bearer token"
});
```

#### 事件

``` JavaScript
//连接开启事件
hub.onOpen = (res)={
    console.log("连接已开启")
};

//连接关闭事件
hub.onClose = (res)={
    console.log("连接已关闭")
};

//通讯过程中的Error事件
hub.onError = (res) =>{
    console.log(res)
};

//手动关闭连接
hub.close({reason:"手动关闭"});
```

#### 调用服务端方法(无返回值)

``` JavaScript
hub.send(methodName,agrs...);
```

#### 调用服务端方法(有返回值)

``` JavaScript
//该方法会返回一个Promise
hub.invoke(methodName,agrs...).then((res)=>{
    console.log("返回值:"+ res);
});
```

#### 注册客户端方法供服务端调用

``` JavaScript
//该方法会返回一个Promise
hub.on("clientMethod",(res)=>{
    console.log("被服务端调用");
})
```
