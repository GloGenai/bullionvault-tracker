import fetch from 'node-fetch';

exports.handler = async function(event, context) {
  try {
    // Step 1: Initial GET for login page to get JSESSIONID
    const loginPageResponse = await fetch('https://www.bullionvault.com/secure/login.do', {
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
      }
    });

    const jsessionId = loginPageResponse.headers.get('set-cookie')?.match(/JSESSIONID=[^;]+/)?.[0];

    // Step 2: Login POST
    const loginResponse = await fetch('https://www.bullionvault.com/secure/j_security_check', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': jsessionId,
        'Origin': 'https://www.bullionvault.com',
        'Referer': 'https://www.bullionvault.com/secure/login.do'
      },
      body: `j_username=${process.env.BULLIONVAULT_USERNAME}&j_password=${process.env.BULLIONVAULT_PASSWORD}`,
      redirect: 'manual'
    });

    console.log('Login status:', loginResponse.status);
    console.log('Login cookies:', loginResponse.headers.get('set-cookie'));

    // Step 3: Get market data with session cookie
    const marketResponse = await fetch('https://www.bullionvault.com/secure/api/v2/view_market_xml.do?considerationCurrency=EUR', {
      headers: {
        'Cookie': loginResponse.headers.get('set-cookie') || jsessionId
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
