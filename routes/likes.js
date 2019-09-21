import express from 'express';
import LikesController from '../controllers/LikesController';
import checkAuthentication from '../middlewares/checkAuthentication';
import { checkArticle } from '../middlewares/articleMiddleware';

const router = express.Router();

router.post(
  '/:articleId/likes',
  checkAuthentication,
  checkArticle,
  LikesController.likesArticles
);

router.get(
  '/:articleId/likes',
  checkAuthentication,
  checkArticle,
  LikesController.getAriticles
);

router.post(
  '/:articleId/comments/:commentId/likes',
  checkAuthentication,
  checkArticle,
  LikesController.likesComments
);

router.get(
  '/:articleId/comments/:commentId/likes',
  checkAuthentication,
  checkArticle,
  LikesController.likedComments
);

export default router;
