import express from "express";
import { fetchCourses } from "../controllers/courseController.js";

const router = express.Router();

router.get("/", fetchCourses);

export default router;