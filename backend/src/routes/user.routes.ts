import { userController } from '../controllers/user.controller';
import express from 'express';
// import { getRecommendations } from '../controllers/sport.controller';

const router = express.Router();

// router.post('/recommendations', getRecommendations);

router.get('/', userController.getUsers);
router.get('/:id', userController.getUserById);
router.get('/email/:email', userController.getUserByEmail);

router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);



export default router;