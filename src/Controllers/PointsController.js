import PointsServices from "../services/Points";

class PointsController {
  async create(req, res) {
    const values = [
      req.body.levelid,
      req.body.subjectname,
      req.body.catone,
      req.body.cattwo,
      req.body.exam,
      req.body.studentid,
      req.body.teacherid,
      req.body.term,
      req.body.year,
    ];
    PointsServices.create(values)
      .then((results) => {
        if (results.status !== 200) {
          res.status(results.status).send({
            status: results.status,
            message: results.message,
          });
        } else {
          res.status(results.status).send({
            status: results.status,
            message: results.message,
            Points: results.response.rows,
          });
        }
      })
      .catch((err) => {
        res.status(400).send({
          status: 400,
          error: err.message,
        });
      });
  }
  async update(req, res) {
    const values = [
      req.body.catone,
      req.body.cattwo,
      req.body.exam,
      req.params.levelid,
      req.params.subjectname,
      req.params.studentid,
    ];
    PointsServices.update(values)
      .then((result) => {
        // console.log(result);
        res.status(result.status).send({
          status: result.status,
          message: result.message,
          points: result.response.rows,
        });
      })
      .catch((err) => {
        res.status(400).send({
          status: 400,
          error: err.message,
        });
      });
  }
  // getting all points from database by subjects
  async getBysubjects(req, res) {
    PointsServices.getBysubjects([
      req.params.levelid,
      req.params.subjectname,
      req.params.year,
    ])
      .then((result) => {
        res.status(result.status).send({
          status: result.status,
          message: result.message,
          points: result.response.rows,
        });
      })
      .catch((err) => {
        res.status(400).send({
          message: err.message,
        });
      });
  }
  // getting all points from database by subjects in term
  async getBysubjectsInTerm(req, res) {
    PointsServices.getBysubjectsInTerm([
      req.params.levelid,
      req.params.subjectname,
      req.params.term,
      req.params.year,
      req.params.pagenumber
    ])
      .then((result) => {
        res.status(result.status).send({
          status: result.status,
          message: result.message,
          points: result.response.rows,
          totalPages:result.totaPages
        });
      })
      .catch((err) => {
        res.status(400).send({
          message: err.message,
        });
      });
  }
  // getting all points from database by students in term
  async getByStudentInTerm(req, res) {
    PointsServices.getByStudentInTerm([
      req.params.studentid,
      req.params.levelid,
      req.params.term,
      req.params.year,
    ])
      .then((result) => {
        res.status(result.status).send({
          status: result.status,
          message: result.message,
          points: result.response.rows,
        });
      })
      .catch((err) => {
        res.status(400).send({
          message: err.message,
        });
      });
  }
  // getting all points from database by students
  async getByStudents(req, res) {
    PointsServices.getByStudent([req.params.studentid, req.params.year])
      .then((result) => {
        res.status(result.status).send({
          status: result.status,
          message: result.message,
          points: result.response.rows,
        });
      })
      .catch((err) => {
        res.status(400).send({
          message: err.message,
        });
      });
  }
  // getting all points from database by students
  async getByClass(req, res) {
    PointsServices.getByClass([req.params.classid, req.params.year])
      .then((result) => {
        res.status(result.status).send({
          status: result.status,
          message: result.message,
          points: result.response.rows,
        });
      })
      .catch((err) => {
        res.status(400).send({
          message: err.message,
        });
      });
  }
  // getting all points from database by students
  async getByClassInTerm(req, res) {
    PointsServices.getByClassInTerm([
      req.params.classid,
      req.params.term,
      req.params.year,
    ])
      .then((result) => {
        res.status(result.status).send({
          status: result.status,
          message: result.message,
          points: result.response.rows,
        });
      })
      .catch((err) => {
        res.status(400).send({
          message: err.message,
        });
      });
  }

  async searchPointByStudent(req, res) {
    PointsServices.searchPointByStudent([
      req.params.levelid,
      req.params.subjectname,
      req.params.term,
      req.params.year,
      req.params.searchData,
    ])
      .then((result) => {
        res.status(result.status).send({
          status: result.status,
          message: result.message,
          points: result.response.rows,
        });
      })
      .catch((err) => {
        res.status(400).send({
          message: err.message,
        });
      });
  }
}
export default new PointsController();
