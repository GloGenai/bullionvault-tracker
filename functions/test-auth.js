exports.handler = async function() {
  try {
    const response = await fetch('https://api.bullionvault.com/v2/authenticate', {
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
