import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../index';
import bodyHelper from './bodyHelper';

chai.use(chaiHttp);

chai.use(chaiHttp);
chai.should();

describe('User Authentication Test', () => {
  describe('GET /', () => {
    it('should return 404 for visiting a random endpoint on the app', async () => {
      const res = await chai.request(app).get('/');
      res.should.be.a('object');
      res.status.should.equal(404);
    });
  });

  describe('Test for registering a new user', () => {
    it('should return 201 on sucessfully creating a new user', async () => {
      const data = {
        email: 'testin@test.com',
        password: 'etydhfkjdkvl1',
        username: 'test'
      };
      const res = await chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send(data);
      res.should.be.a('object');
      res.status.should.equal(201);
      bodyHelper.emailToken.validTokenInDb = res.body.emailToken;
      bodyHelper.userToken = res.body.token;
    });

    it('should return error if user enters an existing email', async () => {
      const userDataWithAnExistingEmail = {
        email: 'testin@test.com',
        password: 'omotayo123',
        username: 'Omotayo'
      };
      const res = await chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send(userDataWithAnExistingEmail);
      res.status.should.equal(409);
      res.body.should.be.a('object');
      res.body.should.have.property('message');
      res.body.message.should.equal('This email has been taken');
    });
  });

  describe('Test to login an existing user', () => {
    it('should return 200 on sucessfully login in a new user', async () => {
      const data = {
        email: 'testin@test.com',
        password: 'etydhfkjdkvl1'
      };
      const res = await chai
        .request(app)
        .post('/api/v1/auth/login')
        .send(data);

      res.should.be.a('object');
      res.status.should.equal(200);
    });

    describe('Test for verifying a users email address in the database. GET api/vi/users/verify-email/:emailToken', () => {
      it('should return 400 if the emailToken sent is invalid', async () => {
        const res = await chai
          .request(app)
          .get(`/api/v1/users/verify-email/${bodyHelper.emailToken.invalidToken}`);

        res.should.be.a('object');
        res.status.should.equal(400);
      });
      it('should return 404 if the emailToken sent is valid but the user does not exist in the database', async () => {
        const res = await chai
          .request(app)
          .get(`/api/v1/users/verify-email/${bodyHelper.emailToken.randomValidToken}`);
        res.should.be.a('object');
        res.status.should.equal(404);
      });
      it('should update the user emailVerification to true when the emailToken is valid and the user is found in the database', async () => {
        const res = await chai
          .request(app)
          .get(`/api/v1/users/verify-email/${bodyHelper.emailToken.validTokenInDb}`);
        res.should.be.a('object');
        res.status.should.equal(200);
      });
    });

    describe('Test for listing all users', () => {
      it('Should return status 200 on successful retrieval of authors', async () => {
        const response = await chai.request(app).get('/api/v1/users/authors');
        response.status.should.equal(200);
        response.body.should.have.a('object');
        response.body.should.have.property('message');
      });
    });
  });
});
