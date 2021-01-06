export const create = `INSERT INTO students(
	studentnames, parentsemail, parentsphonenumber,regestrationNumber,RegisteredDate,status)
	VALUES ($1, $2, $3, $4,$5,$6) returning *`;
export const update = `UPDATE students
	SET studentnames=$1, parentsemail=$2, parentsphonenumber=$3
	WHERE studentid = $4 returning *`;
export const createStudentLevel = `INSERT INTO student_level(
		studentid, levelid, year)
		VALUES ($1, $2, $3)`;
export const deleteStudent = `UPDATE students
		SET status=$1
		WHERE studentid = $2`;
export const deleteRecord = `delete from students where studentid = $1`;

export const getAll =`select * from students where status = '1'`;
export const getOne = `select students.studentid, studentnames, parentsemail, 
parentsphonenumber,levelname,classname,student_level.year,student_level.levelid
from students inner join student_class on student_class.studentid = students.studentid inner join class on student_class.classid = class.classid
inner join
student_level on students.studentid 
= student_level.studentid inner join levels on levels.levelid = student_level.levelid where students.studentid = $1 and student_level.year =$2`;
export const getByLevel = `select students.studentid, studentnames, parentsemail,
parentsphonenumber,levelname,classname,student_level.year,student_level.levelid
from students inner join student_class on student_class.studentid = students.studentid inner join class on student_class.classid = class.classid
inner join
student_level on students.studentid 
= student_level.studentid inner join levels on levels.levelid =student_level.levelid where student_level.levelid 
= $1 and students.status 
= '1' and student_level.year =$2`;
export const createStudentClass =`INSERT INTO student_class(
	studentid, classid, year)
	VALUES ($1, $2, $3)`;

	export const getAllByClass = `select students.studentid, studentnames, parentsemail, 
	parentsphonenumber,levelname,classname,student_level.year,student_class.classid
	from students inner join student_class on student_class.studentid = students.studentid inner join class on student_class.classid = class.classid
	inner join
	student_level on students.studentid 
	= student_level.studentid inner join levels on levels.levelid =student_level.levelid where student_class.classid 
	= $1 and students.status 
	= '1' and student_class.year =$2`;

	export const getStudentById = `select students.studentid, studentnames, parentsemail, 
	parentsphonenumber
	from students INNER JOIN student_level ON student_level.studentid=students.studentid  where students.studentid =$1`;

// check student exist in database
export const checkStudentExist = `select * from students where studentnames = $1 and parentsphonenumber = $2`;
export const checkExistOnUpdate = `select * from students where studentnames = $1 and parentsphonenumber = $2 and studentid != $3`