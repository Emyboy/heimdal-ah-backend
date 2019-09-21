import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import app from '../index';
import ReadingStatsModelQuery from '../lib/ReadingStatsModelQuery';

dotenv.config();
chai.use(chaiHttp);
chai.should();

describe('Reader Stats', () => {
  let userToken;
  before(async () => {
    const userData = {
      email: 'publisherb@heimdal.com',
      password: '12345678heimdal',
    };
    const userResponse = await chai
      .request(app)
      .post('/api/v1/auth/login')
      .send(userData);
    const { token } = userResponse.body;
    userToken = token;
  });
  const getArticle = '/api/v1/articles/4';
  const readerStatUrl = '/api/v1/users/readerstats';
  const articleWrongUrl = '/api/v1/articles/88';

  it('it should return a 404 if the user has no stats', async () => {
    const user2 = {
      email: 'tia@heimdal.com',
      password: 'thisisandela123',
      username: 'seun'
    };
    const userResponse = await chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(user2);
    const { token } = userResponse.body;
    const res = await chai.request(app)
      .get('/api/v1/users/readerstats')
      .set('access-token', token);
    res.status.should.equal(404);
    res.body.should.be.a('object');
    res.body.should.have.property('message');
    res.body.message.should.equal('Statistics not found for this user');
  });

  it('it should return 404 if an article does not exist', async () => {
    const res = await chai.request(app)
      .get(articleWrongUrl)
      .set('access-token', userToken);
    res.status.should.equal(404);
    res.body.should.be.a('object');
    res.body.should.have.property('message');
    res.body.message.should.equal('Could not find article');
  });

  it('should create a reading statictics', async () => {
    const decodedUser = jwt.decode(userToken);
    const res = await chai.request(app)
      .get(getArticle)
      .set('access-token', userToken);
    const { id } = res.body.article;
    const readInfo = {
      articleId: id,
      userId: decodedUser.userId
    };
    const statResult = await ReadingStatsModelQuery.createReaderStats(readInfo);
    res.body.article.should.be.a('object');
    statResult.should.be.a('object');
    statResult.userId.should.equal(decodedUser.userId);
    statResult.articleId.should.equal(id);
  });

  it('should not re-create another stat but update the timeViewed when an article is revisited', async () => {
    const decodedUser = jwt.decode(userToken);
    const res = await chai.request(app)
      .get(getArticle)
      .set('access-token', userToken);
    const { id } = res.body.article;
    const readInfo = {
      articleId: id,
      userId: decodedUser.userId
    };
    const statResult = await ReadingStatsModelQuery.createReaderStats(readInfo);
    res.body.article.should.be.a('object');
    statResult.should.be.a('object');
    statResult.timeVisited.should.not.be.equal(statResult.createdAt);
  });

  it('should return a user reading stats', async () => {
    const res = await chai.request(app)
      .get(readerStatUrl)
      .set('access-token', userToken);
    res.status.should.equal(200);
    res.body.should.be.a('object');
    res.body.should.have.property('message');
    res.body.should.have.property('articles');
    res.body.articles.should.be.a('array');
  });
});
