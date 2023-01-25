"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const router = (0, express_1.Router)();
router.post("/", controllers_1.unitTitleController.createUnitTitle);
router.put("/:unitTitleId", controllers_1.unitTitleController.updateUnitTitle);
router.put("/list/:unitTitleId", controllers_1.unitTitleController.updateUnitTitleTree);
router.get("/", controllers_1.unitTitleController.findUnitTitleAll);
router.get("/:unitTitleId", controllers_1.unitTitleController.findUnitTitleById);
router.get("/detail/:unitTitleId", controllers_1.unitTitleController.findUnitTitleAndDetailById);
router.get("/list/:unitTitleId", controllers_1.unitTitleController.findUnitTitleTree);
router.delete("/:unitTitleId", controllers_1.unitTitleController.deleteUnitTitle);
router.delete("/", controllers_1.unitTitleController.deleteUnitTitleTree);
exports.default = router;
//# sourceMappingURL=unitRouter.js.map