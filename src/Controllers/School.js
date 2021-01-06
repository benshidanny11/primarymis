import moment from "moment";
import random from "random";
import SchoolService from "../services/SchoolService";
class School {
  async registerSchool(req, res) {
    const values = [
      random.int(1, 4),
      req.body.schoolname,
      req.body.schoolLogo,
      req.body.schooolemail,
      req.body.schoolPhone,
      req.body.schoolWebsite,
      req.body.province,
      req.body.district,
      req.body.sector,
      moment(new Date()),
    ];

    SchoolService.createSchool(values)
      .then((school) => {
        res.status(school.status).send({
          status: school.status,
          message: school.message,
          school: school.school.rows[0],
        });
      })
      .catch((err) => {
        res.status(400).send({
          status: 400,
          error: err.message,
        });
      });
  }

  async updateSchool(req, res) {
    const values = [
      req.body.schoolname,
      req.body.schooolemail,
      req.body.schoolPhone,
      req.body.schoolWebsite,
      req.body.province,
      req.body.district,
      req.body.sector,
      req.params.schoolid,
    ];

    SchoolService.updateSchool(values)
      .then((school) => {
        res.status(school.status).send({
          status: school.status,
          message: school.message,
          school: school.school.rows[0],
        });
      })
      .catch((err) => {
        res.status(400).send({
          status: 400,
          error: err.message,
        });
      });
  }

  async getByEmail(req, res) {
    const values = [
      req.params.email,
    ];

        //  res.status(200).send({
        //   status: 200,
        //   message: "Data found",
        //   school: {name:"Danny"},
        // });
      

    SchoolService.getByEmail(values)
      .then((school) => {
        res.status(school.status).send({
          status: school.status,
          message: school.message,
          school: school.school.rows[0],
        });
      })
      .catch((err) => {
        res.status(400).send({
          status: 400,
          error: err.message,
        });
      }).finally(()=>{
        res.end()
      });
  }
  async getById(req, res) {
    const values = [
      req.params.schoolid,
    ];

    SchoolService.getById(values)
      .then((school) => {
        res.status(school.status).send({
          status: school.status,
          message: school.message,
          school: school.school.rows[0],
        });
      })
      .catch((err) => {
        res.status(400).send({
          status: 400,
          error: err.message,
        });
      });
  }
}
export default new School();
