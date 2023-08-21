const sendEmail = require('./sendEmail');

const sendResetPassswordEmail = async ({ name, email, token, origin }) => {
  const resetURL = `${origin}/user/reset-password?token=${token}&email=${email}`;
  // const message = `<p>Please reset password by clicking on the following link : 
  // <a href="${resetURL}">Reset Password</a></p>`;

  const message = `
    <h4>Hello, ${name}</h4>
    <p>Please reset your password by clicking on the following link:</p>
    <p><a href="${resetURL}">Reset Password</a></p>
  `;
  return sendEmail({
    to: email,
    subject: 'Reset Password',
    html: message
  });
};

module.exports = sendResetPassswordEmail;
