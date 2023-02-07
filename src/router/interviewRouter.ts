import { Router } from "express";
import { interviewController } from "../controllers";

const router: Router = Router();

router.post("/", interviewController.createInterview);
router.put("/:InterviewId", interviewController.updateInterview);
// router.get("/", interviewController.findInterviewAll);
router.get("/:InterviewId", interviewController.findInterviewById);
router.get("/", interviewController.findAllInterview);
router.get("/main", interviewController.findInterviewMainCategory);
router.delete("/:InterviewId", interviewController.deleteInterview);

export default router;
