import SubjectService from "../services/SubjectService";
class SubjectController {
  async addSubject(req, res) {
    const values = [
      req.body.subjectname,
      req.body.catmax,
      req.body.exammax,
      req.body.levelid,
      "1",
    ];
    const teacherSubject = [req.body.teacherid, req.body.levelid];
    SubjectService.create(values)
      .then((results) => {
        teacherSubject.push(results.response.rows[0].subjectname);

        SubjectService.asignTeacherOnSubject(teacherSubject);
        res.status(results.status).send({
          status: results.status,
          message: results.message,
          subject: results.response.rows,
        });
      })
      .catch((err) => {
        res.status(400).send({
          status: 400,
          error: err.message,
        });
      });
  }
  // getting all data from database
  async getAll(req, res) {
    SubjectService.getAll()
      .then((result) => {
        res.status(result.status).send({
          status: result.status,
          message: result.message,
          Subjects: result.response.rows,
        });
      })
      .catch((err) => {
        res.status(400).send({
          message: err.message,
        });
      });
  }
  // getting all data from database by teacher
  async getAllByTeacher(req, res) {
    SubjectService.getByTeacher([req.params.teacherid])
      .then((result) => {
        res.status(result.status).send({
          status: result.status,
          message: result.message,
          Subjects: result.response.rows,
        });
      })
      .catch((err) => {
        res.status(400).send({
          message: err.message,
        });
      });
  }
  // getting all data from database by level
  async getAllByLevel(req, res) {
    SubjectService.getByLevel([req.params.levelid])
      .then((result) => {
        res.status(result.status).send({
          status: result.status,
          message: result.message,
          Subjects: result.response.rows,
        });
      })
      .catch((err) => {
        res.status(400).send({
          message: err.message,
        });
      });
  }
  async update(req, res) {
    const values = [
      req.body.subjectname,
      req.params.levelid,
      req.body.catmax,
      req.body.exammax,
      req.body.teacherid,
      req.params.subjectname,
    ];
    SubjectService.update(values)
      .then((result) => {
      
        res.status(result.status).send({
          status: result.status,
          message: result.message,
          subject: result.subject.rows,
        });
      })
      .catch((err) => {
        res.status(400).send({
          status: 400,
          error: err.message,
        });
      });
  }
  async deleteSubject(req, res) {
    SubjectService.deleteSubject([req.params.subjectname, req.params.levelid])
      .then((result) => {
        res.status(result.status).send({
          status: result.status,
          message: result.message,
        });
      })
      .catch((err) => {
        res.status(400).send({
          status: 400,
          message: err.message,
        });
      });
  }
  // search subject
  async searchSubject(req, res) {
    SubjectService.searchSubject([req.params.levelid,req.params.searchData])
      .then((result) => {
        res.status(result.status).send({
          status: result.status,
          message: result.message,
          Subjects: result.response.rows,
        });
      })
      .catch((err) => {
        res.status(400).send({
          message: err.message,
        });
      });
  }
}
export default new SubjectController();
