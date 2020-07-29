const request = require('request');
const fs = require('fs');
const args = process.argv.slice(2);
const address = args[0];
const savePath = args[1];

request(address, (error, response, body) => {
  if (error) {
    throw error;
  } else if (response.statusCode !== 200) {
    console.log(`Received a statusCode of ${response.statusCode} from server.\nTerminating application...`);
    return;
  }
  fs.writeFile(savePath, body, 'utf-8', (error) => {
    if (error) {
      throw error;
    }
    fs.stat(savePath, (error, stats) => {
      if (error) {
        throw error;
      }
      console.log(`Downloaded and saved ${stats.size} bytes to ${savePath}`);
    });
  });
});