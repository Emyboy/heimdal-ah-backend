import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../index';
import bodyHelper from './bodyHelper';

chai.use(chaiHttp);

chai.use(chaiHttp);
chai.should();

chai.use(chaiHttp);
chai.should();

describe('Test For HighLights', () => {
  describe('POST /api/v1/articles/:articleId/highlight', () => {
    it('should return 400 when the highlighted text is undefined', async () => {
      const data = {
        highlightedText: undefined
      };
      const res = await chai
        .request(app)
        .post(`/api/v1/articles/${bodyHelper.article.id}/highlight`)
        .send(data)
        .set('access-token', bodyHelper.userToken);
      res.status.should.equal(400);
      res.body.should.be.a('object');
      res.body.should.have.property('message');
      res.body.message.should.equal('Please highlight a text and try again.');
    });
    it('should return 400 when the highlighted text is not contained in the body of the article', async () => {
      const data = {
        highlightedText: 'This is a random highlighted text that is not inside the article body'
      };
      const res = await chai
        .request(app)
        .post(`/api/v1/articles/${bodyHelper.article.id}/highlight`)
        .send(data)
        .set('access-token', bodyHelper.userToken);

      res.status.should.equal(400);
      res.body.should.be.a('object');
      res.body.should.have.property('message');
      res.body.message.should.equal('You can not highlight or comment on this text as it does not exist within the article');
    });

    it('should return 200 when the highlighted text is contained in the body of the article', async () => {
      const data = {
        highlightedText: bodyHelper.article.body
      };
      const res = await chai
        .request(app)
        .post(`/api/v1/articles/${bodyHelper.article.id}/highlight`)
        .send(data)
        .set('access-token', bodyHelper.userToken);

      res.status.should.equal(201);
      res.body.should.be.a('object');
      res.body.should.have.property('message');
      res.body.message.should.equal('You successfully highlighted a section of this article');
      bodyHelper.highlights = res.body.createdHighlight;
    });
  });

  describe('GET /api/v1/articles/:articleId/highlights', () => {
    it('should return all the highlights belonging to an article', async () => {
      const res = await chai
        .request(app)
        .get(`/api/v1/articles/${bodyHelper.article.id}/highlights`);
      res.status.should.equal(200);
      res.body.should.be.a('object');
      res.body.should.have.property('message');
      res.body.message.should.equal('All highlights belonging to this article has been fetched successfully');
    });
  });

  describe('GET /api/v1/articles/:articleId/highlights/:highlightId/comments', () => {
    it('should return all the highlights belonging to an article', async () => {
      const res = await chai
        .request(app)
        .get(`/api/v1/articles/${bodyHelper.article.id}/highlights/${bodyHelper.highlights.highlightId}/comments`);
      res.status.should.equal(200);
      res.body.should.be.a('object');
      res.body.should.have.property('message');
      res.body.message.should
        .equal('All comments belonging to this highlight has been fetched successfully');
    });
  });

  describe('PUT /api/v1/articles/:articleId/highlights', () => {
    it('should return 400 when the highlightedPortions and/or body is not supplied', async () => {
      const data = {};
      const res = await chai
        .request(app)
        .put(`/api/v1/articles/${bodyHelper.article.id}/highlights`)
        .send(data)
        .set('access-token', bodyHelper.userToken);
      res.status.should.equal(400);
      res.body.should.be.a('object');
      res.body.should.have.property('message');
      res.body.message.should.be.an('array');
    });
    it('should return 400 when the highlightedPortions supplied is not an array', async () => {
      const data = { highlightedPortions: bodyHelper.highlights };
      const res = await chai
        .request(app)
        .put(`/api/v1/articles/${bodyHelper.article.id}/highlights`)
        .send(data)
        .set('access-token', bodyHelper.userToken);

      res.status.should.equal(400);
      res.body.should.be.a('object');
      res.body.should.have.property('message');
      res.body.message.should.be.an('array');
      res.body.message[0].should.equal('Highlighted portions supplied must be an array');
    });
    it('should return 200 when the updatedPortions is a valid array with all the necessary parameters', async () => {
      const data = { highlightedPortions: [bodyHelper.highlights] };
      const res = await chai
        .request(app)
        .put(`/api/v1/articles/${bodyHelper.article.id}/highlights`)
        .send(data)
        .set('access-token', bodyHelper.userToken);

      res.status.should.equal(200);
      res.body.should.be.a('object');
      res.body.should.have.property('message');
      res.body.message.should.equal('Highlight indexes have been updated');
    });
  });
});
