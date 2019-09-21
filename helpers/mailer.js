import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';

dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const mailer = {
  /**
   * @description This method is used to send custom emails
   * @param {String} emailAddress
   * @param {Object} emailContent
   * @returns {Boolen} Status of sent email
   */
  sendCustomMail(emailAddress, emailContent) {
    const { emailSubject, emailBody } = emailContent;

    const msg = {
      to: emailAddress,
      from: 'Heimdal <hello@heimdal.com>',
      subject: emailSubject,
      html: emailBody
    };
    return sgMail
      .send(msg)
      .then(() => ({ success: true, message: 'email sent' }))
      .catch(() => ({ success: false, message: 'email not sent' }));
  },
  /**
   * @description This method is used to send a verification mail to a user
   * @param {String} emailAddress
   * @param {string} username
   * @param {string} link
   * @returns {Boolen} Status of sent email
   */
  sendVerificationMail(emailAddress, username, link) {
    const emailSubject = 'Verify your email on Authors Haven';

    const emailBody = `
      <div>
        <h2 style="color: grey">Hello ${username}, Thanks for signing up on Heimdal</h2>
        Please click <a style="color: blue" href="${link}">here</a> to verify your email address, this link expires in two days.
        Alternatively you can copy out the link below and paste in your browser <a href="${link}">${link}</a>
      </div>
    `;

    const emailContent = { emailSubject, emailBody };
    mailer.sendCustomMail(emailAddress, emailContent);
  },
  /**
   * @description This method is used to send a verification mail to a user
   * @param {String} emailAddress
   * @param {string} username
   * @param {string} info
   * @returns {Boolen} Status of sent email
   */
  sendNotificationMail(emailAddress, username, info) {
    const { type, link, title } = info;
    const emailSubject = `${emailAddress}`;
    const emailBody = `
      <div>
          <h3 style="color:blue;"> Hi!!! ${username} added a ${type} to your Article</h3> <div style="border:1px solid black; padding:5px;"><h1>${title}</h1></div> 
          <p> checkout link ${link}</p>
      </div>
    `;
    const emailContent = { emailSubject, emailBody };
    mailer.sendCustomMail(emailAddress, emailContent);
    return true;
  }
};

export default mailer;
