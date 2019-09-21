import chai from 'chai';
import chaiHttp from 'chai-http';
import Chance from 'chance';
import app from '../../index';

const chance = Chance();
chai.use(chaiHttp);
chai.should();

describe('User signup validation (middleware)', () => {
  const userSignupUrl = '/api/v1/auth/signup';
  it('should return an error if the user enters an empty username', async () => {
    const userDataWithEmptyUserName = {
      email: chance.email(),
      password: chance.string({ length: 8 }),
      username: ''
    };

    const res = await chai.request(app)

      .post(userSignupUrl)
      .send(userDataWithEmptyUserName);

    res.status.should.equal(400);
    res.body.should.be.a('object');
    res.body.should.have.property('errors');
    res.body.errors.should.be.a('object');
    res.body.errors.should.have.property('username');
    res.body.errors.username.msg.should.equal('please enter a Username, it cannot be empty');
  });

  it('should return an error if user enters a username that is not alphanumeric i.e an alphabet or a number', async () => {
    const userDataWithNonAlphaNumeric = {
      email: chance.email(),
      password: chance.string({ length: 8 }),
      username: '?!?!{}{}{}'
    };

    const res = await chai.request(app)
      .post(userSignupUrl)
      .send(userDataWithNonAlphaNumeric);
    res.status.should.equal(400);
    res.body.should.be.a('object');
    res.body.should.have.property('errors');
    res.body.errors.should.be.a('object');
    res.body.errors.should.have.property('username');
    res.body.errors.username.msg.should.equal('please enter a valid username can contain a letter or mixture of both letter and number');
  });

  it('should return error if user enters a username with length more than 20 characters', async () => {
    const userDataWithLongUserName = {
      email: chance.email(),
      password: chance.string({ length: 8 }),
      username: 'fbhbsdhfbdahfabdfanbfajndfbadhfbajhfbadhfbajhfbdnabfhabdfkdfa'
    };

    const res = await chai.request(app)
      .post(userSignupUrl)
      .send(userDataWithLongUserName);
    res.status.should.equal(400);
    res.body.should.be.a('object');
    res.body.should.have.property('errors');
    res.body.errors.should.be.a('object');
    res.body.errors.should.have.property('username');
    res.body.errors.username.msg.should.equal('please enter a valid username, cannot be more than 20 characters');
  });

  it('should return an error if user enters a password length less than 8 characters', async () => {
    const userDataWithShortPassword = {
      email: chance.email(),
      password: 'omot',
      username: chance.first()
    };

    const res = await chai.request(app)
      .post(userSignupUrl)
      .send(userDataWithShortPassword);
    res.status.should.equal(400);
    res.body.should.be.a('object');
    res.body.should.have.property('errors');
    res.body.errors.should.be.a('object');
    res.body.errors.should.have.property('password');
    res.body.errors.password.msg.should.equal('password must be at least 8 characters');
  });

  it('should return an error if user dont enter password', async () => {
    const userDataWithEmptyPassword = {
      email: chance.email(),
      password: '',
      username: chance.last()
    };

    const res = await chai.request(app)
      .post(userSignupUrl)
      .send(userDataWithEmptyPassword);
    res.status.should.equal(400);
    res.body.should.be.a('object');
    res.body.should.have.property('errors');
    res.body.errors.should.be.a('object');
    res.body.errors.should.have.property('password');
    res.body.errors.password.msg.should.equal('password cannot be empty');
  });

  it('should return error if password is does not contain a letter and a number', async () => {
    const userDataWithNotLetterAndNumberPassword = {
      email: chance.email(),
      password: 'omotayotoluewnw',
      username: chance.last()
    };

    const res = await chai.request(app)
      .post(userSignupUrl)
      .send(userDataWithNotLetterAndNumberPassword);
    res.status.should.equal(400);
    res.body.should.be.a('object');
    res.body.should.have.property('errors');
    res.body.errors.should.be.a('object');
    res.body.errors.should.have.property('password');
    res.body.errors.password.msg.should.equal('password must contain a letter and number');
  });

  it('should return error if user enters invalid email', async () => {
    const userDataWithInvalidEmail = {
      email: 'thisisAndela@@@anfkfkkf.com',
      password: chance.string({ length: 8 }),
      username: chance.last()
    };

    const res = await chai.request(app)
      .post(userSignupUrl)
      .send(userDataWithInvalidEmail);
    res.status.should.equal(400);
    res.body.should.be.a('object');
    res.body.should.have.property('errors');
    res.body.errors.should.be.a('object');
    res.body.errors.should.have.property('email');
    res.body.errors.email.msg.should.equal('please enter a valid email');
  });

  it('should return error if user fails to enter an email', async () => {
    const userDataWithEmptyEmail = {
      email: '',
      password: chance.string({ length: 8 }),
      username: chance.last()
    };

    const res = await chai.request(app)
      .post(userSignupUrl)
      .send(userDataWithEmptyEmail);
    res.status.should.equal(400);
    res.body.should.be.a('object');
    res.body.should.have.property('errors');
    res.body.errors.should.be.a('object');
    res.body.errors.should.have.property('email');
    res.body.errors.email.msg.should.equal('please enter an email');
  });

  it('should return a success if user details are correct', async () => {
    const userDataWithAnExistingEmail = {
      email: 'omotayo@test.com',
      password: 'omotayo123',
      username: 'Omotayo'
    };
    const res = await chai.request(app)
      .post('/api/v1/auth/signup')
      .send(userDataWithAnExistingEmail);
    res.status.should.equal(201);
  });
});
