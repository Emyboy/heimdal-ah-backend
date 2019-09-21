import chai from 'chai';
import chaiHttp from 'chai-http';
// import jwtDecode from 'jwt-decode';
import app from '../../index';

chai.use(chaiHttp);
chai.should();


// let articlesId;
describe('Heimdal Middleware Report Controller Test', () => {
  const userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoid2FsZSIsImlhdCI6MTU0NDY4NDgxMH0.9KcL0YzJF8w7vZO6APgVEMeIQjtqQW05JqIi5piaBHI';
  describe(' POST /articles/:identifier/report - A user should be able to report an article', () => {
    it('should return status code 400 on reporting an article with invalid reportType parameters', async () => {
      const res = await chai.request(app)
        .post('/api/v1/articles/1/reports')
        .set('access-token', userToken)
        .send({
          context: 'This article na scam',
          reportType: 'spamjd',
        });
      res.status.should.equal(400);
      res.body.should.be.a('object');
      res.body.should.have.property('message');
      res.body.message.should.equal('please enter a valid report type');
    });
  });

  it('should return status code 500 on reporting an article with invalid context parameters', async () => {
    const res = await chai.request(app)
      .post('/api/v1/articles/1/reports')
      .set('access-token', userToken)
      .send({
        context: ['helo'],
        reportType: 'spam',
      });
    res.status.should.equal(500);
    res.body.should.be.a('object');
    res.body.should.have.property('message');
  });
  it('should return status code 400 on reporting an article with invalid context parameters', async () => {
    const res = await chai.request(app)
      .post('/api/v1/articles/1/reports')
      .set('access-token', userToken)
      .send({
        context: null,
        reportType: 'spam',
      });
    res.status.should.equal(400);
    res.body.should.be.a('object');
    res.body.should.have.property('message');
    res.body.message.should.equal('please enter a valid context');
  });
});
