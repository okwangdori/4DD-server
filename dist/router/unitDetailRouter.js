"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const router = (0, express_1.Router)();
router.post("/", controllers_1.unitDetailController.createUnitDetail);
router.put("/:unitDetailId", controllers_1.unitDetailController.updateUnitDetail);
router.get("/", controllers_1.unitDetailController.findUnitDetailAll);
router.get("/:unitDetailId", controllers_1.unitDetailController.findUnitDetailById);
router.delete("/:unitDetailId", controllers_1.unitDetailController.deleteUnitDetail);
exports.default = router;
//# sourceMappingURL=unitDetailRouter.js.map