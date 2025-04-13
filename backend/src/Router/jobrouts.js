import express from "express";
import authenticateToken from "../Middleware/AuthMiddleware.js";
import * as jobController from "../Controller/JobController.js";

const router = express.Router();

//user api
router.post("/ ", authenticateToken, jobController.postJob);
router.get("/getJob", authenticateToken, jobController.getJob);
router.get("/getJobId/:id", authenticateToken, jobController.getJobById);
router.get("/getAdminJobs", authenticateToken, jobController.getAdminJobs);
router.put("/updateJob/:id", authenticateToken, jobController.updateJob);

export default router;
