import fetch from 'node-fetch';

exports.handler = async function(event, context) {
  try {
    // Step 1: Login
    const loginResponse = await fetch('https://www.bullionvault.com/secure/j_security_check', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `j_username=${process.env.BULLIONVAULT_USERNAME}&j_password=${process.env.BULLIONVAULT_PASSWORD}`,
    });

    // Step 2: Store cookies
    const cookies = loginResponse.headers.get('set-cookie');
    console.log('Auth status:', loginResponse.status);
    console.log('Cookies:', cookies);

    // Step 3: Return response
    return {
      statusCode: 200,
      body: JSON.stringify({ 
        status: loginResponse.status,
        auth: 'Attempted login'
      })
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
}
