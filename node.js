var writeMessageToFile = require('./message.js')
const http = require('http');
const server = http.createServer((req, res) => {
    if (req.method === 'POST') {
        // Handle post info...
      const { headers, method, url } = req;
      let body = [];
      req.on('error', (err) => {
        console.error(err);
      }).on('data', (chunk) => {
        body.push(chunk);
      }).on('end', () => {
        body = Buffer.concat(body).toString();
        // BEGINNING OF NEW STUFF

        res.on('error', (err) => {
          console.error(err, 'There is an error');
        });

        res.statusCode = 200;

        // const responseBody = { headers, method, url, body };
        const userInput = body.split('=')[1]

        writeMessageToFile(userInput)
        res.end(`
            <!doctype html>
            <html>
            <body>
                <h4>Your message has been saved</h4>
            </body>
            </html>
          `);
      })
    } else {
      res.end(`
        <!doctype html>
        <html>
        <body>
          <h2>Form</h2>
          <form action="/" method="post">
              <input type="text" name="message" value="Message" /><br />
              <input type="submit" value="Submit" /><br />
          </form>
        </body>
        </html>
      `);
    }
});
server.listen(3000)