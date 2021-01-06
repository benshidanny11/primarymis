import moment from 'moment';
import db from '../database/connection/query';
import {create,update,deleteRecord,getAll,createStudentLevel,
    createStudentClass,getByLevel,getAllByClass, getOne} from '../database/queries/Student';
import random from 'random';
class StudentServices{

 registrationNumber(schoolNmae){
    let regNumber = schoolNmae+'/' + moment(new Date()).year() + '/' + random.int(0, 1000);
    return regNumber;
}
async create(data){
    let student = await db.query(create,data);
    return {
        status: 200,
        message: 'student registered',
        student: student,
    }
}
async createLevels(data){
    let level = await db.query(createStudentLevel,data);
    if(level.rowCount){
    console.log('level inserted');
    }else
    console.log('level not inserted');
}
async createClass(data){
    let result = await db.query(createStudentClass,data);
    if(result.rowCount){
    console.log('class inserted');
    }else
    console.log('class not inserted');
}
async update(data){
    let student = await db.query(update,data);
    if(student.rowCount){
        return{
            status: 200,
            message: 'student updated',
            student: student,
        }
    }else{
        return {
            status: 400,
            message: 'oops! student not updated',
            student: [],
        }
    }
}
async deleteStudent(data){
    let student = await db.query(deleteRecord,data);
    if(student.rowCount){
        return{
            status: 200,
            message: 'student deleted',
        }
    }else{
        return{
            status: 400,
            message: 'student not deleted',
        }
    }
}
// getting all students in db
async getAll(){
    let students = await db.query(getAll);
    if(students.rows.length != 0){
        return{
            status: 200,
            students: students,
            message: 'data found',
        }
    }else{
        return{
            status: 400,
            message: 'no data to display',
            students: [],
        }
    }
}
// getting all students by level
async getAllByLevel(data){
    let students = await db.query(getByLevel,data);
    if(students.rows.length != 0){
        return{
            status: 200,
            students: students,
            message: 'data found',
        }
    }else{
        return{
            status: 400,
            message: 'no data to display',
            students: [],
        }
    }
}
// get all student in a class
async getAllByClass(data){
    let students = await db.query(getAllByClass,data);
    if(students.rows.length != 0){
        return{
            status: 200,
            students: students,
            message: 'data found',
        }
    }else{
        return{
            status: 400,
            message: 'no data to display',
            students: [],
        }
    }
}
//get one student
async getOne(data){
    let student = await db.query(getOne,data);
    if(student.rowCount){
        return{
            status: 200,
            students: student,
            message: 'data found',
        }
    }else{
        return{
            status: 400,
            message: 'no data to display',
            students: [],
        }
    }
}

}
export default new StudentServices();
