const http = require('http')

const server = http.createServer((req, res) => {
  // as a reminder, a status code of 200 means 'success'
  res.statusCode = 200

  // tell the browser what we're sending back
  res.setHeader('Content-Type', 'text/html')

  // send back some content
  res.write('<h1>Hello World!</h1>')

  // sends response back to the browser
  res.end()
})

// web servers need to be continuously listening for incoming requests
server.listen(8080, () => {
  console.log('server started on port 8080')
})