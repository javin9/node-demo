Streams是Node中最难理解的概念

## Streams到底是什么？
Streams和数组或者字符串类似，是处理流式数据的抽象接口。但是，Streams则可以逐个片段地读取并处理，而无需将数据全部保存在内存中，所以流在处理大量数据时非常强大。

Streams不仅可以处理大量数据，它还为我们的代码提供了可组合的能力，就像是我们可以把单一的Linux命令组合成功能强大的Linux命令。



```bash
$ grep -R exports * | wc -l
```
```javascript
const grep = ... // A stream for the grep output
const wc = ...   // A stream for the wc input

grep.pipe(wc)

```
Node 中的许多内置模块都实现了流接口  
| 可读流Readable Streams        |       可写流  Writable Streams |
| :---------------------------- | -----------------------------: |
| HTTP response, on the client  |   HTTP requests, on the client |
| HTTP requests, on the server  |  HTTP responses, on the server |
| fs read streams               |               fs write streams |
| zlib streams                  |                   zlib streams |
| crypto streams                |                 crypto streams |
| TCP sockets                   |                    TCP sockets |
| child process stdout & stderr |            child process stdin |
| process.stdin                 | process.stdout, process.stderr |

上面列举的例子中，有的既是可读流，又是可写流。例如：`TCP sockets`和`zlib streams`。但是，也和环境有一定关系，比如`HTTP response`在客户端的时候是可读流，但是在服务端就是可写流。这是因为，我们基本从一个对象(`http.IncomingMessage`)读取并写入到另一个对象(`http.ServerResponse`)

 `stdio`流 (`stdin`, `stdout`, `stderr`) 在涉及子进程时，可以通过`管道(pipe)`使用主流程`stdio`流与这些子流程 `stdio` 流进行数据传输。

 ## Streams 实例演示
 理论通常都很美好，但是不能让人百分百信服。让我们看一个示例，演示Streams在内存消耗方面的不同。

 我们先创建一个大文件：
 ```javascript
const fs = require("fs")
const file = fs.createWriteStream("./big.file")

for (let i = 0; i <= 1e6; i++) {
  file.write(
    "陵阳人朱尔旦，字小明，性情豪放。但他生性迟钝，读书虽然很勤苦，却一直没有成名。一天，朱尔旦跟几个文友一块喝酒。有人跟他开玩笑说：“你以豪放闻名，如能在深夜去十王殿，把左廊下那个判官背了来，我们大家就做东请你喝酒。”原来，陵阳有座十王殿，殿里供奉着的鬼神像都是木头雕成的，妆饰得栩栩如生。\n"
  )
}

file.end()
 ```
 瞧，我们用可写流(`fs.createWriteStream`)创建了一个大文件。

 `fs`模块通过使用流接口读取和写入文件。在上面的示例中，通过可写流，向`big.file`文件中循环写入了100万行内容。执行脚本之后，`big.file`文件的大小大约为`410MB`

 下面代码会启动一个简单Node Web服务器`big.file`,用来提供`big.file`
 ```javascript
 const fs = require("fs");
 const server = require("http").createServer();

server.on("request", (req, res) => {
  fs.readFile("./big.file", (err, data) => {
    if (err) throw err;
    res.end(data);
  });
});

server.listen(8000);
 ```
当服务器接收到请求，会通过`fs.readFile`方法提供`big.file`,这个方法是异步的。似乎看起来，我们并没有阻塞事件循环(`Event Loop`)。一切都看起来那么美好。

事实真的是这样吗？

好，让我们运行服务，发送一个请求，监视内存的变化情况。

当我们启动服务器时，占用了大约6.7MB的内存。  
![1](./images/1.png)


然后我连接到服务器。注意消耗的内存发生了什么：
![2](images/2.png)  

看一下活动监视器
![2](images/3.png)  
内存消耗迅速升到 416.9MB 

我们基本上将整个`big.file`内容 全部 放到了内存中，然后在将其写入响应对象。这样效率非常低。

