exports.handler = async function() {
  try {
    return {
      statusCode: 200,
      body: JSON.stringify({
        bvUser: process.env.BULLIONVAULT_USERNAME ? "Set" : "Not set",
        bvPass: process.env.BULLIONVAULT_PASSWORD ? "Set" : "Not set",
        emailUser: process.env.EMAIL_USER ? "Set" : "Not set",
        emailPass: process.env.EMAIL_PASSWORD ? "Set" : "Not set"
      })
    };
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
}
