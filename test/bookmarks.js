import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.use(chaiHttp);
chai.should();

describe('/bookmarks', () => {
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

  it('should return status code 400 when user is not logged in', async () => {
    const res = await chai
      .request(app)
      .get('/api/v1/articles/bookmarks/all');

    res.status.should.equal(400);
    res.body.should.be.a('object');
  });

  it('should return status code 40 when user is not logged in', async () => {
    const res = await chai
      .request(app)
      .get('/api/v1/articles/bookmarks/search?q=this-is-trd-post-title-u87ddsa')
      .set('access-token', userToken);
    res.status.should.equal(200);
    res.body.should.be.a('object');
  });

  it('should return a 401 when user is not avaliable', async () => {
    const res = await chai
      .request(app)
      .post('/api/v1/articles/1/bookmarks')
      .set('access-token', fakeToken);

    res.status.should.equal(401);
    res.body.should.be.a('object');
  });

  it('should return 200 when user is logged in', async () => {
    const res = await chai
      .request(app)
      .post('/api/v1/articles/1/bookmarks')
      .set('access-token', userToken);

    res.status.should.equal(200);
    res.body.should.be.a('object');
    res.body.message.should.be.equal('hurray! bookmark was added successfully');
  });

  it('should return a 404 when article is not avaliable', async () => {
    const res = await chai
      .request(app)
      .post('/api/v1/articles/67/bookmarks')
      .set('access-token', userToken);

    res.status.should.equal(404);
    res.body.should.be.a('object');
    res.body.message.should.be.equal('Could not find article');
  });

  it('should return status code 200 when user is logged in', async () => {
    const res = await chai
      .request(app)
      .get('/api/v1/articles/bookmarks/all')
      .set('access-token', userToken);

    res.status.should.equal(200);
    res.body.should.be.a('object');
  });

  it('should return should return a 200 when bookmark to be deleted is avaliable', async () => {
    const res = await chai
      .request(app)
      .delete('/api/v1/articles/bookmarks/1')
      .set('access-token', userToken);

    res.status.should.equal(200);
    res.body.should.be.a('object');
    res.body.message.should.be.equal('bookmark was deleted successfully');
  });

  it('should return should return a 404 when bookmark to be deleted is not avaliable', async () => {
    const res = await chai
      .request(app)
      .delete('/api/v1/articles/bookmarks/6756')
      .set('access-token', userToken);

    res.status.should.equal(404);
    res.body.should.be.a('object');
    res.body.message.should.be.equal('bookmark was not found');
  });
});
