import express from 'express';
import HighlightsController from '../controllers/HighlightsController';
import checkAuthentication from '../middlewares/checkAuthentication';
import { checkArticle } from '../middlewares/articleMiddleware';
import { checkHighlightUpdate, checkHighlightCreate } from '../middlewares/highlightsMiddleware';

const router = express.Router();

router.post(
  '/:articleId/highlight',
  checkAuthentication,
  checkArticle,
  checkHighlightCreate,
  HighlightsController.create
);

router.get('/:articleId/highlights', checkArticle, HighlightsController.fetchByArticleId);

router.get(
  '/:articleId/highlights/:highlightId/comments',
  checkArticle,
  HighlightsController.fetchAHighlightsComments
);

router.put(
  '/:articleId/highlights',
  checkAuthentication,
  checkArticle,
  checkHighlightUpdate,
  HighlightsController.update
);

export default router;
