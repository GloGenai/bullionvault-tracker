const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

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

    const responseText = await response.text();
    console.log('Response status:', response.status);
    console.log('Response headers:', response.headers.raw());
    console.log('Response text:', responseText);

    return { 
      statusCode: 200, 
      body: JSON.stringify({
        status: response.status,
        text: responseText
      })
    };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({error: error.message}) };
  }
}
