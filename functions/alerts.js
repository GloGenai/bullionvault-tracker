// functions/alerts.js
const nodemailer = require('nodemailer');

exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { position, currentPrice, profitPercentage } = JSON.parse(event.body);

  // Configure email transporter
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: 'glogenai2009@gmail.com',
      subject: `BullionVault Alert - ${profitPercentage}% threshold reached`,
      text: `Your ${position.metal} position in ${position.location} (${position.quantity}kg) has reached ${profitPercentage}% profit
Purchase price: ${position.purchasePrice}€
Current price: ${currentPrice}€`,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to send alert' }),
    };
  }
}