上面的表格中我们可以看到，`HTTP response`对象同样也是一个可写流(`writable stream`)。那么，假如我们有一个 包含`big.file`内容的可读流(`readable stream`)，我们就可以通过 管道(`pipe`)将两个流进行连接，同样可以实现将文件内容写入到 响应对象中，并且不会消耗`410MB`的内存。

`fs`模块通过`createReadStream`方法为任何文件创建一个可读流(`readable stream`)。然后，通过管道(`pipe`)将其连接到响应对象。看一下代码示例：
```javascript
const fs = require("fs");
const server = require("http").createServer();

server.on("request", (req, res) => {
  const src = fs.createReadStream("./big.file");
  src.pipe(res);
});

server.listen(8000);
```

现在，当你重新向服务器发送请求，神奇的事情发生了（看看内存消耗）
![4](images/4.gif)  

### 发生了什么？
当我们的客户端发送访问`big.file`文件请求，会发现，每次只传输一个数据块(`chunck`)。因此，我们不用全部将`big.file`文件的内存一次性读到内存道中。通过活动监视器，我们也可以看到，我们的内存消耗基本在`16MB`左右。相比之前`410MB`的内存消耗，内存消耗大幅度降低。

你可以尝试将文件大小增加到更大，对比 使用stream和不使用stream 两种方式的内存消耗

现在我们将文件大小增加到`2.8GB`
```bash
> $ ll
-rw-r--r--   2.8G  big.file
```
我们用`fs.readFile`看一下效果:
![6](images/6.png)
结果没有任何响应。我们看一下后台服务控制台：
![5](images/5.png)
控制台已经报错了，提示文件过大。使用`fs.createReadStream`就完全没有问题，内存也不会被大量消耗。

上面的例子中，我们展示了`Node’s Streams`的强大之处。相对于使用其他的数据处理方法，流基本上提供了两个主要优点：
- 内存效率: 无需加载大量的数据到内存中即可进行处理。
- 时间效率: 当获得数据之后即可立即开始处理数据，这样所需的时间更少，而不必等到整个数据有效负载可用才开始。

接下来，带你具体了解一下`Node’s Streams`

## Streams 基础知识
Node.js 中有四种基本的流类型：
- `Writable` - 可写入数据的流（例如 `fs.createWriteStream()`）。
- `Readable` - 可读取数据的流（例如 `fs.createReadStream()`）。
- `Duplex` - 可读又可写的流（例如 `net.Socket`）。
- `Transform` - 在读写过程中可以修改或转换数据的 `Duplex` 流（例如 `zlib.createDeflate()`）。
此外，该模块还包括实用函数 `stream.pipeline()`、`stream.finished()` 和 `stream.Readable.from()`。

Node 的 `stream` 模块 提供了构建所有流 API 的基础。 所有的流都是 `EventEmitter` 的实例，可以触发读和写的事件。但是，我们可以使用`pipe`方法，这样消费流数据(`stream data`)会变得更加简单。

## pipe()
下面这行代码的形式和含义你需要记住：
```javascript
readableSrc.pipe(writableDest);
```
该代码的作用是什么？ 它获取来源流，并将其通过管道传输到目标流。需要注意的是，来源流必须是可读流(`Readable`)，目标流必须是可写流(`Writable`)。当然，它们也可以是双工/转换流(`Duplex`/`Transform`)。实际上，如果我们通过管道传输的是`Duplex`流，那么我们可以向Linux一样进行链式调用`pipe`方法
```javascript
readableSrc
  .pipe(transformStream1)
  .pipe(transformStream2)
  .pipe(finalWrtitableDest);
```
举个栗子
- `a`是可读流`readable`
- `b`和`c`是双工流(`Duplex`)
- `d`是可写流(`writable`)
  那么我们可以这么做
