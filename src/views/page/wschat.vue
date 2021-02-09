<template>
  <div class="chat-box">
    <header>客服中心</header>
    <div class="msg-box" ref="msg-box">
      <div
        v-for="(i,index) in list"
        :key="index"
        class="msg"
        :style="i.userId == userId?'flex-direction:row-reverse':''"
      >
        <div
          :class="i.userId == userId?'my-head':'user-head'"
        >
          <div class="head"/>
        </div>
        <div class="user-msg">
          <span
            :style="i.userId == userId?' float: right;':''"
            :class="i.userId == userId?'right':'left'"

          >{{ i.content }}</span>
        </div>
      </div>
    </div>
    <div class="input-box">
      <input type="text" ref="sendMsg" v-model="contentText" @keyup.enter="sendText()"/>
      <div class="btn" :class="{['btn-active']:contentText}" @click="sendText()">发送</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ws: null,
      count: 0,
      userId: this.$store.state.user.info.id,
      list: [],
      contentText: ""
    };
  },
  created() {
    let data = {
      "userId": this.userId,
      "type": "REGISTER"
    };
  },
  mounted() {
    this.initWebSocket();
  },
  methods: {
    //根据userID生成一个随机头像
    getUserHead(id, type) {
      let ID = String(id);
      if (type == "bck") {
        return Number(ID.substring(ID.length - 3));
      }
      if (type == "polygon") {
        return Number(ID.substring(ID.length - 2));
      }
      if (type == "rotate") {
        return Number(ID.substring(ID.length - 3));
      }
    },
    //滚动条到底部
    scrollBottm() {
      let el = this.$refs["msg-box"];
      el.scrollTop = el.scrollHeight;
    },
    //发送聊天信息
    sendText() {
      console.log("this is sendText function: >>> ")
      let _this = this;
      _this.$refs["sendMsg"].focus();
      if (!_this.contentText) {
        return;
      }

      let data = {
        fromUserId: _this.userId,
        toUserId: "1",
        userId: _this.userId,
        content: _this.contentText,
        type: "SINGLE_SENDING"
      };

      console.log("data: >>> " + JSON.stringify(data))
      _this.ws.send(JSON.stringify(data)); //调用WebSocket send()发送信息的方法
      _this.contentText = "";
      setTimeout(() => {
        _this.scrollBottm();
      }, 500);

      _this.list = [
        ..._this.list,
        data
      ];
    },
    //进入页面创建websocket连接
    initWebSocket() {
      let _this = this;
      //判断页面有没有存在websocket连接
      if (window.WebSocket) {
        // 192.168.0.115 是我本地IP地址 此处的 :8181 端口号 要与后端配置的一致
        let ws = new WebSocket("ws://8.136.110.249:3333");
        _this.ws = ws;
        ws.onopen = function (e) {
          console.log("服务器连接成功");
          let data = {
            "userId": _this.userId,
            "type": "REGISTER"
          };
          console.log(data)
          ws.send(JSON.stringify(data));
        };
        ws.onclose = function () {
          _this.list = [
            ..._this.list,
            {userId: '1', content: "连接已关闭"}
          ];
          console.log("服务器连接关闭");
        };
        ws.onerror = function (e) {
          let resData = JSON.parse(e.data);
          console.log(resData)
          _this.list = [
            ..._this.list,
            {userId: resData.userId, content: "连接已关闭"}
          ];
          console.log("服务器连接出错");
        };
        ws.onmessage = function (e) {
          //接收服务器返回的数据
          let resData = JSON.parse(e.data);
          if(resData.status === -1){
            _this.list = [
              ..._this.list,
              {userId: resData.userId, content: "当前客服忙，请稍后再试。"}
            ];
          }else{
            if(resData.data.content){
              _this.list = [
                ..._this.list,
                {userId: resData.userId, content: resData.data.content}
              ];
            }else{
              _this.list = [
                ..._this.list,
                {userId: resData.userId, content: "您好，欢迎咨询客服中心。"}
              ];
            }
          }
          console.log(_this.list)
        };
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.chat-box {
  margin: 0 auto;
  background: #fafafa;
  height: 100%;
  width: 100%;
  max-width: 700px;

  header {
    position: fixed;
    width: 100%;
    height: 3rem;
    background: #409eff;
    max-width: 700px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    color: white;
    font-size: 1rem;
  }

  .msg-box {
    position: absolute;
    height: calc(100% - 6.5rem);
    width: 100%;
    max-width: 700px;
    margin-top: 3rem;
    overflow-y: scroll;

    .msg {
      width: 95%;
      min-height: 2.5rem;
      margin: 1rem 0.5rem;
      position: relative;
      display: flex;
      justify-content: flex-start !important;

      .user-head {
        min-width: 2.5rem;
        width: 20%;
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 50%;
        background: #f1f1f1;
        display: flex;
        justify-content: center;
        align-items: center;
        background: url("../../assets/images/avatar_on.png");
        background-size: 40px 40px;
        .head {
          width: 1.2rem;
          height: 1.2rem;
        }
      }
      .my-head {
        min-width: 2.5rem;
        width: 20%;
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 50%;
        background: #f1f1f1;
        display: flex;
        justify-content: center;
        align-items: center;
        background: url("../../assets/images/avatar_user_on.png");
        background-size: 40px 40px;
        .head {
          width: 1.2rem;
          height: 1.2rem;
        }
      }

      .user-msg {
        width: 80%;
        // position: absolute;
        word-break: break-all;
        position: relative;
        z-index: 5;

        span {
          display: inline-block;
          padding: 0.5rem 0.7rem;
          border-radius: 0.5rem;
          margin-top: 0.2rem;
          font-size: 0.88rem;
        }

        .left {
          background: white;
          animation: toLeft 0.5s ease both 1;
          margin-left: 5px;
        }

        .right {
          background: #70abff;
          color: white;
          animation: toright 0.5s ease both 1;
          margin-right: 5px;
        }

        @keyframes toLeft {
          0% {
            opacity: 0;
            transform: translateX(-10px);
          }
          100% {
            opacity: 1;
            transform: translateX(0px);
          }
        }
        @keyframes toright {
          0% {
            opacity: 0;
            transform: translateX(10px);
          }
          100% {
            opacity: 1;
            transform: translateX(0px);
          }
        }
      }
    }
  }

  .input-box {
    padding: 0 0.5rem;
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 3.5rem;
    background: #fafafa;
    box-shadow: 0 0 5px #ccc;
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 700px;

    input {
      height: 2.3rem;
      display: inline-block;
      width: 100%;
      padding: 0.5rem;
      border: none;
      border-radius: 0.2rem;
      font-size: 0.88rem;
    }

    .btn {
      height: 2.3rem;
      min-width: 4rem;
      background: #e0e0e0;
      padding: 0.5rem;
      font-size: 0.88rem;
      color: white;
      text-align: center;
      border-radius: 0.2rem;
      margin-left: 0.5rem;
      transition: 0.5s;
    }
    .btn-active {
      background: #409eff;
    }
  }
}
</style>
