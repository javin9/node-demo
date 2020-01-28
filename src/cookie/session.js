var express = require('express');
var cookieParser = require('cookie-parser');
var session = require('express-session');

var app = express()
app.use(cookieParser())

const hour = 1000 * 60 * 60;
var sessionOpts = {
  // 设置密钥
  secret: 'a cool secret',
  // Forces the session to be saved back to the session store
  resave: true,
  // Forces a session that is "uninitialized" to be saved to the store.
  saveUninitialized: true,
  // 设置会话cookie名, 默认是connect.sid
  key: 'myapp_sid',
  // If secure is set to true, and you access your site over HTTP, the cookie will not be set.
  cookie: { maxAge: hour * 2, secure: false }
}
app.use(session(sessionOpts))

app.use(function (req, res, next) {
  if (req.url === '/favicon.ico') {
    return
  }

  // 同一个浏览器而言，req是同一个
  var sess = req.session;
  console.log(sess)

  if (sess.views) {
    sess.views++;
  } else {
    sess.views = 1;
  }
  res.setHeader('Content-Type', 'text/html');
  res.write('<p>views: ' + sess.views + '</p>');
  res.end();
});

app.listen(4000);