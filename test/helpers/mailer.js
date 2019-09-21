import chai from 'chai';
import chaiHttp from 'chai-http';

import mailer from '../../helpers/mailer';

chai.use(chaiHttp);
chai.should();

describe('Mail Sender test', () => {
  it('should send an email to a particular address when the dependencies are complete', async () => {
    const emailAddress = 'pereowei.izontimi@andela.com';
    const emailSubject = 'Verify your email on Authors Haven';
    const emailBody = `
      <div>
        <h2 style="color: grey">Hello Henry, Thanks for signing up on Heimdal</h2>
        Please click <a style="color: blue" href="www.heimdal.com">here</a> to verify your email address, this link expires in two days.
        Alternatively you can copy out the link below and paste in your browser <a href="www.heimdal.com">www.heimdal.com</a>
      </div>
    `;
    const emailContent = { emailSubject, emailBody };
    const result = await mailer.sendCustomMail(emailAddress, emailContent);

    result.should.be.an('object');
    result.should.have.property('success');
    result.success.should.equal(true);
    result.should.have.property('message');
    result.message.should.equal('email sent');
  });

  it('should not send an email when SENDGRID_API_KEY is invalid)', async () => {
    process.env.SENDGRID_API_KEY = '12324343sxsxs';
    const emailAddress = undefined;
    const emailSubject = 'Verify your email on Authors Haven';
    const emailBody = `
      <div>
        <h2 style="color: grey">Hello Henry, Thanks for signing up on Heimdal</h2>
        Please click <a style="color: blue" href="www.heimdal.com">here</a> to verify your email address, this link expires in two days.
        Alternatively you can copy out the link below and paste in your browser <a href="www.heimdal.com">www.heimdal.com</a>
      </div>
    `;
    const emailContent = { emailSubject, emailBody };
    const result = await mailer.sendCustomMail(emailAddress, emailContent);

    result.should.be.an('object');
    result.should.have.property('success');
    result.success.should.equal(false);
    result.should.have.property('message');
    result.message.should.equal('email not sent');
  });
});
