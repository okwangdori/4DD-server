import express, { Router } from "express";
import { userController } from "../controllers";

const router: Router = express.Router();

// router.get('/:userId', userController.findUserById);
router.get('/info/:userId', userController.findUserById);
router.get('/info', userController.getUsers);
router.post('/register', userController.signup);
router.post('/login', userController.login);
router.put('/:userId', userController.updateUser);
router.delete('/:userId', userController.deleteUser);

export default router;