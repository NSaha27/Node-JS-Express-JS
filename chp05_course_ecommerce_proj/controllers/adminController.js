import Course from "../models/courseModel.js";

const loadAdminPage = (req, res, next) => {
  Course.fetchCourse(courses => {
    res.render("admin", {pageTitle: "Admin", course: courses, path: "/admin"});
  });
};

const loadEditCoursePage = (req, res, next) => {
  const crsID = Number(req.params.courseID);
  const editMode = Boolean(req.query.edit);
  const stat = req.query.msg? req.query.msg : "";
  if(editMode){
    if(crsID){
      Course.fetchSelectedCourse(crsID, crs => {
        res.render("addCourse", {pageTitle: "Edit Course", status: stat, path: "/edit-course", course: crs, edit: editMode});
      });
    }else{
      return res.redirect("/");
    }
  }else{
    return res.redirect("/");
  }
};

const editCourse = (req, res, next) => {
  const parsedCourseData = req.body;
  parsedCourseData.crsID = parseInt(parsedCourseData.crsID);
  parsedCourseData.crsPrice = parseFloat(parsedCourseData.crsPrice);
  const courseID = parsedCourseData.crsID;
  try{
    Course.editCourse(courseID, parsedCourseData); 
    res.redirect(`/edit-course/${courseID}?edit=true&msg=course successfully updated!`);
  }catch(e){
    console.log(e);
    res.redirect(`/edit-course/${courseID}?edit=true&msg=unable to update the course!`);
  }
};

const deleteCourse = (req, res, next) => {
  const courseID = req.body.crsID;
  if(courseID.length > 0){
    try{
      Course.deleteCourse(parseInt(courseID));
      res.redirect(`/admin?msg=course is deleted successfully!`);
    }catch(e){
      console.log(e);
      res.redirect("/admin?msg=unable to delete the course!");
    }
  }
};

export { deleteCourse, editCourse, loadAdminPage, loadEditCoursePage };

