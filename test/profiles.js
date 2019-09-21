import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.use(chaiHttp);
chai.should();

describe('Heimdal Test Suite', () => {
  // ==== View users profile ==== //
  describe(' GET profiles/:username - View users profile', () => {
    it('should return status code 200 on getting a users profile', async () => {
      const res = await chai.request(app)
        .get('/api/v1/profiles/john');
      res.status.should.equal(200);
      res.body.should.be.a('object');
      res.body.should.have.property('message');
      res.body.should.have.property('profile');
      res.body.message.should.equal('Users profile returned succesfully');
    });

    it('should return status code 404 if user is not found', async () => {
      const res = await chai.request(app)
        .get('/api/v1/profiles/nosuchuser');
      res.status.should.equal(404);
      res.body.should.be.a('object');
      res.body.should.have.property('message');
      res.body.message.should.equal('Users profile not found');
    });
  });

  // ==== Update users profile ==== //
  describe(' PUT profiles/:username - Update users profile', () => {
    it('should return status code 401 if user token is invalid', async () => {
      const res = await chai.request(app)
        .put('/api/v1/profiles/john')
        .send({
          biodata: 'I love graphics design so much',
          image: 'https://res.cloudinary.com/pato/image/upload/v1539986467/n9usp2sumwxxmgiaogbd.png',
          address: 'Surulere, lagos',
          dateofbirth: '09-10-1990',
          token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwidXNlcm5hbWUiOiJKb2huRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.wvle5egYbTJBalR2fcDS6G5j5IYAv4psTF77MUa7dE0'
        });
      res.status.should.equal(401);
      res.body.should.be.a('object');
      res.body.should.have.property('errors');
      res.body.errors.should.have.property('body');
      res.body.errors.body[0].should.equal('You cannot edit another persons profile');
    });

    it('should return status code 200 on updating a users profile', async () => {
      const res = await chai.request(app)
        .put('/api/v1/profiles/wale')
        .send({
          biodata: 'I love graphics design so much',
          image: 'https://res.cloudinary.com/pato/image/upload/v1539986467/n9usp2sumwxxmgiaogbd.png',
          address: 'Surulere, lagos',
          dateofbirth: '09-10-1990',
          token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJ3YWxlIiwiaWF0IjoxNTQ0NTQ2ODAyfQ.q0X2FFO1ieBSIMGrvcVPdb-G_uSrglyJwrUssNUvG_I'
        });
      res.status.should.equal(200);
      res.body.should.be.a('object');
      res.body.should.have.property('message');
      res.body.should.have.property('profile');
      res.body.message.should.equal('Users profile updated successfully');
    });
  });
});
