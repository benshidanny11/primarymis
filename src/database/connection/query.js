import dotenv from "dotenv";
import { async } from "regenerator-runtime";
import conection from "./connection";
dotenv.config();
const pool = conection.getPoolConnection();
class ExecuteQuery {
  constructor() {
    this.query = async (text, params) => {
      const client = await pool.connect();

      const result= await client.query(text, params);
      client.release()
      return result;
    
    };
  }
}

export default new ExecuteQuery();
