import fetch from 'node-fetch';

exports.handler = async function(event, context) {
  try {
    // Step 1: Get initial cookie
    const loginPage = await fetch('https://www.bullionvault.com/secure/login.do');
    const initialCookie = loginPage.headers.get('set-cookie');

    // Step 2: Submit login with cookie
    const loginResponse = await fetch('https://www.bullionvault.com/secure/j_security_check', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': initialCookie
      },
      body: `j_username=${process.env.BULLIONVAULT_USERNAME}&j_password=${process.env.BULLIONVAULT_PASSWORD}`,
      redirect: 'manual'
    });

    // Step 3: Get session cookie
    const sessionCookie = loginResponse.headers.get('set-cookie');

    // Step 4: Get market data
    const marketResponse = await fetch('https://www.bullionvault.com/secure/api/v2/view_market_xml.do?considerationCurrency=EUR', {
      headers: {
        'Cookie': `${initialCookie}; ${sessionCookie}`
      }
    });

    const data = await marketResponse.text();
    return {
      statusCode: 200,
      body: JSON.stringify({ data })
    };

  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
}
