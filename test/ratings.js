import chai from 'chai';
import chaiHttp from 'chai-http';
// import jwtDecode from 'jwt-decode';
import app from '../index';

chai.use(chaiHttp);
chai.should();

const userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoid2FsZSIsImlhdCI6MTU0NDY4NDgxMH0.9KcL0YzJF8w7vZO6APgVEMeIQjtqQW05JqIi5piaBHI';
// let articlesId;

describe('Heimdal Test Suite', () => {
  // ==== Give a rating to an article ==== //
  describe(' POST /ratings/articles/:articleId - Give a rating to an article', () => {
    it('should return status code 201 on user rating an article', async () => {
      const res = await chai.request(app)
        .post('/api/v1/ratings/articles/1')
        .set('access-token', userToken)
        .send({
          userId: 1,
          stars: 4
        });
      res.status.should.equal(201);
      res.body.should.be.a('object');
      res.body.should.have.property('message');
      res.body.should.have.property('ratings');
      res.body.message.should.equal('Users ratings on this article recorded succesfully');
    });

    it('should return status code 400 if no token is provided', async () => {
      const res = await chai.request(app)
        .post('/api/v1/ratings/articles/1')
        .set('access-token', '')
        .send({
          userId: 1,
          stars: 4
        });
      res.status.should.equal(400);
      res.body.should.be.a('object');
      res.body.should.have.property('message');
      res.body.should.have.property('errors');
      res.body.message.should.equal('You did not provide any token, please enter token, then retry');
    });

    it('should return status code 401 if token provided is invalid', async () => {
      const res = await chai.request(app)
        .post('/api/v1/ratings/articles/1')
        .set('access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ._kgewreaeki8_kNXtPCbilKgvkocJxKodpmqer9YpMo')
        .send({
          userId: 1,
          stars: 4
        });
      res.status.should.equal(401);
      res.body.should.be.a('object');
      res.body.should.have.property('errors');
      res.body.errors.body[0].should.equal('User token not authenticated, wrong token');
    });

    it('should return status code 400 if article id is not an integer', async () => {
      const res = await chai.request(app)
        .post('/api/v1/ratings/articles/this-is-a-post-title-l78hgybf')
        .set('access-token', userToken)
        .send({
          userId: 1,
          stars: 4
        });
      res.status.should.equal(400);
      res.body.should.be.a('object');
      res.body.should.have.property('errors');
      res.body.errors.should.have.property('body');
      res.body.errors.body[0].should.equal('Articles Id must be an integer');
    });


    it('should return status code 400 if no star rating is provided', async () => {
      const res = await chai.request(app)
        .post('/api/v1/ratings/articles/1')
        .set('access-token', userToken)
        .send({
          userId: 1,
          stars: ''
        });
      res.status.should.equal(400);
      res.body.should.be.a('object');
      res.body.should.have.property('errors');
      res.body.errors.body[0].should.equal('Invalid input');
    });
  });

  // ==== Get all ratings for an article ==== //
  describe(' GET /ratings/articles/:articleId - Get all ratings for an article', () => {
    before(async () => {
      await chai.request(app)
        .post('/api/v1/ratings/articles/1')
        .set('access-token', userToken)
        .send({
          userId: 1,
          stars: 4
        });
    });
    it('should return status code 200 on getting all ratings for an article', async () => {
      const res = await chai.request(app)
        .get('/api/v1/ratings/articles/1');
      res.status.should.equal(200);
      res.body.should.be.a('object');
      res.body.should.have.property('message');
      res.body.should.have.property('ratings');
      res.body.message.should.equal('Ratings on this article returned succesfully');
    });

    it('should return status code 404 if no ratings is found for an article', async () => {
      const res = await chai.request(app)
        .get('/api/v1/ratings/articles/2');
      res.status.should.equal(404);
      res.body.should.be.a('object');
      res.body.should.have.property('message');
      res.body.should.have.property('ratings');
      res.body.message.should.equal('No Ratings found for this article');
    });
  });
});
