import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.use(chaiHttp);
chai.should();


describe('password reset test', () => {
  const usedToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJqb2huIiwiZW1haWwiOiJhdXRob3JAaGVpbWRhbC5jb20iLCJpYXQiOjE1NDQ1NDY4MDJ9.e8ZzPOy8eocxCuSneR5FliodFYOzAmJB2HX3TnT5Vkk';
  const userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJzZXVuIiwiZW1haWwiOiJ1c2VyQGhlaW1kYWwuY29tIiwiaWF0IjoxNTQ0NTQ2ODAyfQ.2ahYIKpWTqAIrsEjBInBLx58a5CbB8UN7JTDb5wU9sY';

  describe(' POST /v1/api/forgot', () => {
    it('should return status code 400 when email is invalid', async () => {
      const res = await chai
        .request(app)
        .post('/api/v1/password/forgot')
        .send({
          email: 'emaigmail.com'
        });
      res.status.should.equal(400);
      res.body.should.be.a('object');
      res.body.message.should.be.equal('please input a valid email');
    });

    it('should return a 404 if user with the email does not exist', async () => {
      const res = await chai
        .request(app)
        .post('/api/v1/password/forgot')
        .send({
          email: 'notexisting@test.com'
        });

      res.status.should.equal(404);
      res.body.should.be.a('object');
      res.body.message.should.be.equal('user not avalaible');
    });

    it('should return a 200 when users email is valid', async () => {
      const res = await chai
        .request(app)
        .post('/api/v1/password/forgot')
        .send({
          email: 'user@heimdal.com'
        });

      res.status.should.equal(200);
      res.body.should.be.a('object');
      res.body.message.should.equal('Email was sent successfully');
    });
  });

  describe(' PUT /reset/:token', () => {
    it('should return status code 404 when user is invalid', async () => {
      const res = await chai
        .request(app)
        .put('/api/v1/password/reset/jhuyytcfcyf')
        .send({
          password: '123456',
          confirmPassword: '123456'
        });
      res.status.should.equal(401);
      res.body.should.be.a('object');
      res.body.should.have.property('message');
      res.body.message.should.equal('error decoding token');
    });

    it('should return status code 400 if linked is already used', async () => {
      const res = await chai
        .request(app)
        .put(`/api/v1/password/reset/${usedToken}`)
        .send({
          password: '123456',
          confirmPassword: '123456'
        });
      res.status.should.equal(400);
      res.body.should.be.a('object');
      res.body.should.have.property('message');
      res.body.message.should.equal('this link has already been used to reset your password');
    });

    it('should return status code 200 when user password is reset successfully', async () => {
      const res = await chai
        .request(app)
        .put(`/api/v1/password/reset/${userToken}`)
        .send({
          password: '123456',
          confirmPassword: '123456'
        });
      res.status.should.equal(200);
      res.body.should.be.a('object');
      res.body.should.have.property('message');
      res.body.message.should.equal('password update was successful');
    });

    it('should return status code 400 if password is not defined', async () => {
      const res = await chai
        .request(app)
        .put(`/api/v1/password/reset/${userToken}`)
        .send({
          password: '',
          confirmPassword: '123456'
        });
      res.status.should.equal(400);
      res.body.should.be.a('object');
      res.body.should.have.property('message');
    });

    it('should return status code 400 if password is not the same as confirmpassword', async () => {
      const res = await chai
        .request(app)
        .put(`/api/v1/password/reset/${userToken}`)
        .send({
          password: '222334444',
          confirmPassword: '123456'
        });

      res.status.should.equal(400);
      res.body.should.be.a('object');
      res.body.should.have.property('message');
    });

    it('should return status code 400 if confirm password is undefined', async () => {
      const res = await chai
        .request(app)
        .put(`/api/v1/password/reset/${userToken}`)
        .send({
          password: '222334444',
          confirmPassword: ''
        });
      res.status.should.equal(400);
      res.body.should.be.a('object');
      res.body.should.have.property('message');
    });
  });
});
