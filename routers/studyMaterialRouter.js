import express from "express";
const router = express.Router();

import {
  getStudyMaterial,
  addStudyMaterial,
  editStudyMaterial,
  deleteStudyMaterial,
  searchStudyMaterial,
} from "../controllers/studyMaterialController.js";

router.get("/getStudyMaterial", getStudyMaterial);
router.post("/addStudyMaterial", addStudyMaterial);
router.patch("editStudyMaterial", editStudyMaterial);
router.delete("/deleteStudyMaterial", deleteStudyMaterial);

router.get("/searchStudyMaterial", searchStudyMaterial);

export default router;
