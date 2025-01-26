import fetch from 'node-fetch';

exports.handler = async function(event, context) {
  try {
    // Step 1: Initial login 
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

      // Step 2: Get market data
      const marketResponse = await fetch('https://www.bullionvault.com/secure/api/v2/view_market_xml.do?considerationCurrency=EUR', {
        headers: {
          'Cookie': sessionCookie
        }
      });

      const data = await marketResponse.text();
      return {
        statusCode: 200,
        body: JSON.stringify({ data })
      };
    }

    return {
      statusCode: 401,
      body: JSON.stringify({ error: 'Login failed' })
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
}
