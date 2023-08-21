const sendEmail = require('./sendEmail');

const sendVerificationEmail = async ({
  name,
  email,
  verificationToken,
  origin,
}) => {
    console.log(name, email, verificationToken, origin)
  const verifyEmail = `${origin}/user/verify-email?token=${verificationToken}&email=${email}`;//clientta user/verify-email ile verify componentine yonlendir//normalde tokenı gönderip mongoya kayıt ettiriyo ama biz json formatında clienta gönderiyoruz localstrogeeyekayıt etmek için

  //const message = `<p>Please confirm your email by clicking on the following link : 
  //<a href="${verifyEmail}">Verify Email</a> </p>`;//sendMail ile gelen bu mail tıklanıldığında verifyEmail'e gider clientta verify componentine yonlendirir

  const message = `
  <html>
    <head>
      <style>
        /* Define any CSS styles you want to apply to your email */
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
          background-color: #f4f4f4;
        }
        .container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }
        .content {
          background-color: #fff;
          border: 1px solid #007bff;
          border-radius: 10px;
          padding: 20px;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }
        h4 {
          color: #333;
        }
        .button {
          display: inline-block;
          background-color: #33A3CC;
          color: #fff;
          padding: 10px 20px;
          text-decoration: none;
          border-radius: 5px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="content">
          <h4>Hello, ${name}!</h4>
          <p>We have received a request to verify your email.</p>
          <p>Please click the button below to verify your email:</p>
          <p><a class="button" href="${verifyEmail}">Verify Email</a></p>
          <p>If you didn't request a password reset, you can safely ignore this email.</p>
          <p>Best regards,</p>
          <p>Your Team</p>
        </div>
      </div>
    </body>
  </html>
`;



  return sendEmail({
    to: email,
    subject: 'Email Confirmation',
    html: message,
  });
};

module.exports = sendVerificationEmail;
