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

    // Step 3: Fetch market data
    const marketResponse = await fetch('https://www.bullionvault.com/secure/api/v2/view_market_xml.do?considerationCurrency=EUR&marketWidth=1', {
      headers: {
        Cookie: cookies,
      },
    });

    const xmlData = await marketResponse.text();
    console.log('Market data:', xmlData);

    return {
      statusCode: 200,
      body: JSON.stringify({ 
        status: loginResponse.status,
        marketData: xmlData
      })
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
}
