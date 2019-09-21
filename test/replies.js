import chai from 'chai';
import chaiHttp from 'chai-http';
import Chance from 'chance';
import app from '../index';

const chance = Chance();
chai.use(chaiHttp);
chai.should();

describe('Replies Validation and Creation', () => {
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
  const postReplyUrl = '/api/v1/comments/1/reply';
  const commentIdNaN = '/api/v1/comments/1aaa/reply';
  const replyIdNaN = '/api/v1/comments/1/reply/1fdssf';
  const commentDeleteNaN = '/api/v1/comments/1rerererer/reply/1';
  it('should return an error if the content value is empty', async () => {
    const contentDataWithEmpty = {
      content: ''
    };
    const res = await chai.request(app)
      .post(postReplyUrl)
      .set('access-token', userToken)
      .send(contentDataWithEmpty);
    res.status.should.equal(400);
    res.body.should.be.a('object');
    res.body.should.have.property('errors');
    res.body.errors.should.be.a('object');
    res.body.errors.should.have.property('content');
    res.body.errors.content.msg.should.equal('Please enter the reply content');
  });

  it('should return an error if the comment Id is not an integer when making a get request', async () => {
    const res = await chai.request(app)
      .get(commentIdNaN)
      .set('access-token', userToken);
    res.status.should.equal(400);
    res.body.should.be.a('object');
    res.body.should.have.property('errors');
    res.body.errors.should.be.a('object');
    res.body.errors.should.have.property('commentId');
    res.body.errors.commentId.msg.should.equal('Comment Id must be an Integer');
  });

  it('should return an error if the comment Id is not an integer when making a post request', async () => {
    const commentData = {
      content: chance.sentence({ words: 20 }),
      commentId: 1,
      userId: 1
    };
    const res = await chai.request(app)
      .post(commentIdNaN)
      .set('access-token', userToken)
      .send(commentData);
    res.status.should.equal(400);
    res.body.should.be.a('object');
    res.body.should.have.property('errors');
    res.body.errors.should.be.a('object');
    res.body.errors.should.have.property('commentId');
    res.body.errors.commentId.msg.should.equal('Comment Id must be an Integer');
  });

  it('should return an error if the content value is too long', async () => {
    const contentDataWithEmpty = {
      content: chance.sentence({ words: 1000 })
    };
    const res = await chai.request(app)
      .post(postReplyUrl)
      .set('access-token', userToken)
      .send(contentDataWithEmpty);
    res.status.should.equal(400);
    res.body.should.be.a('object');
    res.body.should.have.property('errors');
    res.body.errors.should.be.a('object');
    res.body.errors.should.have.property('content');
    res.body.errors.content.msg.should.equal('Content Length cannot be more than 1500 characters');
  });

  it('should return an error if the comment does not exist in the database', async () => {
    const contentDataWithEmpty = {
      content: chance.sentence({ words: 20 })
    };
    const falseId = 500;
    const res = await chai.request(app)
      .get(`/api/v1/comments/${falseId}/reply`)
      .set('access-token', userToken)
      .send(contentDataWithEmpty);
    res.status.should.equal(404);
    res.body.should.be.a('object');
    res.body.should.have.property('message');
    res.body.message.should.equal('No Comment exist');
  });

  it('should return an error if the reply does not exist in the database', async () => {
    const res = await chai.request(app)
      .delete(`/api/v1/comments/1/reply/${500}`)
      .set('access-token', userToken);
    res.status.should.equal(404);
    res.body.should.be.a('object');
    res.body.should.have.property('message');
    res.body.message.should.equal('Could not find reply');
  });

  it('it should return a success for successful creation of a reply', async () => {
    const commentData = {
      content: chance.sentence({ words: 20 }),
    };
    const res = await chai.request(app)
      .post(postReplyUrl)
      .set('access-token', userToken)
      .send(commentData);
    res.status.should.equal(201);
    res.body.should.be.a('object');
    res.body.should.have.property('message');
    res.body.message.should.equal('Reply has been successfully created');
  });

  it('it should return a success for successful listing of the reply', async () => {
    const res = await chai.request(app)
      .get(postReplyUrl)
      .set('access-token', userToken);
    res.status.should.equal(200);
    res.body.should.be.a('object');
    res.body.should.have.property('message');
    res.body.message.should.equal('All replies for the comment');
  });

  it('should return an error if the reply Id is not an integer', async () => {
    const res = await chai.request(app)
      .delete(replyIdNaN)
      .set('access-token', userToken);
    res.status.should.equal(400);
    res.body.should.be.a('object');
    res.body.should.have.property('errors');
    res.body.errors.should.be.a('object');
    res.body.errors.should.have.property('replyId');
    res.body.errors.replyId.msg.should.equal('Reply Id must be an Integer');
  });

  it('should return an error if the comment Id is not an integer when deleting a reply', async () => {
    const res = await chai.request(app)
      .delete(commentDeleteNaN)
      .set('access-token', userToken);
    res.status.should.equal(400);
    res.body.should.be.a('object');
    res.body.should.have.property('errors');
    res.body.errors.should.be.a('object');
    res.body.errors.should.have.property('commentId');
    res.body.errors.commentId.msg.should.equal('Comment Id must be an Integer');
  });

  it('it should return an error when it cannot update a reply', async () => {
    const data = {
      content: 'This is Andela'
    };
    const res = await chai.request(app)
      .put('/api/v1/comments/1/reply/1')
      .set('access-token', userToken)
      .send(data);
    res.status.should.equal(404);
    res.body.should.be.a('object');
    res.body.should.have.property('message');
    res.body.message.should.equal('Cannot update the reply');
  });

  it('it should return an a success when it updates a reply', async () => {
    const user = {
      email: 'admin@heimdal.com',
      password: '12345678heimdal'
    };
    const userResponse = await chai
      .request(app)
      .post('/api/v1/auth/login')
      .send(user);
    const { token } = userResponse.body;
    const data = {
      content: 'This is Andela'
    };
    const res = await chai.request(app)
      .put('/api/v1/comments/1/reply/1')
      .set('access-token', token)
      .send(data);
    res.status.should.equal(200);
    res.body.should.be.a('object');
    res.body.should.have.property('message');
    res.body.message.should.equal('Succesfully updated the reply');
  });

  it('it should return a success for successful deletion of a comment', async () => {
    const data = {
      isArchived: true
    };
    const res = await chai.request(app)
      .delete('/api/v1/comments/1/reply/1')
      .set('access-token', userToken)
      .send(data);
    res.status.should.equal(200);
    res.body.should.be.a('object');
    res.body.should.have.property('message');
    res.body.message.should.equal('Successfully deleted');
  });
});
