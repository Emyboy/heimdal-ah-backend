import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.use(chaiHttp);
chai.should();


chai.use(chaiHttp);

describe('/likes', () => {
  const fakeToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjg3LCJ1c2VybmFtZSI6ImpvZWRlb28ifQ.E1SOwBDBq5oAJRAgziQFKm6PeJUcnYgVXusw3EC54jc';
  let userToken;
  before(async () => {
    const userData = {
      email: 'publisherb@heimdal.com',
      password: '12345678heimdal',
    };
    const userResponse = await chai.request(app)
      .post('/api/v1/auth/login')
      .send(userData);
    const { token } = userResponse.body;
    userToken = token;
  });

  it('should return status code 400 when user is not authenticated', async () => {
    const res = await chai
      .request(app)
      .get('/api/v1/articles/1/likes');

    res.status.should.equal(400);
    res.body.should.be.a('object');
  });

  it('should return a 401 when user not authenticated', async () => {
    const res = await chai
      .request(app)
      .post('/api/v1/articles/1/likes')
      .set('access-token', fakeToken);

    res.status.should.equal(401);
    res.body.should.be.a('object');
  });

  it('should return a 200 when an authenticated user likes an article', async () => {
    const res = await chai
      .request(app)
      .post('/api/v1/articles/1/likes')
      .set('access-token', userToken);

    res.status.should.equal(200);
    res.body.should.be.a('object');
    res.body.message.should.be.equal('like was successful');
  });

  it('should return a 200 when an authenticated user unlikes an article', async () => {
    const res = await chai
      .request(app)
      .post('/api/v1/articles/1/likes')
      .set('access-token', userToken);

    res.status.should.equal(200);
    res.body.should.be.a('object');
    res.body.message.should.be.equal('Unlike was succesful');
  });

  it('should return a 404 when article is not avaliable', async () => {
    const res = await chai
      .request(app)
      .post('/api/v1/articles/2000/likes')
      .set('access-token', userToken);

    res.status.should.equal(404);
    res.body.should.be.a('object');
  });

  it('should return a 200 when an authenticated likes an article', async () => {
    const res = await chai
      .request(app)
      .get('/api/v1/articles/1/likes')
      .set('access-token', userToken);

    res.status.should.equal(200);
    res.body.should.be.a('object');
  });

  it('should return a 401 when user is not authenticated', async () => {
    const res = await chai
      .request(app)
      .get('/api/v1/articles/1/likes')
      .set('access-token', fakeToken);

    res.status.should.equal(401);
    res.body.should.be.a('object');
  });


  it('should return a 200 when a registered user likes a comment', async () => {
    const res = await chai
      .request(app)
      .post('/api/v1/articles/1/comments/1/likes')
      .set('access-token', userToken);

    res.status.should.equal(200);
    res.body.should.be.a('object');
    res.body.message.should.be.equal('like was successful');
  });

  it('should return a 200 when a registered user UNlikes a comment', async () => {
    const res = await chai
      .request(app)
      .post('/api/v1/articles/1/comments/1/likes')
      .set('access-token', userToken);

    res.status.should.equal(200);
    res.body.should.be.a('object');
    res.body.message.should.be.equal('Unlike was succesful');
  });

  it('should return a 200 when article and comment and article are in the database', async () => {
    const res = await chai
      .request(app)
      .get('/api/v1/articles/1/comments/1/likes')
      .set('access-token', userToken);

    res.status.should.equal(200);
    res.body.should.be.a('object');
  });

  it('should return a 404 when comment is not found', async () => {
    const res = await chai
      .request(app)
      .get('/api/v1/articles/1/comments/19900/likes')
      .set('access-token', userToken);

    res.status.should.equal(404);
    res.body.should.be.a('object');
  });

  it('should return a 401 when a user is not authenticated', async () => {
    const res = await chai
      .request(app)
      .get('/api/v1/articles/1/comments/1/likes')
      .set('access-token', fakeToken);

    res.status.should.equal(401);
    res.body.should.be.a('object');
  });
});
