import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.use(chaiHttp);
chai.should();

describe('Heimdal Search and Filter Test Suite', () => {
  // ==== Search for an article ==== //
  describe(' GET /articles_search/author?author=john - Search for an article by an author', () => {
    it('should return status code 200 on finding articles by author', async () => {
      const res = await chai.request(app)
        .get('/api/v1/articles_search/author?author=john');
      res.status.should.equal(200);
      res.body.should.be.a('object');
      res.body.should.have.property('message');
      res.body.should.have.property('articles');
      res.body.message.should.equal('All Articles returned succesfully');
    });

    it('should return status code 404 on not finding an author', async () => {
      const res = await chai.request(app)
        .get('/api/v1/articles_search/author?author=1234545');
      res.status.should.equal(404);
      res.body.should.be.a('object');
      res.body.should.have.property('message');
      res.body.message.should.equal('No such author');
    });

    it('should return status code 404 on not finding articles by author', async () => {
      const res = await chai.request(app)
        .get('/api/v1/articles_search/author?author=user1');
      res.status.should.equal(404);
      res.body.should.be.a('object');
      res.body.should.have.property('message');
      res.body.should.have.property('articles');
      res.body.message.should.equal('No Articles found');
    });
  });
  describe(' GET /articles_search/title?title=This is the third post title - Search for an article by title', () => {
    it('should return status code 200 on finding articles by title', async () => {
      const res = await chai.request(app)
        .get('/api/v1/articles_search/title?title=This is the third post title');
      res.status.should.equal(200);
      res.body.should.be.a('object');
      res.body.should.have.property('message');
      res.body.should.have.property('articles');
      res.body.message.should.equal('Articles with this title returned succesfully');
    });

    it('should return status code 404 for articles title that does not exist', async () => {
      const res = await chai.request(app)
        .get('/api/v1/articles_search/title?title=articletitledoesnotexist');
      res.status.should.equal(404);
      res.body.should.be.a('object');
      res.body.should.have.property('message');
      res.body.should.have.property('articles');
      res.body.message.should.equal('No Articles with such title');
    });
  });

  describe(' GET /articles_search/tag?tag=angular - Search for an article by tags', () => {
    it('should return status code 200 on finding articles by tags', async () => {
      const res = await chai.request(app)
        .get('/api/v1/articles_search/tag?tag=angular');
      res.status.should.equal(200);
      res.body.should.be.a('object');
      res.body.should.have.property('message');
      res.body.should.have.property('articles');
      res.body.message.should.equal('All Articles using these tags returned succesfully');
    });

    it('should return status code 404 if articles do not exist that have such tags ', async () => {
      const res = await chai.request(app)
        .get('/api/v1/articles_search/tag?tag=§zxj');
      res.status.should.equal(404);
      res.body.should.be.a('object');
      res.body.should.have.property('message');
      res.body.message.should.equal('No Articles with such tags');
    });
  });
});
