import express from 'express';
import ProfilesController from '../controllers/ProfilesController';

const router = express.Router();

router.get('/:username', ProfilesController.viewProfile);

router.put('/:username', ProfilesController.updateProfile);

export default router;
