import { sportController } from '../controllers/sport.controller';
import express from 'express';
// import { getRecommendations } from '../controllers/sport.controller';

const router = express.Router();

// router.post('/recommendations', getRecommendations);

router.get('/', sportController.getSports);
router.get('/:id', sportController.getSportById);


export default router;