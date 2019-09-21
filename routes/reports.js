import express from 'express';
import ReportController from '../controllers/ReportController';
import { checkArticle } from '../middlewares/articleMiddleware';
import checkAuthentication from '../middlewares/checkAuthentication';
import reportValidation from '../middlewares/reportValidation';

const router = express.Router();
router.post('/:articleId/reports', checkAuthentication, checkArticle, reportValidation, ReportController.create);
export default router;