```javascript
  a.pipe(b)
  .pipe(c)
  .pipe(d);

  // 等价于：
  a.pipe(b);
  b.pipe(c);
  c.pipe(d);

  // 就像在Linux管道:
  // $ a | b | c | d
```
`pipe`方法可以很方便的消费流数据。  通常消费流数据有如下两种方法：
- 事件流-- `streams with events`
- 管道方法--`pipe`方法
不推荐将两者混合使用。因为你如果用了管道方法，就不建议使用事件流的方式。如果你想通过更多自定义的方式处理流数据，事件流的方式会是更好的选择。

## Stream events(事件流)
`pipe`方法除了可以获取来源流，并将其通过管道传输到目标流之外，同时还会自动的处理一些事情。比如：错误异常，文件读取结束以及一个流比另一个流慢或快的情况。

然而，事件(`event`)也可以直接消费流数据。下面的代码是通过`event`方式处理的stream。等价于上面用`pipe`方法处理可读流和可写流的数据
```javascript
// readable.pipe(writable)
const readable = getReadableStreamSomehow();
readable.on("data", chunk => {
  console.log(`接收到 ${chunk.length} 个字节的数据`);
  writable.write(chunk);
});

readable.on("end", () => {
  console.log('已没有数据');
  writable.end();
});
```
以下列举了处理可读和可写流的重要事件和方法:
|         | Readable Streams                                                | Writable Streams                          |
| ------- | --------------------------------------------------------------- | ----------------------------------------- |
| Events  | data, end, error, close, readable                               | drain, finish, error, close, pipe, unpipe |
| Methods | pipe(), unpipe(), wrap(), destroy()                             | write(), destroy(), end()                 |
|         | read(), unshift(), resume(), pause(), isPaused(), setEncoding() | cork(), uncork(), setDefaultEncoding()    |


### stream.Readable 类
处理可读流重要的事件
- `data`事件，当流将数据块传送给消费者后触发
- `end`事件，当流中没有数据可供消费时触发
```javascript
const readable = getReadableStreamSomehow();
readable.on("data", chunk => {
  console.log(`接收到 ${chunk.length} 个字节的数据`);
  writable.write(chunk);
});

readable.on("end", () => {
  console.log('已没有数据');
  writable.end();
});
```

### stream.Writable 类
处理可读流重要的事件
- `drain` 事件,当可以继续写入数据到流时会触发 `drain`事件
- `finish`事件，缓冲数据都已传给底层系统之后触发

```javascript
const writer = getWritableStreamSomehow();
for (let i = 0; i < 100; i++) {
  writer.write(`写入 #${i}!\n`);
}
writer.on('finish', () => {
  console.error('写入已完成');
});
writer.end('写入结尾\n');
```
## 实现流API
当谈论Node Steam的时候，我们需要关注两部分
- 如何使用Stream 的API
- 如何实现流的API

上面我们一直讨论的是如何使用Stream 的API。下面我们讨论如何实现流的API

对于简单的案例，构造流可以不依赖继承。 直接创建 stream.Writable、stream.Readable、stream.Duplex 或 stream.Transform 的实例，并传入对应的方法作为构造函数选项。
```javascript
const { Writable } = require('stream');

const myWritable = new Writable({
  write(chunk, encoding, callback) {
    // ...
  }
});
```
### 实现可写流
`stream.Writable` 类可用于实现 `Writable` 流。
自定义的 Writable 流必须调用 new stream.Writable([options]) 构造函数并实现 writable._write() 和/或 writable._writev() 方法。

ES6写法：

```javascript
const { Writable } = require('stream')
class MyWritable extends Writable {
  constructor(options) {
    super(options)
  }
}

const outStream = new MyWritable({
  write (chunk, encoding, callback) {
    console.log(chunk.toString())
    callback()
  }
})
process.stdin.pipe(outStream)
```

另一种简单的写法

```javascript
const { Writable } = require("stream");

const outStream = new Writable({
  write(chunk, encoding, callback) {
    console.log(chunk.toString());
    callback();
  }
});

