import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import moment from 'moment';
import db from '../connection/query';
import {create} from '../queries/User';
dotenv.config();
 const user=[
  "admin",
  process.env.ADMIN_EMAIL,
  "0784871958",
  "HEAD_MASTER",
  bcrypt.hashSync(process.env.ADMIN_PASSWORD, 10),
  '1',
  moment(new Date())
 ]
db.query(create,user).then((userResponse)=>{

}).catch((err)=>{
    console.log(err)
});
