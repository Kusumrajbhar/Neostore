//Setup for sending mail
import sendmail from 'sendmail' //Importing sendmail npm package

//Setup for sendmail package
const emailSender = sendmail({
    silent: false
    // devPort: 1025, // Default: False
    // devHost: 'localhost', // Default: localhost
    // smtpPort: 2525, // Default: 25
    // smtpHost: 'localhost'
});

const sendEmail = (options: sendmail.MailInput): Promise<boolean> =>
    new Promise((resolve, reject) => {
        emailSender(options, (err, reply) => {
            // if error happened or returned code is now started with 2**
            if (err || !reply.startsWith("2")) {
                reject(err);
            } else {
                resolve(true);
            }
        });
    });

//Exporting sendEmail for other files to use it.
    export default sendEmail;