"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const router = (0, express_1.Router)();
router.post("/", controllers_1.interviewController.createInterview);
router.put("/:InterviewId", controllers_1.interviewController.updateInterview);
// router.get("/", interviewController.findInterviewAll);
router.get("/:InterviewId", controllers_1.interviewController.findInterviewById);
router.get("/", controllers_1.interviewController.findAllInterviewById);
router.delete("/:InterviewId", controllers_1.interviewController.deleteInterview);
exports.default = router;
//# sourceMappingURL=interviewRouter.js.map