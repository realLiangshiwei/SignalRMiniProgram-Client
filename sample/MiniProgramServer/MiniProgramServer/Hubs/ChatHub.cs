using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MiniProgramServer.Hubs
{
    public class ChatHub : Hub
    {
        public const string ChatName = "找工作-.-";

        public static ConcurrentDictionary<string, OnlineClient> OnlineClients { get; }

        private static readonly object SyncObj = new object();

        static ChatHub()
        {
            OnlineClients = new ConcurrentDictionary<string, OnlineClient>();
        }

        public override async Task OnConnectedAsync()
        {
            var http = Context.GetHttpContext();

            var client = new OnlineClient()
            {
                NickName = http.Request.Query["nickName"],
                Avatar = http.Request.Query["avatar"]
            };

            lock (SyncObj)
            {
                OnlineClients[Context.ConnectionId] = client;
            }

            await base.OnConnectedAsync();
            await Groups.AddToGroupAsync(Context.ConnectionId, ChatName);
            await Clients.GroupExcept(ChatName, new[] { Context.ConnectionId }).SendAsync("system", $"用户{client.NickName}加入了群聊");
            await Clients.Client(Context.ConnectionId).SendAsync("system", $"成功加入{ChatName}");


        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {

            await base.OnDisconnectedAsync(exception);

            bool isRemoved;
            OnlineClient client;
            lock (SyncObj)
            {
                isRemoved = OnlineClients.TryRemove(Context.ConnectionId, out client);


            }
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, ChatName);

            if (isRemoved)
            {
                await Clients.GroupExcept(ChatName, new[] { Context.ConnectionId }).SendAsync("system", $"用户{client.NickName}加入了群聊");
            }

        }

        public async Task SendMessage(string msg)
        {
            var client = OnlineClients.Where(x => x.Key == Context.ConnectionId).Select(x=>x.Value).FirstOrDefault();
            if (client == null)
            {
                await Clients.Client(Context.ConnectionId).SendAsync("system", "您已不在聊天室,请重新加入");
            }
            else
            {
                await Clients.GroupExcept(ChatName, new[] { Context.ConnectionId }).SendAsync("receive", new { msg, nickName = client.NickName, avatar = client.Avatar });

            }
        }
    }
}
