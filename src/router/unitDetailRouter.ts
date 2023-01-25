import { Router } from "express";
import { unitDetailController } from "../controllers";

const router: Router = Router();

router.post("/", unitDetailController.createUnitDetail);
router.put("/:unitDetailId", unitDetailController.updateUnitDetail);
router.get("/", unitDetailController.findUnitDetailAll);
router.get("/:unitDetailId", unitDetailController.findUnitDetailById);
router.delete("/:unitDetailId", unitDetailController.deleteUnitDetail);

export default router;
