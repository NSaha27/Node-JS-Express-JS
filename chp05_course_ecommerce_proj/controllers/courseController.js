import Cart from "../models/cartModel.js";
import Course from "../models/courseModel.js";

const loadAddCoursePage = (req, res, next) => {
  const stat = req.query.msg? req.query.msg : "";
  res.render("addCourse", {pageTitle: "Add Course", status: stat, path: "/add-course", edit: false, course: null});
};

const addCourse = (req, res, next) => {
  const parsedCourseData = req.body;
  if(parsedCourseData){
    const newCourse = new Course(parsedCourseData.crsName, parsedCourseData.crsImgURL, parsedCourseData.crsDescription, parseFloat(parsedCourseData.crsPrice));
    try{
      newCourse.saveCourse();
      res.redirect("/?msg=course successfully added!");
    }catch(e){
      res.redirect("/add-course?msg=something went wrong, unable to add course!");
    }
  }
};

const fetchCourses = (req, res, next) => {
  Course.fetchCourse(courses => {
    res.render("index", {pageTitle: "Home", course: courses, path: "/"});
  });
};

const fetchCourseDetails = (req, res, next) => {
  const courseID = Number(req.params.courseID);
  Course.fetchSelectedCourse(courseID, course => {
    res.render("courseDetails", {pageTitle: "Course Details", courseDetails: course, path: "/course-details"});
  });
};

const loadAddToCartPage = (req, res, next) => {
  res.render("addToCart", {pageTitle: "Add to Cart", path: "/add-to-cart"});
};

const addToCart = (req, res, next) => {
  const courseID = Number(req.body.crsID);
  Course.fetchSelectedCourse(courseID, course => {
    Cart.addToCart(courseID, parseFloat(course.crsPrice));
  });
  res.redirect("/add-to-cart");
};

export { addCourse, addToCart, fetchCourseDetails, fetchCourses, loadAddCoursePage, loadAddToCartPage };

