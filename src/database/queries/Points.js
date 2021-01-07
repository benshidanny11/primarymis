export const getAll = ``;
export const create = `INSERT INTO points(
	levelid, subjectname, catone, cattwo, exam, studentid, teacherid,term)
    VALUES ($1, $2, $3, $4, $5, $6, $7,$8) returning *`;

/*
    studentid INTEGER,
                 term varchar(10), classid INTEGER, levelid INTEGER, totalmarks FLOAT,
    */
export const createPosition = `INSERT INTO positions(
        studentid, term, levelid, totalmarks)
        VALUES ($1, $2, $3, $4) returning *`;
export const updatePositions = `UPDATE positions
        SET totalmarks=$1
        WHERE studentid = $2 and term = $3 and  levelid=$4 returning *`;

export const update = `UPDATE points
	SET catone=$1, cattwo=$2, exam=$3
    WHERE levelid = $4 and subjectname = $5 and studentid =$6 returning *`;
export const addCatTwoPoint = `UPDATE points
	SET cattwo=$1
    WHERE levelid = $2 and subjectname = $3 and studentid =$4`;
export const addExamPoint = `UPDATE points
	SET exam=$1
    WHERE levelid = $2 and subjectname = $3 and studentid =$4`;

export const getBysubjects = `SELECT subjects.levelid, subjects.subjectname, catone, cattwo, exam,term, students.studentid, teacherid,catMax,examMax,studentNames,regestrationNumber,levelName
    FROM points inner join students 
    on students.studentid = points.studentid 
    inner join subjects 
    on subjects.subjectname = points.subjectname 
    and subjects.levelid 
    =points.levelid 
    inner join levels 
    on levels.levelid 
    = points.levelid 
    WHERE points.levelid 
    = $1 and points.subjectname = $2`;

export const getByStudent = `SELECT subjects.levelid, 
    subjects.subjectname, catone,term,
    cattwo, exam, students.studentid, teacherid,catMax,examMax,studentNames,levelName,term
    FROM points inner join students 
    on students.studentid = points.studentid 
    inner join subjects 
    on subjects.subjectname = points.subjectname 
    and subjects.levelid 
    =points.levelid 
    inner join levels 
    on levels.levelid 
    = points.levelid
    WHERE points.studentid 
    = $1`;
export const getByClass = `SELECT subjects.levelid, subjects.subjectname, catone,term, cattwo, exam, st.studentid, teacherid,catMax,examMax,studentNames,levelName,classid
    FROM points inner join students as st
    on st.studentid = points.studentid inner join student_class as sc on st.studentid = sc.studentid
    inner join subjects 
    on subjects.subjectname = points.subjectname 
    and subjects.levelid 
    =points.levelid 
    inner join levels 
    on levels.levelid 
    = points.levelid 
   WHERE sc.classid = $1`;

export const getBysubjectsInTerm = `SELECT subjects.levelid, 
   subjects.subjectname, catone,
   cattwo, exam, students.studentid, teacherid,catMax,examMax,studentNames,levelName,term
   FROM points inner join students 
   on students.studentid = points.studentid 
   inner join subjects 
   on subjects.subjectname = points.subjectname 
   and subjects.levelid 
   =points.levelid 
   inner join levels 
   on levels.levelid 
   = points.levelid 
   WHERE points.levelid 
   = $1 and points.subjectname = $2 and points.term = $3`;

export const getByStudentInTerm = `SELECT subjects.levelid, 
   subjects.subjectname, catone, cattwo, exam, students.studentid, 
   teacherid,catMax,examMax,studentNames,levelName,term
   FROM points inner join students 
   on students.studentid = points.studentid 
   inner join subjects 
   on subjects.subjectname = points.subjectname 
   and subjects.levelid 
   =points.levelid 
   inner join levels 
   on levels.levelid 
   = points.levelid 
   WHERE points.studentid 
   = $1 and points.term = $2`;
export const getByClassInTerm = `SELECT subjects.levelid, subjects.subjectname, catone, cattwo,term,
   exam, st.studentid, teacherid,catMax,examMax,studentNames,
   levelName,classid,term
   FROM points inner join students as st
   on st.studentid = points.studentid inner join student_class as sc on st.studentid = sc.studentid
   inner join subjects 
   on subjects.subjectname = points.subjectname 
   and subjects.levelid 
   =points.levelid 
   inner join levels 
   on levels.levelid 
   = points.levelid 
  WHERE sc.classid = $1 and points.term = $2`;

  //export const getPositionsByClass = `SELECT * from position WHERE classid = $1`;
  export const checkIfItsNoFirst = `SELECT * from positions WHERE studentid =$1 and levelid=$2 and term=$3`;
  export const getPositionsByClassInTerm = `SELECT * from positions inner join student_class on positions.studentid=student_class.studentid inner join  class on class.classid=student_class.classid WHERE term=$1 and class.classid=$2`;

  export const getPositionsByClassInYear=`SELECT DISTINCT ON (studentid)  positions.studentid,sum(totalmarks) as anualtotal FROM positions inner join student_class on positions.studentid=student_class.studentid  inner join  class on class.classid=student_class.classid WHERE class.classid=$1
  group by positions.studentid`;
  export const totalStudentMarks = `SELECT sum(catone+cattwo+exam)  as totalStudentMarks FROM points where studentid=$1 and levelid=$2 and term=$3`;
  export const getStudentClass=`select student_class.classid  from student_class  where student_class.studentid=$1`;

export const catOneSumPerTerm = `SELECT sum(catone) as catoneSumInTerm FROM points where studentid=$1 and levelid=$2 and term=$3`;
export const catOneSumPerYear = `SELECT sum(catone) as catoneSumInYer FROM points where studentid=$1 and levelid=$2`;
export const catTwoSumPerTerm = `SELECT sum(cattwo) as cattwoSumInTerm FROM points where studentid=$1 and levelid=$2 and term=$3`;
export const catTwoSumPerYear = `SELECT sum(cattwo) as cattwoSumInYear FROM points where studentid=$1 and levelid=$2`;
export const examSumPerTerm = `SELECT sum(exam)  as examSumPerTerm FROM points where studentid=$1 and levelid=$2 and term=$3`;
export const examSumPerYear = `SELECT sum(exam)  as examSumPerYear FROM points where studentid=$1 and levelid=$2`;
export const maxMarks = `SELECT sum(catmax) as catmax, sum(exammax) as exammax, sum(catmax+exammax) as totalmax from subjects`;
export const avoidDuplicates = `SELECT * FROM points WHERE studentid =$1 and levelid=$2 and subjectname=$3 and term=$4`;
export const checkIfCatMaxIsOut=`SELECT catmax from subjects where subjectname=$1 and levelid=$2 and status='1'`;
export const checkIfExamMaxIsOut=`SELECT exammax from subjects where subjectname=$1 and levelid=$2 and status='1'`;
export const getStudentWithoutMarks = `SELECT students.studentid, studentnames, parentsemail, 
    parentsphonenumber, regestrationnumber,levelid, subjectname, 
    catone, cattwo, exam, teacherid, term
        FROM students Left JOIN points on students.studentid = points.studentid
         where points.levelid is null and points.subjectname is null or term !=$1;`;
export const getStudentsWithMarks=`SELECT students.studentid, studentnames, parentsemail, 
parentsphonenumber, regestrationnumber,levelid, subjectname, 
catone, cattwo, exam, teacherid, term
    FROM students inner join points on 
    students.studentid = points.studentid where points.levelid = $1
     and points.subjectname = 'English' and term =$2;`