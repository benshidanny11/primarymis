import moment from "moment";
import db from "../database/connection/query";
import {
  createSchool,
  updateShool,
  getByEmail,
  getByPhone,
  getByName,
} from "../database/queries/school";

class SchoolService {
  async createSchool(data) {
    let school = await db.query(createSchool, data);
    if (school) {
      return {
        status: 200,
        message: "School registered",
        school: school,
      };
    } else {
      return {
        status: 400,
        message: "Error occured",
      };
    }
  }

  async updateSchool(data) {
    let school = await db.query(updateShool, data);
    if (school) {
      return {
        status: 200,
        message: "School updated",
        school: school,
      };
    } else {
      return {
        status: 400,
        message: "Error occured",
      };
    }
  }
  async getByEmail(data) {
    let school = await db.query(getByEmail, data);
   //  console.log(school)
    if (school.rows[0]) {
      return {
        status: 200,
        school: school,
      };
    } else {
      return {
        status: 400,
        message: "Error occured",
      };
    }
  }
  async getById(data) {
    let school = await db.query(getByEmail, data);
    if (school.rows[0]) {
      return {
        status: 200,
        school: school,
      };
    } else {
      return {
        status: 400,
        message: "Error occured",
      };
    }
  }
}

export default new SchoolService();
