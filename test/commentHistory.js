/* eslint-disable no-underscore-dangle */
import chai from 'chai';
import chaiHttp from 'chai-http';
import httpMocks from 'node-mocks-http';
import CommentHistoriesController from '../controllers/CommentHistoriesController';

chai.use(chaiHttp);
chai.should();

describe('Comment History Tests', () => {
  const nonExistingArticleRequest = httpMocks.createRequest({
    params: {
      articleId: 4824942,
      commentId: 34234
    },
    body: {
      content: 'This is a new commit, to edit a commit history'
    },
    app: {
      locals: {
        user: {
          userId: 1
        }
      }
    }
  });
  const nonExistingCommentRequest = httpMocks.createRequest({
    params: {
      articleId: 1,
      commentId: 9948284,
    },
    body: {
      content: 'This is a new commit, to edit a commit history'
    },
    app: {
      locals: {
        user: {
          userId: 1
        }
      }
    }
  });
  const archivedArticleRequest = httpMocks.createRequest({
    params: {
      articleId: 6,
      commentId: 10,
    },
    body: {
      content: 'This is a new commit, to edit a commit history'
    },
    app: {
      locals: {
        user: {
          userId: 1
        }
      }
    }
  });
  const archivedCommentRequest = httpMocks.createRequest({
    params: {
      articleId: 7,
      commentId: 13
    },
    body: {
      content: 'This is a new commit, to edit a commit history'
    },
    app: {
      locals: {
        user: {
          userId: 1
        }
      }
    }
  });
  const noCommentHistoryRequest = httpMocks.createRequest({
    params: {
      articleId: 2,
      commentId: 7
    },
    body: {
      content: 'This is a new commit, to edit a commit history'
    },
    app: {
      locals: {
        user: {
          userId: 1
        }
      }
    }
  });
  const commentRequest = httpMocks.createRequest({
    params: {
      articleId: 1,
      commentId: 1
    },
    body: {
      content: 'This is a new commit, to edit a commit history'
    },
    app: {
      locals: {
        user: {
          userId: 1
        }
      }
    }
  });
  const serverErrorRequest = httpMocks.createRequest({
    params: {
      articleId: '',
      commentId: ''
    },
    body: {
      content: 'This is a new commit, to edit a commit history'
    },
    app: {
      locals: {
        user: {
          userId: 1
        }
      }
    }
  });
  const notMostUpdatedCommentRequest = httpMocks.createRequest({
    params: {
      articleId: 1,
      commentId: 2
    },
    body: {
      content: 'This is a new commit, to edit a commit history'
    },
    app: {
      locals: {
        user: {
          userId: 1
        }
      }
    }
  });

  describe('GET /api/v1/articles:articleId/comments/:commentId', () => {
    let res;
    beforeEach(() => {
      res = httpMocks.createResponse();
    });

    it('should return status code 404 if article does not exist', async () => {
      await CommentHistoriesController.getACommentHistory(nonExistingArticleRequest, res);
      const data = JSON.parse(res._getData());
      res.statusCode.should.equal(404);
      data.message.should.be.equal('Article Not Found');
    });
    it('should return status code 404 if comment does not exist', async () => {
      await CommentHistoriesController.getACommentHistory(nonExistingCommentRequest, res);
      const data = JSON.parse(res._getData());
      res.statusCode.should.equal(404);
      data.message.should.be.equal('Comment Not Found');
    });
    it('should return status code 404 if article is archived', async () => {
      await CommentHistoriesController.getACommentHistory(archivedArticleRequest, res);
      const data = JSON.parse(res._getData());
      res.statusCode.should.equal(404);
      data.message.should.be.equal('No Edit History Found');
    });
    it('should return status code 404 if comment is archived', async () => {
      await CommentHistoriesController.getACommentHistory(archivedCommentRequest, res);
      const data = JSON.parse(res._getData());
      res.statusCode.should.equal(404);
      data.message.should.be.equal('No Edit History Found');
    });
    it('should return status code 404 if comment has no history', async () => {
      await CommentHistoriesController.getACommentHistory(noCommentHistoryRequest, res);
      const data = JSON.parse(res._getData());
      res.statusCode.should.equal(404);
      data.message.should.be.equal('No Edit History Found');
    });
    it('should return status code 404 if not most updated history', async () => {
      await CommentHistoriesController.getACommentHistory(notMostUpdatedCommentRequest, res);
      const data = JSON.parse(res._getData());
      res.statusCode.should.equal(404);
      data.message.should.be.equal('Comment Not Found');
    });
    it('should return status code 200 for retrieving a comment history', async () => {
      await CommentHistoriesController.getACommentHistory(commentRequest, res);
      const data = JSON.parse(res._getData());
      res.statusCode.should.equal(200);
      data.message.should.be.equal('Success');
      data.commentHistory.should.be.a('array');
    });
    it('should return status code 500 for server error', async () => {
      await CommentHistoriesController.getACommentHistory(serverErrorRequest, res);
      const data = JSON.parse(res._getData());
      res.statusCode.should.equal(500);
      data.message.should.be.equal('Something went wrong');
    });
  });

  describe('UPDATE /api/v1/articles:articleId/comments/:commentId', () => {
    const wrongUserRequest = httpMocks.createRequest({
      params: {
        articleId: 1,
        commentId: 1
      },
      body: {
        content: 'This is a new commit, to edit a commit history'
      },
      app: {
        locals: {
          user: {
            userId: 5
          }
        }
      }
    });
    let res;
    beforeEach(() => {
      res = httpMocks.createResponse({});
    });

    it('should return status code 404 if article does not exist', async () => {
      await CommentHistoriesController.createCommentHistory(nonExistingArticleRequest, res);
      const data = JSON.parse(res._getData());
      res.statusCode.should.equal(404);
      data.message.should.be.equal('Comment not Found');
    });
    it('should return status code 404 if comment does not exist', async () => {
      await CommentHistoriesController.createCommentHistory(nonExistingCommentRequest, res);
      const data = JSON.parse(res._getData());
      res.statusCode.should.equal(404);
      data.message.should.be.equal('Comment not Found');
    });
    it('should return status code 404 if article is archived', async () => {
      await CommentHistoriesController.createCommentHistory(archivedArticleRequest, res);
      const data = JSON.parse(res._getData());
      res.statusCode.should.equal(404);
      data.message.should.be.equal('Comment not Found');
    });
    it('should return status code 404 if comment is archived', async () => {
      await CommentHistoriesController.createCommentHistory(archivedCommentRequest, res);
      const data = JSON.parse(res._getData());
      res.statusCode.should.equal(404);
      data.message.should.be.equal('Comment not Found');
    });
    it('should return status code 403 if comment blongs to another user', async () => {
      await CommentHistoriesController.createCommentHistory(wrongUserRequest, res);
      const data = JSON.parse(res._getData());
      res.statusCode.should.equal(403);
      data.message.should.be.equal('Not Authorised');
    });
    it('should return status code 404 if comment is not the most updated', async () => {
      await CommentHistoriesController.createCommentHistory(notMostUpdatedCommentRequest, res);
      const data = JSON.parse(res._getData());
      res.statusCode.should.equal(404);
      data.message.should.be.equal('Comment not Found');
    });
    it('should return status code 200 for updating a comment', async () => {
      await CommentHistoriesController.createCommentHistory(commentRequest, res);
      const data = JSON.parse(res._getData());
      res.statusCode.should.equal(200);
      data.message.should.be.equal('Comment Successfully updated');
      data.comment.should.be.a('object');
    });
    it('should return status code 500 for server error', async () => {
      await CommentHistoriesController.createCommentHistory(serverErrorRequest, res);
      const data = JSON.parse(res._getData());
      res.statusCode.should.equal(500);
      data.message.should.be.equal('Something went wrong');
    });
  });
});
