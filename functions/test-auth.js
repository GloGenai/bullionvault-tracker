const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

exports.handler = async function() {
  try {
    const response = await fetch('https://www.bullionvault.com/secure/j_security_check', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `j_username=${process.env.BULLIONVAULT_USERNAME}&j_password=${process.env.BULLIONVAULT_PASSWORD}`
    });

    const text = await response.text();
    return { 
      statusCode: 200,
      body: JSON.stringify({
        status: response.status,
        text: text.substring(0, 200) // Show first 200 chars
      })
    };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({error: error.message}) };
  }
}
