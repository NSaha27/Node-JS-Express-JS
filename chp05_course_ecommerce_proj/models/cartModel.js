import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "./models/.data", "cart.json");

class Cart{
  static addToCart(cID, coursePrice){
    let cart = {courses: [], totalPrice: 0};
    fs.readFile(filePath, "utf-8", (err, data) => {
      if(!err){
        cart = JSON.parse(data);
      }
      const existingCourseIndex = cart.courses.findIndex(crs => crs.crsID === cID);
      const existingCourse = cart.courses[existingCourseIndex];
      let updatedCourse;
      if(existingCourse){
        updatedCourse = {...existingCourse};
        updatedCourse.qty += 1;
        cart.courses = [...cart.courses];
        cart.courses[existingCourseIndex] = updatedCourse;
      }else{
        updatedCourse = {crsID: cID, qty: 1};
        cart.courses = [...cart.courses, updatedCourse];
      }
      cart.totalPrice += coursePrice;
      fs.writeFile(filePath, JSON.stringify(cart), (err2) => {
        if(err2){
          console.log(`unable to add to cart, error: ${err2}`);
        }
      });
    });
  }
  static deleteFromCart(crsID, crsPrice){
    fs.readFile(filePath, "utf-8", (err, data) => {
      if(!err){
        const cart = JSON.parse(data);
        const existingCourseIndex = cart.courses.findIndex(crs => crs.crsID === crsID);
        if(existingCourseIndex !== -1){
          const crsQty = cart.courses.at(existingCourseIndex).qty;
          cart.totalPrice -= (crsQty * crsPrice);
          const deletedCrs = cart.courses.splice(existingCourseIndex, 1);
          if(deletedCrs){
            fs.writeFile(filePath, JSON.stringify(cart), (err2) => {
              if(err2){
                console.log("unable to update the cart!");
              }else{
                console.log(`course removed from cart successfully!`);
              }
            });
          }else{
            console.log("unable to remove the course from cart!");
          }
        }else{
          console.log("course doesn't exist in the cart!");
          return;
        }
      }else{
        return;
      }
    });
  }
}

export default Cart;