import express from "express";
import Auth from "./_Auth";
import Students from "./_Students";
import School from "./_school";
import Subject from './_Subject';
import Points from './_Points';
import ClassRoute from './_class';

const api = express();


api.use("/api/user", Auth);
api.use("/api/student", Students);
api.use("/api/school", School);
api.use("/api/subjects",Subject);
api.use("/api/points",Points);
api.use("/api/class",ClassRoute);
api.get("/", (req, res) => {
  res.status(200).send({
    status: 200,
    message: "Welcome to primary mis",
  });
});

api.use("/", (req, res) => {
    res.status(404).send({
      status: 404,
      message: "Page not found",
    });
  });
  
export default api;
