"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const router = express_1.default.Router();
router.post("/", controllers_1.userSubInfoController.createUserSubInfo);
router.post("/:userSubInfoId", controllers_1.userSubInfoController.findAndUpdateUserSubInfo);
router.put("/:userSubInfoId", controllers_1.userSubInfoController.updateUserSubInfo);
router.get("/:userSubInfoId", controllers_1.userSubInfoController.findUserSubInfoById);
router.delete("/:userSubInfoId", controllers_1.userSubInfoController.deleteUserSubInfo);
exports.default = router;
//# sourceMappingURL=userSubInfoRouter.js.map