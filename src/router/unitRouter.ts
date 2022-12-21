import { Router } from "express";
import { unitTitleController } from "../controllers";

const router: Router = Router();

router.post('/', unitTitleController.createUnitTitle);
router.put('/:unitTitleId', unitTitleController.updateUnitTitle);
router.get('/', unitTitleController.findUnitTitleAll);
router.get('/:unitTitleId', unitTitleController.findUnitTitleById);
router.get('/list/:unitTitleId', unitTitleController.findUnitTitleTree);
router.delete('/:unitTitleId', unitTitleController.deleteUnitTitle);

export default router;