import ClassService from "../services/ClassService";
class ClassConroller {
  async addClass(req, res) {

    const values = [
      req.body.classname,
      req.body.teacherid,
      req.body.levelid
    ];
   
    ClassService.create(values)
      .then((classRes) => {
     
        res.status(classRes.status).send({
          status: classRes.status,
          message: classRes.message,
          student: classRes.class.rows,
        });
      })
      .catch((err) => {
        res.status(400).send({
          status: 400,
          error: err.message,
        });
      });
  }

  async getAll(req, res) {
    ClassService.getAllClasses()
      .then((classRes) => {
        res.status(classRes.status).send({
          status: classRes.status,
          message: classRes.message,
          classes: classRes.classes.rows,
        });
      })
      .catch((err) => {
        res.status(400).send({
          message: err.message,
        });
      });
  }
  // getting all data from database by level
  async getAllClassesByLevel(req, res) {
    ClassService.getAllByLevel([
      req.params.levelid, 
    ])
      .then((students) => {
        res.status(students.status).send({
          status: students.status,
          message: students.message,
          classses: students.classes.rows,
        });
      })
      .catch((err) => {
        res.status(400).send({
          message: err.message,
        });
      });
  }

  async getClassById(req, res) {
    ClassService.getOneClass([
      req.params.classid,
    ])
      .then((students) => {
        res.status(students.status).send({
          status: students.status,
          message: students.message,
          class: students.classes.rows,
        });
      })
      .catch((err) => {
        res.status(400).send({
          message: err.message,
        });
      });
  }
 
}
export default new ClassConroller();
