import { Router } from "express";
import { unitTitleController } from "../controllers";

const router: Router = Router();

router.post("/", unitTitleController.createUnitTitle);
router.put("/:unitTitleId", unitTitleController.updateUnitTitle);
router.put("/list/:unitTitleId", unitTitleController.updateUnitTitleTree);
router.get("/", unitTitleController.findUnitTitleAll);
router.get("/:unitTitleId", unitTitleController.findUnitTitleById);
router.get(
  "/detail/:unitTitleId",
  unitTitleController.findUnitTitleAndDetailById
);
router.get("/list/:unitTitleId", unitTitleController.findUnitTitleTree);
router.delete("/:unitTitleId", unitTitleController.deleteUnitTitle);
router.delete("/", unitTitleController.deleteUnitTitleTree);

export default router;
