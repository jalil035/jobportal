import express from "express";
import authenticateToken from "../Middleware/AuthMiddleware.js";
import * as CompanyController from "../Controller/CompanyController.js";

const router = express.Router();

//company api

router.post(
  "/registerCompany",
  authenticateToken,
  CompanyController.registerCompany
);
router.get("/getCompany", authenticateToken, CompanyController.getCompany);

router.get(
  "/getCompanyId/:id",
  authenticateToken,
  CompanyController.getCompanyById
);

router.put(
  "/ /:id",
  authenticateToken,
  CompanyController.updateCompany
);

export default router;
