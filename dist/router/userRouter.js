"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const router = express_1.default.Router();
// router.get('/:userId', userController.findUserById);
router.get('/info/:userId', controllers_1.userController.findUserById);
router.get('/info', controllers_1.userController.getUsers);
router.post('/register', controllers_1.userController.register);
router.post('/login', controllers_1.userController.login);
router.post('/logout', controllers_1.userController.logout);
router.post('/changePassword', controllers_1.userController.changePassword);
router.put('/:userId', controllers_1.userController.updateUser);
router.delete('/:userId', controllers_1.userController.deleteUser);
exports.default = router;
//# sourceMappingURL=userRouter.js.map