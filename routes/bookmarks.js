import express from 'express';
import BookmarksController from '../controllers/BookmarksController';
import bookmarkValidate from '../middlewares/bookmarksValidate';
import checkAuthentication from '../middlewares/checkAuthentication';
import { checkArticle } from '../middlewares/articleMiddleware';

const router = express.Router();

router.get(
  '/bookmarks/all',
  checkAuthentication,
  BookmarksController.getAll
);
router.post(
  '/:articleId/bookmarks',
  checkAuthentication,
  checkArticle,
  bookmarkValidate,
  BookmarksController.create
);
router.get(
  '/bookmarks/search',
  checkAuthentication,
  BookmarksController.search
);
router.delete(
  '/bookmarks/:bookmarkId',
  checkAuthentication,
  BookmarksController.delete
);

export default router;
