// query to create tables
export const createUserTable = `CREATE TABLE IF NOT EXISTS users(userId SERIAL PRIMARY KEY,
    names VARCHAR(100) NOT NULL,email VARCHAR(255) NOT NULL UNIQUE,
phoneNumber VARCHAR(13) NOT NULL UNIQUE,
role VARCHAR(40) NOT NULL,
password VARCHAR(1024) NOT NULL,status VARCHAR(10) NOT NULL,RegisteredDate date not null)`;
export const CreateStudentTable = `CREATE TABLE IF NOT EXISTS students(studentId SERIAL PRIMARY KEY,
    studentNames VARCHAR(100) NOT NULL,
    parentsEmail VARCHAR(255) NOT NULL,
    parentsPhoneNumber VARCHAR(13) NOT NULL,
    regestrationNumber Varchar(200) NOT NULL,
    RegisteredDate date not null,
    status VARCHAR(10) NOT NULL)`;
export const createlevelTable = `CREATE TABLE IF NOT EXISTS levels(levelId SERIAL PRIMARY KEY,
    levelName VARCHAR(100) NOT NULL UNIQUE,
    status VARCHAR(10) NOT NULL)`;
export const createPositionTable = `CREATE TABLE IF NOT EXISTS positions(studentid INTEGER,
                 term varchar(10), levelid INTEGER, totalmarks FLOAT, year varchar(50) not null,PRIMARY KEY(studentid,term,levelid,year))`;

export const createClassTable = `CREATE TABLE IF NOT EXISTS class(classId  SERIAL PRIMARY KEY, 
    className VARCHAR(100) NOT NULL UNIQUE,teacherID integer not null UNIQUE,
    levelID INTEGER not null,
    status varchar(5) not null,
    FOREIGN KEY(teacherID) REFERENCES users(userId) on delete cascade on update cascade,
    FOREIGN KEY(levelID) REFERENCES levels(levelId) on delete cascade on update cascade)`;
export const createSubjectTable = `CREATE TABLE IF NOT EXISTS subjects(
    subjectName VARCHAR(100) NOT NULL,
    catMax integer,
    examMax integer,
    levelId integer not null,
    status varchar(10) not null,
    
    FOREIGN KEY(levelID) REFERENCES levels(levelId) on delete cascade on update cascade)`;
export const createTeacherSubjectTable = `CREATE TABLE IF NOT EXISTS subjects_teachers(teacherId integer not null,
    levelID integer not null,
    subjectName varchar(100) not null,
    PRIMARY KEY(subjectName,levelID),
    FOREIGN KEY(subjectName,levelID) REFERENCES subjects(subjectName,levelID) on delete cascade on update cascade,
    FOREIGN KEY(teacherID) REFERENCES users(userId) on delete cascade on update cascade)`;
export const createPointTable = `CREATE TABLE IF NOT EXISTS points(
    levelID integer not null,
    subjectName varchar(100) not null,
    catOne float default 0.0,
    catTwo float default  0.0,
    exam float default 0.0,
    studentId integer not null,
    teacherId integer not null,
    term varchar(50) not null,
    year varchar(50) not null,
    PRIMARY KEY(studentId,subjectName,levelID,term,year),
    FOREIGN KEY(subjectName,levelID) REFERENCES subjects(subjectName,levelID) on delete cascade on update cascade,
    FOREIGN KEY(teacherID) REFERENCES users(userId) on delete cascade on update cascade,
    FOREIGN KEY(studentId) REFERENCES students(studentId ) on delete cascade on update cascade)`;
export const createStudentLevelTable = `CREATE TABLE IF NOT EXISTS student_level(studentID integer not null,levelId integer not null,year varchar(10) not null,
    PRIMARY KEY(studentId,year),
    FOREIGN KEY(studentId) REFERENCES students(studentId) on delete cascade on update cascade,
    FOREIGN KEY(levelId) REFERENCES levels(levelId) on delete cascade on update cascade)`;
export const createStudentClassTable = `CREATE TABLE IF NOT EXISTS student_class(studentID integer not null,classId integer not null,year varchar(10) not null,
    PRIMARY KEY(studentId,year),
    FOREIGN KEY(studentId) REFERENCES students(studentId) on delete cascade on update cascade,
    FOREIGN KEY(classId) REFERENCES class(classId) on delete cascade on update cascade)`;

export const createSchoolProfileTable = `CREATE TABLE IF NOT EXISTS schoolprofile(school_id integer not null,school_name varchar(255) not null unique,schoolLogo varchar(255) not null,schoolEmail varchar(255) unique,schoolPhone varchar(255) unique,schoolWebsite varchar(255) unique,
    province varchar(255) not null,district varchar(255) not null, sector varchar(255) not null, RegisteredDate date not null,
    PRIMARY KEY(school_id,school_name))`;
// query to drop tables
export const dropUserTable = `DROP TABLE IF EXISTS users`;
export const dropSchoolProfileTable = `DROP TABLE IF EXISTS schoolprofile`;
export const dropStudentTable = `DROP TABLE IF EXISTS students`;
export const dropLevelTable = `DROP TABLE IF EXISTS levels`;
export const dropClassTable = `DROP TABLE IF EXISTS class`;
export const dropSubjectTbale = `DROP TABLE IF EXISTS subjects`;
export const dropPointTable = `DROP TABLE IF EXISTS points`;
export const dropSubjectTeacherTable = `DROP TABLE IF EXISTS subjects_teachers`;
export const dropStudentLevelTable = `DROP TABLE IF EXISTS student_level`;
export const dropStudentClassTable = `DROP TABLE IF EXISTS student_class`;
