const sendEmail = require('./sendEmail');

const sendVerificationEmail = async ({
  name,
  email,
  verificationToken,
  origin,
}) => {
    console.log(name, email, verificationToken, origin)
  const verifyEmail = `${origin}/user/verify-email?token=${verificationToken}&email=${email}`;//clientta user/verify-email ile verify componentine yonlendir//normalde tokenı gönderip mongoya kayıt ettiriyo ama biz json formatında clienta gönderiyoruz localstrogeeyekayıt etmek için

  const message = `<p>Please confirm your email by clicking on the following link : 
  <a href="${verifyEmail}">Verify Email</a> </p>`;//sendMail ile gelen bu mail tıklanıldığında verifyEmail'e gider clientta verify componentine yonlendirir

  return sendEmail({
    to: email,
    subject: 'Email Confirmation',
    html: `<h4> Hello, ${name}</h4>
    ${message}
    `,
  });
};

module.exports = sendVerificationEmail;
