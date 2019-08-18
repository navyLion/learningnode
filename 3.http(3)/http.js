/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-07 23:50:31
 * @LastEditTime: 2019-08-18 19:25:33
 * @LastEditors: Please set LastEditors
 */
// 引入 http 模块
let http = require('http')
let fs = require('fs')
let mime = require('mime')  // 使用 npm install mime 安装
let url = require('url')

function serve (request, response) {
  let urlObj = url.parse(request.url, true) // true 将 query 转为对象
  console.log(urlObj)
  console.log('get请求参数:', urlObj.query)
  let pathName = urlObj.pathname
  if( pathName == '/' ) {  // 根据请求 url 执行对应的响应体
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    fs.readFile('index.html', (err, data) => {
      response.write(data)  //将读取的 index.html 内容写入响应体
      response.end()
    })
  }else if ( pathName == '/index.css') {
    responseStatic( pathName, response )
  } else if ( pathName == '/index.js' ) {
    responseStatic( pathName, response )
  }

  function responseStatic( url, response ) {
    let type = mime.getType(url)
    response.statusCode = 200
    response.setHeader('Content-Type',mime.getType(url) + ';charset=utf-8')  // 修改响应文件类型为 css
    fs.readFile(url.slice(1), (err, data) => {
      response.write(data)
      response.end()
    })
  }
}

// 执行响应
let server = http.createServer(serve) 

// 监听
server.listen(8000, 'localhost')

