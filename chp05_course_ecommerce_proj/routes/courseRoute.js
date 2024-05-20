import express from "express";
import { addCourse, addToCart, fetchCourseDetails, loadAddCoursePage, loadAddToCartPage } from "../controllers/courseController.js";

const router = express.Router();

router.get("/add-course", loadAddCoursePage);
router.post("/add-course", addCourse);
router.get("/course-details/:courseID", fetchCourseDetails);
router.get("/add-to-cart", loadAddToCartPage);
router.post("/add-to-cart", addToCart);

export default router;