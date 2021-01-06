import moment from 'moment';
import db from '../database/connection/query';
import {create,getByLevel,getById,getAll} from '../database/queries/Class';
import random from 'random';
class ClassService{

async create(data){
    let classRess = await db.query(create,data);
    return {
        status: 200,
        message: 'Class registered',
        class: classRess,
    }
}


async getAllByLevel(data){
    let classes = await db.query(getByLevel,data);
    if(classes.rows.length != 0){
        return{
            status: 200,
            classes: classes,
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
async getOneClass(data){
    let oneClassRes = await db.query(getById,data);
    if(oneClassRes.rowCount){
        return{
            status: 200,
            classes: oneClassRes,
            message: 'data found',
        }
    }else{
        return{
            status: 400,
            message: 'no data to display',
           
        }
    }
}
async getAllClasses(data){
    let allClasses = await db.query(getAll);
    if(allClasses.rowCount){
        return{
            status: 200,
            classes: allClasses,
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
export default new ClassService();