process.stdin.pipe(outStream);
```
write方法有三个参数：
- chunk <Buffer> | <string> | <any> 要写入的 Buffer，从传给 stream.write() 的 string 转换而来。 如果流的 decodeStrings 选项为 false 或者流在对象模式下运行，则数据块将不会被转换，并且将是传给 stream.write() 的任何内容。
- encoding <string> 如果 chunk 是字符串，则指定字符编码。 如果 chunk 是 Buffer 或者流处于对象模式，则无视该选项。
- callback <Function> 当数据块被处理完成后的回调函数。这里可以传递成功或者失败的信号

`outStream`中，我们直接将数据块转成字符串然后通过console.log打印了出来，然后调用了callback方法。没有处理成功和失败的情况。我们通过`process.stdin`去获得可读流，他将会捕获我们在控制台的输入，然后通过管道传输给`outStream`。

上面的例子很简单，基本没用，因为`process.stdout`都已经实现了。下面的代码可以达到同样的效果
```javascript
process.stdin.pipe(process.stdout);
```
### 实现可读流
实现可读流，我们需要用`Readable`接口构造一个对象



```javascript
const { Readable } = require("stream");

const inStream = new Readable({});
```

实现可写流很长简单，我们仅仅需要把推送数据，然后给消费者去消费

```javascript
const { Readable } = require("stream");

const inStream = new Readable();

inStream.push("ABCDEFGHIJKLM");
inStream.push("NOPQRSTUVWXYZ");

inStream.push(null); // No more data

inStream.pipe(process.stdout);
```

我们push一个`null`对象，代表我们发送一个信号给流，告诉他们我们没有更多数据了。

上面的例子中，我们在和管道对接之前，将所有的数据推送到了可写流中。下面我们改进一下，通过实现read方法，做到按需推送数据。

```javascript
const { Readable } = require("stream");
const inStream = new Readable({
  read(size) {
    this.push(String.fromCharCode(this.currentCharCode++));
    if (this.currentCharCode > 90) {
      this.push(null);
    }
  }
});

//触发读操作
inStream.currentCharCode = 65;

inStream.pipe(process.stdout);
//输出结果：ABCDEFGHIJKLMNOPQRSTUVWXYZ
```

上面代码中`inStream.currentCharCode`触发了读操作。

### 实现双工流

[双工流](http://nodejs.cn/api/stream.html#stream_class_stream_duplex)同时实现了[可读流](http://nodejs.cn/api/stream.html#stream_class_stream_readable)和[可写流](http://nodejs.cn/api/stream.html#stream_class_stream_writable)，例如 TCP socket 连接。自定义的双工流必须调用 `new stream.Duplex([options])` 构造函数并实现 [`readable._read()`](http://nodejs.cn/api/stream.html#stream_readable_read_size_1) 和 `writable._write()` 方法。

举一个简单的例子：

```javascript
const { Duplex } = require("stream");

const inoutStream = new Duplex({
  write(chunk, encoding, callback) {
    console.log(chunk.toString());
    callback();
  },

  read(size) {
    this.push(String.fromCharCode(this.currentCharCode++));
    if (this.currentCharCode > 90) {
      this.push(null);
    }
  }
});

inoutStream.currentCharCode = 65;

process.stdin.pipe(inoutStream).pipe(process.stdout);
//输出结果：ABCDEFGHIJKLMNOPQRSTUVWXYZ
```



### 实现转换流

[转换流](http://nodejs.cn/api/stream.html#stream_class_stream_transform)是一种[双工流](http://nodejs.cn/api/stream.html#stream_class_stream_duplex)，它会对输入做些计算然后输出。 例如 [zlib](http://nodejs.cn/api/zlib.html) 流和 [crypto](http://nodejs.cn/api/crypto.html) 流会压缩、加密或解密数据。

输出流的大小、数据块的数量都不一定会和输入流的一致。 例如，`Hash` 流在输入结束时只会输出一个数据块，而 `zlib` 流的输出可能比输入大很多或小很多。

`stream.Transform` 类可用于实现了一个[转换流](http://nodejs.cn/api/stream.html#stream_class_stream_transform)。

`stream.Transform` 类继承自 `stream.Duplex`，并且实现了自有的 `writable._write()` 和 [`readable._read()`](http://nodejs.cn/api/stream.html#stream_readable_read_size_1) 方法。 自定义的转换流必须实现 [`transform._transform()`](http://nodejs.cn/api/stream.html#stream_transform_transform_chunk_encoding_callback) 方法，[`transform._flush()`](http://nodejs.cn/api/stream.html#stream_transform_flush_callback) 方法是可选的。

当使用转换流时，如果可读端的输出没有被消费，则写入流的数据可能会导致可写端被暂停。

```javascript
const { Transform } = require("stream");

