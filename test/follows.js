import chai from 'chai';
import chaiHttp from 'chai-http';
import db from '../models';
import app from '../index';
import getToken from '../helpers/getToken';

const { users } = db;
chai.use(chaiHttp);

chai.use(chaiHttp);
chai.should();

describe('Test To Follow, Unfollow user, View Followes, and view following', async () => {
  let token;
  //   let id;
  let user;
  before(async () => {
    const userInfo = {
      username: 'sunny',
      password: 'sunny12345',
      email: 'sunny@gmail.com'
    };
    user = await users.create(userInfo);
    token = getToken(user.id, user.username);
    // ({ id } = user);
  });

  describe('Test to login an existing user', () => {
    it('should return 200 on following a user', async () => {
      const res = await chai
        .request(app)
        .post('/api/v1/users/2/follow')
        .set('access-token', token);
      res.status.should.equal(200);
      res.body.should.have.a('object');
    });
    it('should return 200 on getting all followers', async () => {
      const res = await chai
        .request(app)
        .get('/api/v1/users/followers')
        .set('access-token', token);
      res.status.should.equal(200);
      res.body.should.have.a('object');
    });

    it('should return 200 on getting all users following you', async () => {
      const res = await chai
        .request(app)
        .get('/api/v1/users/following')
        .set('access-token', token);
      res.status.should.equal(200);
      res.body.should.have.a('object');
    });

    it('should return 200 on unfollowing a users', async () => {
      const res = await chai
        .request(app)
        .post('/api/v1/users/2/unfollow')
        .set('access-token', token);
      res.status.should.equal(200);
      res.body.should.have.a('object');
      //   console.log(res.body);
      res.body.should.have.property('message');
    });
  });
});
