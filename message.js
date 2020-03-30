const fs = require('fs')

const writeMessageToFile = message => fs.writeFile('message.txt', message, err => {
  if (err)
    console.log('Something went wrong')
  else
    console.log('Message saved')
});
module.export =  writeMessageToFile