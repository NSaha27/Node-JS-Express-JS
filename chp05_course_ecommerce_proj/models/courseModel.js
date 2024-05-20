import fs from "fs";
import path from "path";
import Cart from "./cartModel.js";

const filePath = path.join(process.cwd(), "./models/.data", "course.json");

const getFileContent = (cb) => {
  fs.readFile(filePath, "utf-8", (err1, data) => {
    if(err1){
      cb([]);
    }else{
      cb(JSON.parse(data));
    }
  });
};

const genRandCrsID = () => {
  const id = Math.floor(Math.random() * 100000) + 1;
  return id;
};

class Course{
  constructor(crsName, crsImgURL, crsDescription, crsPrice){
    this.crsName = crsName;
    this.crsImgURL = crsImgURL;
    this.crsDescription = crsDescription;
    this.crsPrice = crsPrice;
  }
  saveCourse(){
    this.crsID = genRandCrsID();
    getFileContent(courses => {
      courses.push(this);
      fs.writeFile(filePath, JSON.stringify(courses), (err) => {
        if(err){
          console.log(`unable to save the course, error: ${err}`);
        }
      });
    });
  }
  static fetchCourse(cb){
    getFileContent(cb);
  }
  static fetchSelectedCourse(crsID, cb){
    getFileContent(courses => {
      const selectedCourse = courses.find(crs => crs.crsID === crsID);
      cb(selectedCourse);
    });
  }
  static editCourse(crsID, parsedData){
    getFileContent(courses => {
      const selectedCourseIndex = courses.findIndex(crs => crs.crsID === crsID);
      courses.splice(selectedCourseIndex, 1, parsedData);
      fs.writeFile(filePath, JSON.stringify(courses), (err) => {
        if(err){
          console.log(`unable to edit the course, error: ${err}`);
        }
      })
    });
  }
  static deleteCourse(crsID){
    getFileContent(courses => {
      const selectedCourseIndex = courses.findIndex(crs => crs.crsID === crsID);
      if(selectedCourseIndex !== -1){
        const coursePrice = courses.at(selectedCourseIndex).crsPrice;
        courses.splice(selectedCourseIndex, 1);
        fs.writeFile(filePath, JSON.stringify(courses), (err) => {
          if(err){
            console.log("unable to delete the course!");
          }else{
            Cart.deleteFromCart(crsID, coursePrice);
          }
        });
      }
    });
  }
}

export default Course;