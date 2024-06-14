import express from 'express';
import { UserControllers } from './user.controller';

const router = express.Router();

router.get('/me', UserControllers.getUser);
router.put('/me', UserControllers.updateUser);

export const UserRoutes = router;
