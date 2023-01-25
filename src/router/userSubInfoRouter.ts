import express, { Router } from "express";
import { userSubInfoController } from "../controllers";

const router: Router = express.Router();

router.post("/", userSubInfoController.createUserSubInfo);
router.post("/:userSubInfoId", userSubInfoController.findAndUpdateUserSubInfo);
router.put("/:userSubInfoId", userSubInfoController.updateUserSubInfo);
router.get("/:userSubInfoId", userSubInfoController.findUserSubInfoById);
router.delete("/:userSubInfoId", userSubInfoController.deleteUserSubInfo);

export default router;
