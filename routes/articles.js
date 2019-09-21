import express from 'express';
import ArticlesController from '../controllers/ArticlesController';
import ArticlesValidation from '../middlewares/ArticleValidation';
import checkAuthentication from '../middlewares/checkAuthentication';
import checkRoleAuthentication from '../middlewares/checkRoleAuthentication';
import {
  checkArticle,
  checkTags,
  checkPublished,
  checkNotPublished,
} from '../middlewares/articleMiddleware';
import { admin, publishAcess } from '../middlewares/authorization';

const { validateInput, checkArticleId } = ArticlesValidation;
const router = express.Router();


router.post('/', checkAuthentication, validateInput, checkTags, ArticlesController.create); // done
router.get('/', ArticlesController.list); // done

router.get('/archived', checkAuthentication, admin, ArticlesController.getArchived); // done
router.get('/unpublished', checkAuthentication, publishAcess, ArticlesController.getUnpublished); // done

router.get('/:identifier', checkRoleAuthentication, checkArticleId, ArticlesController.get); // done
router.put('/:identifier', checkAuthentication, checkArticleId, checkArticle, checkTags, ArticlesController.update); // done
router.delete('/:identifier', checkAuthentication, checkArticleId, checkArticle, ArticlesController.archive); // done

router.put(
  '/:identifier/publish',
  checkAuthentication, publishAcess,
  checkArticleId, checkArticle, checkPublished, ArticlesController.publish
); // done

router.put(
  '/:identifier/unpublish',
  checkAuthentication, publishAcess,
  checkArticleId, checkArticle, checkNotPublished, ArticlesController.unpublish
); // done

export default router;