const upperCaseTr = new Transform({
  transform(chunk, encoding, callback) {
    this.push(chunk.toString().toUpperCase());
    callback();
  }
});

process.stdin.pipe(upperCaseTr).pipe(process.stdout);
//如初abc --->ABC
```

上面的例子中，我们通过转换流 将内容转成大写，然后push到可写流中



## 内置的转换流

Node 有一些非常有用的内置转换流，例如`zlib`、`crypto`流。
下面是一个使用`zlib.createGzip()`方法与`fs`模块的可读/可写流相结合来创建文件压缩脚本的示例：

```javascript
const fs = require("fs");
const zlib = require("zlib");
const file = process.argv[2];

fs.createReadStream(file)
  .pipe(zlib.createGzip())
  .pipe(fs.createWriteStream(file + ".gz"));
```
通过参数传递，您可以使用此脚本任何文件进行压缩。我们创建了一个可读流，读取文件内容，然后通过管道传送给`zlib`内置的转换流进行压缩，然后又通过管道给了可写流，可入文件。

同样，我们也能将`pipe`和`event`相结合一起使用。例如我们展示压缩的进度状态和结束状态，我们可以这么干：
```javascript
const fs = require("fs");
const zlib = require("zlib");
const file = process.argv[2];

fs.createReadStream(file)
  .pipe(zlib.createGzip())
  .on("data", () => process.stdout.write("."))
  .pipe(fs.createWriteStream(file + ".zz"))
  .on("finish", () => console.log("Done"));
```
可以看到使用`pipe`可以很方便的处理流，但是如果我们想要自定义交互，那么我们就可以用`event`.


其实，我们也可以通过实现一个转换流和`pipe`结合使用，以此代替`.on`。看代码：
```javascript
const fs = require("fs");
const zlib = require("zlib");
const file = process.argv[2];

const { Transform } = require("stream");

const reportProgress = new Transform({
  transform(chunk, encoding, callback) {
    process.stdout.write(".");
    callback(null, chunk);
  }
});

fs.createReadStream(file)
  .pipe(zlib.createGzip())
  .pipe(reportProgress)
  .pipe(fs.createWriteStream(file + ".zz"))
  .on("finish", () => console.log("Done"));
```
`reportProgress`是一个简单的转换流，他也可以将压缩进度报告给标准输出。`callback`的第二个参数，将数据推动到转换流方法中。

在进一步完善上面的例子，我们想要压缩后加密文件内容，我们就需要用到`crypto`模块。
```javascript
const crypto = require("crypto");

// ..

fs.createReadStream(file)
  .pipe(zlib.createGzip())
  .pipe(crypto.createCipher("aes192", "a_secret"))
  .pipe(reportProgress)
  .pipe(fs.createWriteStream(file + ".zz"))
  .on("finish", () => console.log("Done"));
```
同样的，我们也需要在解压缩之前解密文件内容：
```javascript
fs.createReadStream(file)
  .pipe(crypto.createDecipher("aes192", "a_secret"))
  .pipe(zlib.createGunzip())
  .pipe(reportProgress)
  .pipe(fs.createWriteStream(file.slice(0, -3)))
  .on("finish", () => console.log("Done"));
