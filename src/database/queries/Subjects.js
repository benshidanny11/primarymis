export const getAll = `SELECT subjects.subjectname, catmax, exammax, subjects.levelid,teacherid,names 
FROM subjects inner join subjects_teachers on subjects.levelid
= subjects_teachers.levelid and subjects.subjectname= subjects_teachers.subjectname inner join users 
on users.userid = subjects_teachers.teacherid where subjects.status ='1'`;
export const getByLevel = `SELECT subjects.subjectname, catmax, exammax, subjects.levelid,teacherid,names 
FROM subjects inner join subjects_teachers on subjects.levelid
= subjects_teachers.levelid and subjects.subjectname= subjects_teachers.subjectname inner join users 
on users.userid = subjects_teachers.teacherid where subjects.status ='1' and subjects.levelid =$1`;
export const getOne = `select *from subjects where subjects.status = '1' and subjects.subjectname = $1 and levelid= $2`;
export const asignTeacherOnSubject = `INSERT INTO subjects_teachers(
	teacherid, levelid, subjectname)
    VALUES ($1, $2, $3)`;
export const create = `INSERT INTO subjects(
        subjectname, catmax, exammax, levelid, status)
        VALUES ($1, $2, $3, $4, $5) returning *`;
export const update = `UPDATE subjects
        SET subjectname=$1,  levelid=$2,catmax=$3, exammax=$4
        WHERE subjectname = $5 and levelid =$2 returning *`;

export const updateTecherSubject = `UPDATE subjects_teachers
SET subjectname=$1, teacherid=$2
WHERE subjectname = $1 and levelid =$3 returning *`;

export const hidesubjects = `UPDATE subjects
        SET status='0'
        WHERE where subjectname = $1 and levelid =$2`;
export const deleteSubject = `DELETE FROM subjects
        WHERE subjectname = $1 and levelid =$2`;
//retrieve all subject assigned to one teacher
export const getSubjectByTeacher = `SELECT subjects_teachers.teacherid, subjects_teachers.levelid, subjects.subjectname,subjects.catmax,subjects.exammax
FROM subjects_teachers inner join subjects on subjects_teachers.subjectname=subjects.subjectname where teacherid =$1`;

export const searchSubject = `SELECT subjects.subjectname, catmax, exammax, subjects.levelid,teacherid,names 
FROM subjects inner join subjects_teachers on subjects.levelid
= subjects_teachers.levelid and subjects.subjectname= subjects_teachers.subjectname inner join users 
on users.userid = subjects_teachers.teacherid where subjects.status ='1' and subjects.levelid =$1 and position(LOWER($2) in LOWER(subjects.subjectname) || LOWER(names))>0`;


// get all subject for point middleware

export const getByLevelforMid = `SELECT subjectname,levelid 
FROM subjects where status ='1' and levelid =$1`;
