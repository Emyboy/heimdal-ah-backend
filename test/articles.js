import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import bodyHelper from './bodyHelper';

chai.use(chaiHttp);

describe('Test for articles controller', () => {
  let userToken;
  before(async () => {
    const userData = {
      email: 'publisherb@heimdal.com',
      password: '12345678heimdal'
    };
    const userResponse = await chai
      .request(app)
      .post('/api/v1/auth/login')
      .send(userData);
    const { token } = userResponse.body;
    userToken = token;
  });

  describe('Test for creating new articles POST/ api/v1/articles', () => {
    it('should return error if no input field is provided', async () => {
      const res = await chai
        .request(app)
        .post('/api/v1/articles')
        .set('access-token', userToken)
        .send();
      res.status.should.equal(400);
      res.body.should.have.a('object');
      res.body.errors.title.msg.should.equal('title cannot be empty');
      res.body.errors.description.msg.should.equal('description cannot be empty');
    });

    it('should return 201 on successful creation of articles', async () => {
      const res = await chai
        .request(app)
        .post('/api/v1/articles')
        .set('access-token', userToken)
        .send({
          title: 'This is a title',
          description: 'This is a description',
          body: ' his is a powerful article',
          image: 'www.image'
        });
      res.status.should.equal(201);
      res.body.should.have.a('object');
      res.body.should.have.property('message');
      res.body.message.should.equal('Article successfully created');
      bodyHelper.article = res.body.article;
    });

    it('should return 400 if the tags sent are not an array of tags', async () => {
      const res = await chai
        .request(app)
        .post('/api/v1/articles')
        .set('access-token', userToken)
        .send({
          title: 'This is a title',
          description: 'This is a description',
          body: ' his is a powerful article',
          image: 'www.image',
          tags: '1, 2, 4'
        });
      res.status.should.equal(400);
      res.body.should.have.a('object');
      res.body.should.have.property('message');
      res.body.message.should.equal('Tags should be an array containing tag names');
    });

    it('should return 400 if the number of tags sent exceeds 7', async () => {
      const res = await chai
        .request(app)
        .post('/api/v1/articles')
        .set('access-token', userToken)
        .send({
          title: 'This is a title',
          description: 'This is a description',
          body: ' his is a powerful article',
          image: 'www.image',
          tags: ['bag', 'food', 'grap', '1', '2', '3', '4', '5']
        });
      res.status.should.equal(400);
      res.body.should.have.a('object');
      res.body.should.have.property('message');
      res.body.message.should.equal('You can only add a maximum of 7 tags');
    });
  });

  describe('Test for fetching a single article GET/ api/v1/articles/:slug', () => {
    it('should return 404 if an article is not found', async () => {
      const res = await chai
        .request(app)
        .get('/api/v1/articles/88')
        .set('access-token', userToken);
      res.status.should.equal(404);
      res.body.should.have.a('object');
      res.body.message.should.equal('Could not find article');
    });

    it('should return status code 400 if article id is not an integer', async () => {
      const res = await chai.request(app)
        .get('/api/v1/articles/nm')
        .set('access-token', userToken);
      res.status.should.equal(400);
      res.body.should.be.a('object');
      res.body.should.have.property('errors');
      res.body.errors.identifier.should.have.property('msg');
    });

    it('should return 200 on successful retrieval of an article', async () => {
      const res = await chai
        .request(app)
        .get('/api/v1/articles/1')
        .set('access-token', userToken);
      res.status.should.equal(200);
      res.body.should.have.a('object');
      res.body.should.have.property('message');
      res.body.message.should.equal('success');
    });
  });

  describe('Test for fetching all articles GET/ api/v1/articles', () => {
    it('should return 200 on successful retrieval of articles', async () => {
      const res = await chai
        .request(app)
        .get('/api/v1/articles')
        .set('access-token', userToken);
      res.status.should.equal(200);
      res.body.should.have.a('object');
      res.body.should.have.property('message');
      res.body.message.should.equal('List of articles');
    });
  });

  describe('Test for updating an article PUT/ api/v1/articles:slug', () => {
    it('should return 404 if article to be edited is not found', async () => {
      const res = await chai
        .request(app)
        .put('/api/v1/articles/50')
        .set('access-token', userToken)
        .send({
          title: 'This is a title'
        });
      res.status.should.equal(404);
      res.body.should.have.a('object');
      res.body.message.should.equal('Could not find article');
    });
    it('should return 403 if user tries to edit article authored by a different user', async () => {
      const res = await chai
        .request(app)
        .put('/api/v1/articles/1')
        .set('access-token', userToken)
        .send({
          title: 'This is a title',
          description: 'This is a description',
          body: 'this is a powerful article'
        });
      res.status.should.equal(403);
      res.body.should.have.a('object');
      res.body.message.should.equal('Request denied');
    });
    it('should return 200 on successful update of article', async () => {
      const res = await chai
        .request(app)
        .put('/api/v1/articles/5')
        .set('access-token', userToken)
        .send({
          title: 'This is a title',
          description: 'This is a description',
          body: ' this is a powerful article'
        });
      res.status.should.equal(200);
      res.body.should.have.a('object');
      res.body.should.have.property('message');
      res.body.message.should.equal('Article updated successfully, some highlights were adjusted or removed');
    });
  });

  describe('Test for deleting articles DELETE/ api/v1/articles:identifier', () => {
    it('should return 404 if article to be deleted is not found', async () => {
      const res = await chai
        .request(app)
        .delete('/api/v1/articles/50')
        .set('access-token', userToken);
      res.status.should.equal(404);
      res.body.should.have.a('object');
      res.body.message.should.equal('Could not find article');
    });
    it('should return 403 if user tries to archive an article authored by a different user', async () => {
      const res = await chai
        .request(app)
        .delete('/api/v1/articles/1')
        .set('access-token', userToken);
      res.status.should.equal(403);
      res.body.should.have.a('object');
      res.body.message.should.equal('Request denied');
    });
    it('should return 200 on successful archiving an article', async () => {
      const res = await chai
        .request(app)
        .delete('/api/v1/articles/5')
        .set('access-token', userToken);
      res.status.should.equal(200);
      res.body.should.have.a('object');
      res.body.should.have.property('message');
      res.body.message.should.equal('Article deleted(archived) successfully');
    });
  });
});
