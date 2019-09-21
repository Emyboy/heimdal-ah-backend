import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.use(chaiHttp);
chai.should();

chai.use(chaiHttp);

describe('/Notifications', () => {
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

  it('should return a 401 when user tries to access notification thats does not belong to them', async () => {
    const res = await chai
      .request(app)
      .get('/api/v1/users/34/notifications')
      .set('access-token', userToken);

    res.status.should.equal(401);
    res.body.should.be.a('object');
    res.body.message.should.be.equal('access cannot be granted');
  });

  it('should return a 200 when user tries to access notification that belongs to them', async () => {
    const res = await chai
      .request(app)
      .get('/api/v1/users/5/notifications')
      .set('access-token', userToken);

    res.status.should.equal(200);
    res.body.should.be.a('object');
  });

  it('should return a 401 when user tries to access a single notification thats does not belong to them', async () => {
    const res = await chai
      .request(app)
      .get('/api/v1/users/56/21/notifications')
      .set('access-token', userToken);

    res.status.should.equal(401);
    res.body.should.be.a('object');
    res.body.message.should.be.equal('access cannot be granted');
  });

  it('should return a 404 when user tries to get notification that does not exist', async () => {
    const res = await chai
      .request(app)
      .get('/api/v1/users/5/21/notifications')
      .set('access-token', userToken);

    res.status.should.equal(404);
    res.body.should.be.a('object');
    res.body.message.should.be.equal('notification was found');
  });

  it('should return a 200 when user updates a notification', async () => {
    const res = await chai
      .request(app)
      .put('/api/v1/users/5/1/notifications')
      .set('access-token', userToken);

    res.status.should.equal(200);
    res.body.should.be.a('object');
  });
});
