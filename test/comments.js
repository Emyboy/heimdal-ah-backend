import chai from 'chai';
import chaiHttp from 'chai-http';
import Chance from 'chance';
import app from '../index';

const chance = Chance();
chai.use(chaiHttp);
chai.should();

describe('Comment Validation and Creation', () => {
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
  const postCommentUrl = '/api/v1/articles/1/comments';
  const artcleIdNaN = '/api/v1/articles/1asa/comments';
  const commentIdNaN = '/api/v1/articles/1/comments/1asas';

  it('should return an error if the content value is empty', async () => {
    const contentDataWithEmpty = {
      content: ''
    };
    const res = await chai.request(app)
      .post(postCommentUrl)
      .set('access-token', userToken)
      .send(contentDataWithEmpty);
    res.status.should.equal(400);
    res.body.should.be.a('object');
    res.body.should.have.property('errors');
    res.body.errors.should.be.a('object');
    res.body.errors.should.have.property('content');
    res.body.errors.content.msg.should.equal('Please enter the comment content');
  });

  it('should return an error if the article Id is not an integer', async () => {
    const commentData = {
      content: chance.sentence({ words: 20 }),
      articleId: 1,
      userId: 1
    };
    const res = await chai.request(app)
      .post(artcleIdNaN)
      .set('access-token', userToken)
      .send(commentData);
    res.status.should.equal(400);
    res.body.should.be.a('object');
    res.body.should.have.property('errors');
    res.body.errors.should.be.a('object');
    res.body.errors.should.have.property('articleId');
    res.body.errors.articleId.msg.should.equal('Article Id must be an Integer');
  });

  it('should return an error if the content value is too long', async () => {
    const contentDataWithEmpty = {
      content: chance.sentence({ words: 1000 })
    };
    const res = await chai.request(app)
      .post(postCommentUrl)
      .set('access-token', userToken)
      .send(contentDataWithEmpty);
    res.status.should.equal(400);
    res.body.should.be.a('object');
    res.body.should.have.property('errors');
    res.body.errors.should.be.a('object');
    res.body.errors.should.have.property('content');
    res.body.errors.content.msg.should.equal('Content Length cannot be more than 1500 characters');
  });

  it('should return an error if the article does not exist in the database', async () => {
    const contentDataWithEmpty = {
      content: chance.sentence({ words: 20 })
    };
    const falseId = 500;
    const res = await chai.request(app)
      .get(`/api/v1/articles/${falseId}/comments`)
      .set('access-token', userToken)
      .send(contentDataWithEmpty);
    res.status.should.equal(404);
    res.body.should.be.a('object');
    res.body.should.have.property('message');
    res.body.message.should.equal('Could not find article');
  });

  it('should return an error if the comment does not exist in the database', async () => {
    const res = await chai.request(app)
      .delete(`/api/v1/articles/1/comments/${500}`)
      .set('access-token', userToken);
    res.status.should.equal(404);
    res.body.should.be.a('object');
    res.body.should.have.property('message');
    res.body.message.should.equal('No Comment exist');
  });

  it('it should return a success for successful creation of a public comment', async () => {
    const commentData = {
      content: chance.sentence({ words: 20 }),
    };
    const res = await chai.request(app)
      .post('/api/v1/articles/1/comments')
      .set('access-token', userToken)
      .send(commentData);
    res.status.should.equal(201);
    res.body.should.be.a('object');
    res.body.should.have.property('message');
    res.body.message.should.equal('Comment has been successfully created');
  });

  it('it should return a success for successful creation of a private comment', async () => {
    const commentData = {
      content: chance.sentence({ words: 20 }),
      isPrivate: true
    };
    const res = await chai.request(app)
      .post('/api/v1/articles/1/comments')
      .set('access-token', userToken)
      .send(commentData);
    res.status.should.equal(201);
    res.body.should.be.a('object');
    res.body.should.have.property('message');
    res.body.message.should.equal('Comment has been successfully created');
  });

  it('it should return a success for listing out comment when the user is the article creator', async () => {
    const userData = {
      email: 'admin@heimdal.com',
      password: '12345678heimdal',
    };
    const userResponse = await chai
      .request(app)
      .post('/api/v1/auth/login')
      .send(userData);
    const { token } = userResponse.body;
    const res = await chai.request(app)
      .get('/api/v1/articles/1/comments')
      .set('access-token', token);
    res.status.should.equal(200);
    res.body.should.be.a('object');
    res.body.should.have.property('message');
    res.body.message.should.equal('All Comment for the Article');
  });

  it('it should return a success for successful listing of the comment', async () => {
    const res = await chai.request(app)
      .get('/api/v1/articles/1/comments')
      .set('access-token', userToken);
    res.status.should.equal(200);
    res.body.should.be.a('object');
    res.body.should.have.property('message');
    res.body.message.should.equal('All Comment for the Article');
  });

  it('should return an error if the comment Id is not an integer', async () => {
    const commentData = {
      content: chance.sentence({ words: 20 }),
      articleId: 1,
      userId: 1
    };
    const res = await chai.request(app)
      .delete(commentIdNaN)
      .set('access-token', userToken)
      .send(commentData);
    res.status.should.equal(400);
    res.body.should.be.a('object');
    res.body.should.have.property('errors');
    res.body.errors.should.be.a('object');
    res.body.errors.should.have.property('commentId');
    res.body.errors.commentId.msg.should.equal('Comment Id must be an Integer');
  });

  it('should return 201 when making a comment private', async () => {
    const commentData = {
      content: chance.sentence({ words: 20 }),
      articleId: 1,
      userId: 1,
      isPrivate: true
    };
    const res = await chai.request(app)
      .post('/api/v1/articles/1/comments')
      .set('access-token', userToken)
      .send(commentData);
    res.status.should.equal(201);
    res.body.should.be.a('object');
    res.body.should.have.property('message');
    res.body.message.should.equal('Comment has been successfully created');
  });

  it('should return 200 to get a public comment', async () => {
    const res = await chai.request(app)
      .get('/api/v1/articles/2/comments')
      .set('access-token', userToken);
    res.status.should.equal(200);
    res.body.should.be.a('object');
    res.body.should.have.property('message');
    res.body.message.should.equal('All Comment for the Article');
  });

  it('it should return a success for successful deletion of a comment', async () => {
    const data = {
      isArchived: true
    };
    const res = await chai.request(app)
      .delete('/api/v1/articles/1/comments/3')
      .set('access-token', userToken)
      .send(data);
    res.status.should.equal(200);
    res.body.should.be.a('object');
    res.body.should.have.property('message');
    res.body.message.should.equal('Successfully deleted');
  });
});