```
假设使用的文件是压缩版本，上面的代码将创建一个读取流，将其通过管道`createDecipher()`传输到加密流中（使用相同的秘密），将其输出通过管道`createGunzip()`传输到 `zlib`流中，然后将内容写回没有扩展名部分的文件。


## 补充

Node Stream知识非常多，可以结合本文对照官方文档详细了解一下stream

### 两种读取模式

可读流运作于两种模式之一，要么是流动模式（`flowing`），要么是暂停模式（`paused`）。
- 在流动模式中，数据自动从底层系统读取，并通过 `EventEmitter` 接口的事件尽可能快地被提供给应用程序。
- 在暂停模式中，必须显式调用 `stream.read()` 读取数据块。
所有可读流都开始于暂停模式，可以通过以下方式切换到流动模式：
- 添加 `data` 事件句柄。
- 调用 `stream.resume()` 方法。
- 调用 `stream.pipe()` 方法将数据发送到可写流。

可读流可以通过以下方式切换回暂停模式：
- 如果没有管道目标，则调用 `stream.pause()`。
- 如果有管道目标，则移除所有管道目标。调用 `stream.unpipe()` 可以移除多个管道目标。

只有提供了消费或忽略数据的机制后，可读流才会产生数据。 如果消费的机制被禁用或移除，则可读流会停止产生数据。
为了向后兼容，移除 `data` 事件句柄不会自动地暂停流。 如果有管道目标，一旦目标变为 `drain` 状态并请求接收数据时，则调用 `stream.pause()` 也不能保证流会保持暂停模式。
如果可读流切换到流动模式，且没有可用的消费者来处理数据，则数据将会丢失。 例如，当调用 readable.resume() 时，没有监听 `data` 事件或 `data` 事件句柄已移除。
添加 `readable` 事件句柄会使流自动停止流动，并通过 `readable.read()` 消费数据。 如果 `readable` 事件句柄被移除，且存在 `data` 事件句柄，则流会再次开始流动

> 当使用 pipe 方法消费可读流时，我们不必担心这些模式，因为 pipe 会自动管理它们

###  对象模式
默认情况下，流期望的值是String或Buffer类型。 当然，流的实现也可以使用其它类型的 JavaScript 值（除了 null）。 这些流会以“对象模式”进行操作。
当创建流时，可以使用 objectMode 属性把流实例切换到对象模式。

这是用一个简单的例子来证明这一点。以下转换流的组合将一串逗号分隔的值映射到 JavaScript 对象中。例如：`"a,b,c,d"`变成`{a: b, c: d}`
```javascript
const { Transform } = require("stream");

const commaSplitter = new Transform({
  readableObjectMode: true,

  transform(chunk, encoding, callback) {
    this.push(
      chunk
        .toString()
        .trim()
        .split(",")
    );
    callback();
  }
});

const arrayToObject = new Transform({
  readableObjectMode: true,
  writableObjectMode: true,
  transform(chunk, encoding, callback) {
    const obj = {};
    for (let i = 0; i < chunk.length; i += 2) {
      obj[chunk[i]] = chunk[i + 1];
    }
    this.push(obj);
    callback();
  }
});

const objectToString = new Transform({
  writableObjectMode: true,
  transform(chunk, encoding, callback) {
    this.push(JSON.stringify(chunk) + "\n");
    callback();
  }
});
```
然后
```javacript
process.stdin
  .pipe(commaSplitter)
  .pipe(arrayToObject)
  .pipe(objectToString)
  .pipe(process.stdout);
```




## 参考资料
本文主要参考对照官方文档，结合自身的理解翻译了[Node Stream](https://www.freecodecamp.org/news/node-js-streams-everything-you-need-to-know-c9141306be93/)这篇文章。如果有错误之处欢迎指正。

- [Node.js v16.3.0 文档](http://nodejs.cn/api/stream.html#stream_event_data)
- [Node 入门教程](http://nodejs.cn/learn/nodejs-streams)
- [Node Stream](https://www.freecodecamp.org/news/node-js-streams-everything-you-need-to-know-c9141306be93/)

