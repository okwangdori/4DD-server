import express, { Router } from "express";
import { userController } from "../controllers";

const router: Router = express.Router();

router.get('/:userId', userController.findUserById);
router.post('/register', userController.createUser);
router.post('/login', userController.findUserByEmail);
router.put('/:userId', userController.updateUser);
router.delete('/:userId', userController.deleteUser);

export default router;