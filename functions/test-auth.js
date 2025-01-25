const fetch = require('node-fetch');

exports.handler = async function() {
  try {
    const response = await fetch('https://live.bullionvault.com/secure/api/v2/authenticate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: process.env.BULLIONVAULT_USERNAME,
        password: process.env.BULLIONVAULT_PASSWORD
      })
    });
    const data = await response.json();
    return { statusCode: 200, body: JSON.stringify(data) };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({error: error.message}) };
  }
}
