export default {
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  // host: 'smtp.mailtrap.io',
  // port: 2525,
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
    // user: '170c5c2285fd15',
    // pass: '108b2f811b43ec',
  },
  default: {
    from: 'Teste <noreplay@gympoint.com>',
  },
};
