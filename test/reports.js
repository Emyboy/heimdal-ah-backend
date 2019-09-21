import chai from 'chai';
import chaiHttp from 'chai-http';
// import jwtDecode from 'jwt-decode';
import app from '../index';

chai.use(chaiHttp);
chai.should();

const userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoid2FsZSIsImlhdCI6MTU0NDY4NDgxMH0.9KcL0YzJF8w7vZO6APgVEMeIQjtqQW05JqIi5piaBHI';
// let articlesId;
describe('Heimdal Report Controller Test', () => {
  describe(' POST /articles/:identifier/report - A user should be able to report an article', () => {
    it('should return status code 201 on reporting an article', async () => {
      const res = await chai.request(app)
        .post('/api/v1/articles/1/reports')
        .set('access-token', userToken)
        .send({
          context: 'This article na scam',
          reportType: 'spam',
        });
      res.status.should.equal(201);
      res.body.should.be.a('object');
      res.body.should.have.property('message');
      res.body.message.should.equal('You have succesfully reported an article');
    });
  });
});
