import express from 'express';
import CommentValidation from '../middlewares/CommentValidation';
import checkAuthentication from '../middlewares/checkAuthentication';
import CommentController from '../controllers/CommentController';
import { checkArticle } from '../middlewares/articleMiddleware';
import CommentHistoriesController from '../controllers/CommentHistoriesController';

const {
  checkCommentContent,
  checkCommentId,
  checkCommentParams,
  checkArticleId
} = CommentValidation;

const {
  getACommentHistory,
  createCommentHistory
} = CommentHistoriesController;


const { create, list, archive } = CommentController;
const router = express.Router();

router.get('/:articleId/comments', checkAuthentication, checkArticle, checkArticleId, list);
router.post('/:articleId/comments', checkAuthentication, checkArticleId, checkCommentContent, checkArticle, create);
router.delete('/:articleId/comments/:commentId', checkAuthentication, checkArticle, checkCommentId, checkCommentParams, archive);
router.get('/:id/comments', checkAuthentication, checkArticleId, checkArticle, list);
router.post('/:id/comments', checkAuthentication, checkCommentContent, checkArticle, create);
router.delete('/:articleId/comments/:commentId', checkAuthentication, checkCommentId, checkCommentParams, archive);

router.get(
  '/:articleId/comments/:commentId',
  [
    checkAuthentication,
    checkCommentId
  ],
  getACommentHistory
);

router.put(
  '/:articleId/comments/:commentId',
  [
    checkAuthentication,
    checkCommentId,
    checkCommentContent,
  ],
  createCommentHistory
);

export default router;
