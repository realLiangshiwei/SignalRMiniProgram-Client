参考博文地址 https://www.cnblogs.com/LiangSW/p/9415246.html

使用案例参考sample文件下夹项目 传送门：https://github.com/liangshiw/SignalRMiniProgram-Client/tree/master/sample

SignalR官方学习教程地址 https://docs.microsoft.com/zh-cn/aspnet/core/signalr/introduction?view=aspnetcore-2.2

# SignalRMiniProgram

## AspNet Core SignalR 微信小程序客户端

### 效果演示
![](/img/1.gif)

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

# 设计思路
SignalRMiniSignalR.js帮助类库：使用微信小程序webSocket的api与后台建立socket连接,后端使用signalR组件建立hub（中心），通过hub（中心）与客户端交互，传递信息大都包括要调用的函数名称，函数参数等关键信息，如果匹配到相同的名称的函数名，则执行相关的操作；
SignalRMiniSignalR.js中使用数组存储可能被后端调用的方法名和方法体，如果匹配到相关的函数，就执行该函数；
