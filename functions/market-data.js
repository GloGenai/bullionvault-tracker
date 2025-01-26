import fetch from 'node-fetch';

exports.handler = async function(event, context) {
  try {
    // Step 1: Initial login GET request
    const loginPage = await fetch('https://www.bullionvault.com/secure/login.do');
    
    // Step 2: Submit login credentials
    const loginResponse = await fetch('https://www.bullionvault.com/secure/j_security_check', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': loginPage.headers.get('set-cookie')
      },
      body: `j_username=${process.env.BULLIONVAULT_USERNAME}&j_password=${process.env.BULLIONVAULT_PASSWORD}`,
      redirect: 'manual'
    });

    // Step 3: Get session cookie
    const sessionCookie = loginResponse.headers.get('set-cookie');

    // Step 4: Fetch market data with session cookie
    const marketResponse = await fetch('https://www.bullionvault.com/secure/api/v2/view_market_xml.do?considerationCurrency=EUR', {
      headers: {
        'Cookie': sessionCookie
      }
    });

    const xmlData = await marketResponse.text();
    console.log('Market data response:', xmlData);

    return {
      statusCode: 200,
      body: JSON.stringify({ data: xmlData })
    };

  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
}
