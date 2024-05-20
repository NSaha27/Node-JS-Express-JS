import express from "express";
import { deleteCourse, editCourse, loadAdminPage, loadEditCoursePage } from "../controllers/adminController.js";

const router = express.Router();

router.get("/admin", loadAdminPage);
router.get("/edit-course/:courseID", loadEditCoursePage);
router.post("/edit-course", editCourse);
router.post("/delete-course", deleteCourse);

export default router;