import bodyParser from "body-parser";
import express from "express";
import path from "path";
import adminRouter from "./routes/adminRouter.js";
import courseRoute from "./routes/courseRoute.js";
import instituteRoute from "./routes/instituteRoute.js";

const PORT = process.env.PORT || "3000";
const HOST = "127.0.0.1";

const app = express();

app.use(express.static(path.join(process.cwd(), "public")));
app.use(bodyParser.urlencoded({extended: false}));

app.set("view engine", "ejs");

app.use(courseRoute);
app.use(instituteRoute);
app.use(adminRouter);

app.listen(PORT, HOST, (err) => {
  if(err){
    console.log(`unable to start server, error: ${err}`);
  }else{
    console.log(`server started at http://${HOST}:${PORT}`);
  }
})