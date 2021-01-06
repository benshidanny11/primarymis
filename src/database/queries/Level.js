export const getAll = `select * from levels where status = '1' `;
export const getById = `select * from levels where levelid =$1 and status ='1'`;

export const createLevel=`insert into levels(levelId,levelName,status) values($1,$2,'1') returning *`;