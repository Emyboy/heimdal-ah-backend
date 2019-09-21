import express from 'express';
import { getAuthor } from '../middlewares/ProfilesMiddleware';
import { getTagId } from '../middlewares/articleMiddleware';
import SearchArticlesController from '../controllers/SearchArticlesController';

const router = express.Router();

router.get('/author', getAuthor, SearchArticlesController.byAuthor);
router.get('/title', SearchArticlesController.byTitle);
router.get('/tag', getTagId, SearchArticlesController.byTags);

export default router;
