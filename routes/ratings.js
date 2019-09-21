import express from 'express';
import Ratings from '../controllers/RatingsController';
import checkAuthentication from '../middlewares/checkAuthentication';
import { checkArticlesId, validRatingsInput } from '../middlewares/RatingsMiddleware';

const router = express.Router();

router.post('/articles/:articleId', checkAuthentication, checkArticlesId, validRatingsInput, Ratings.create);
router.get('/articles/:articleId', checkArticlesId, Ratings.retrieve);

export default router;
