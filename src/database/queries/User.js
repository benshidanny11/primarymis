export const getAll = `SELECT userid,names, email, phonenumber, role, password, status
FROM users where status='1' and role !='HEAD_MASTER' LIMIT 5 OFFSET $1`;
export const getByEmail = `select userid,names,email,
phonenumber,role,password,status from users where email =$1 and status = '1' `;
export const getByRole  = `select userid,names,email,phonenumber,role,password,status from users where role = 'TEACHER' and status = '1'`;
export const getById = `SELECT userid,names, email, phonenumber, role, password, status
FROM users where status='1' and userid = $1`;
export const getTeacherById =` SELECT userid,names, email, phonenumber, role, password, status
FROM users where status='1' and userid = $1 and role='TEACHER'`;
export const getTotalUsers=`SELECT COUNT(*) as totalUses from users where status='1'`;
export const getuserDetails = `SELECT *
FROM subjects_teachers inner join subjects on subjects_teachers.subjectid = subjects.subjectid inner join users on subjects_teachers.teacherid = users.userid where users.userid =$1 and users.status = '1'`;
export const create =`INSERT INTO users(
	names, email, phonenumber, role, password, status, registereddate)
	VALUES ($1, $2, $3, $4, $5, $6, $7) returning *`;
	export const update =`UPDATE users
	SET names=$2, email=$3, phonenumber=$4, role=$5
	WHERE userid = $1 returning *`;
	export const updatePassword = `UPDATE users
	SET password=$2
	WHERE userid = $1`;
	export const hideuser = `UPDATE users
	SET status='0'
	WHERE userid = $1`;
	export const deleteuser = `delete from users where userid =$1`;
	//check email exist on updating user
	export const checkExist =`select * from users where email = $2 and userid !=$1 `;

	export const searchUser = `select userid,names, email, phonenumber, role, password, status
	 from users where position(LOWER($1) in LOWER(names))>0 and status = '1'`;