import express from 'express';
import checkAuthentication from '../middlewares/checkAuthentication';
import ReaderStatsController from '../controllers/ReaderStatsController';

const { getReadingStatistics } = ReaderStatsController;
const router = express.Router();
router.get('/readerstats', checkAuthentication, getReadingStatistics);

export default router;
