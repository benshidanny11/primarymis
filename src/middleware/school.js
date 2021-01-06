import moment from "moment";
import { async } from "regenerator-runtime";
import db from "../database/connection/query";
import { avoidDuplicate } from "../database/queries/school";
export default [
  //Check duplicate
  async (req, res, next) => {
    const school = await db.query(avoidDuplicate, [
      req.body.schoolEmail,
      req.body.schoolname,
      req.body.schoolPhone,
      req.body.schoolWebsite,
    ]);
    if (school.rows[0]) {
      res.status(400).send({
        status: 400,
        message: "School already exists",
      });
    } else {
      next();
    }
  },
];
