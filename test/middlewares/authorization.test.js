/* eslint-disable no-underscore-dangle */
import chai from 'chai';
import chaiHttp from 'chai-http';
import httpMocks from 'node-mocks-http';
import { admin, publishAcess } from '../../middlewares/authorization';

chai.use(chaiHttp);
chai.should();

describe('admin role Tests', () => {
  describe('GET /api/v1/admin/users/', () => {
    const user = httpMocks.createRequest({
      app: {
        locals: {
          user: {
            roleId: 2
          }
        }
      }
    });
    let res;
    beforeEach(() => {
      res = httpMocks.createResponse();
    });

    it('should return status code 401 if user is not an admin', () => {
      admin(user, res);
      const data = JSON.parse(res._getData());
      res.statusCode.should.equal(401);
      data.message.should.be.equal('Only available to admin');
    });

    it('should return status code 401 if user does not have an admin or publisher access', () => {
      publishAcess(user, res);
      const data = JSON.parse(res._getData());
      res.statusCode.should.equal(401);
      data.message.should.be.equal('You do not have enough permission');
    });
  });
});
