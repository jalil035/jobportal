import express from "express";
import * as UserController from "../Controller/UserController.js";
import authenticateToken from "../Middleware/AuthMiddleware.js";
import * as CompanyController from "../Controller/CompanyController.js";

const router = express.Router();

//user api
router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get("/logout", UserController.logout);
router.post("/updateProfile", authenticateToken, UserController.updateProfile);

export default router;
