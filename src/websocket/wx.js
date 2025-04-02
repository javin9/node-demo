let wx = require('nodejs-websocket');
//建立连接
wx.createServer((conn) => {
  conn.on('text', (str) => {
    console.log(`客户端发送过来的数据:${str}`);
    let dataArr = ['帅', '美', '漂亮', '智能', '好看', '大方'];
    let curVal = '';
    let res = dataArr.reduce((last, cur) => {
      let val;
      if (str.indexOf(cur) != -1) {
        val = 1;
        curVal = cur;
      } else {
        val = 0;
      }
      return last + val;
    }, 0);
    console.log(res);
    if (res != 0) {
      conn.sendText(`${curVal},很${curVal},非常${curVal}`);
    } else {
      conn.sendText('我太笨了，不知道你说的是啥，不要为难我');
    }
  });

  conn.on('close', (code, reason) => {
    console.log('关闭连接');
  });

  conn.on('error', (code, reason) => {
    console.log('连接异常');
  });
}).listen(7001);
