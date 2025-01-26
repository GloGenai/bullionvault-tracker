import fetch from 'node-fetch';

exports.handler = async function(event, context) {
  try {
    // Step 1: Initial login 
    console.log('Starting login...');
    const loginResponse = await fetch('https://www.bullionvault.com/secure/j_security_check', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      body: `j_username=${process.env.BULLIONVAULT_USERNAME}&j_password=${process.env.BULLIONVAULT_PASSWORD}`,
      redirect: 'manual'
    });

    console.log('Login status:', loginResponse.status);
    console.log('Login headers:', loginResponse.headers.raw());

    // Only proceed if login successful
    if (loginResponse.status === 302) {
      const sessionCookie = loginResponse.headers.get('set-cookie');
      console.log('Session cookie:', sessionCookie);

      return {
        statusCode: 200,
        body: JSON.stringify({ status: 'Login successful' })
      };
    }

    return {
      statusCode: 401,
      body: JSON.stringify({ error: 'Login failed' })
    };

  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500, 
      body: JSON.stringify({ error: error.message })
    };
  }
}
