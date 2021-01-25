import { async } from "regenerator-runtime";
import {
  catOneSumPerTerm,
  catOneSumPerYear,
  catTwoSumPerTerm,
  catTwoSumPerYear,
  examSumPerTerm,
  examSumPerYear,
  maxMarks,
  getPositionsByClassInTerm,
  getStudentClass,
  getPositionsByClassInYear,
  getNumberOfStudentsInClass,
  catOneSumPerTerm1,
  catOneSumPerTerm2,
  catOneSumPerTerm3,
  catTwoSumPerTerm1,
  catTwoSumPerTerm2,
  catTwoSumPerTerm3,
  examSumPerTerm1,
  examSumPerTerm2,
  examSumPerTerm3,
  getPositionsByClassInTerm1,
  getPositionsByClassInTerm2,
  getPositionsByClassInTerm3,
} from "../database/queries/Points";
import db from "../database/connection/query";

export const getReportSumationInTerm = async (payload) => {
  let sumCatOnePerTerm = await db.query(catOneSumPerTerm, [
    payload[0],
    payload[1],
    payload[2],
    payload[4],
  ]);
  if (sumCatOnePerTerm) {
    let sumCatTwoPerTerm = await db.query(catTwoSumPerTerm, [
      payload[0],
      payload[1],
      payload[2],
      payload[4],
    ]);
    if (sumCatTwoPerTerm) {
      let examSumPerTermRes = await db.query(examSumPerTerm, [
        payload[0],
        payload[1],
        payload[2],
        payload[4],
      ]);
      if (examSumPerTermRes) {
        let maxkMarksRes = await db.query(maxMarks, [payload[1]]);
        if (maxkMarksRes) {
          const classIdRes = await db.query(getStudentClass, [
            payload[0],
            payload[4],
          ]);
          const positionsByClass = await db.query(getPositionsByClassInTerm, [
            payload[2],
            classIdRes.rows[0].classid,
          ]);
          const average =
            ((sumCatOnePerTerm.rows[0].catonesuminterm +
              sumCatTwoPerTerm.rows[0].cattwosuminterm +
              examSumPerTermRes.rows[0].examsumperterm) *
              100) /
            maxkMarksRes.rows[0].totalmax;
          const numberOfStudents = await db.query(getNumberOfStudentsInClass, [
            classIdRes.rows[0].classid,
          ]);
          const studentsInClass =
            numberOfStudents.rows[0].numberofstudentsinclass;
          const classname = numberOfStudents.rows[0].classname;
          return {
            report: {
              catOneSumInTerm: sumCatOnePerTerm.rows[0].catonesuminterm,
              catTwoSumInTerm: sumCatTwoPerTerm.rows[0].cattwosuminterm,
              examSumInTerm: examSumPerTermRes.rows[0].examsumperterm,
              maxMarks: maxkMarksRes.rows[0],
              average,
              position: getStudentPosition(positionsByClass.rows, payload[0]),
              studentsInClass,
              classname,
            },
          };
        } else {
          return {
            status: 400,
            message: "Error occured on markMarksRes query",
          };
        }
      } else {
        return {
          status: 400,
          message: "Error occured on examSumPerTerm query",
        };
      }
    } else {
      return {
        status: 400,
        message: "Error occured on sumCatTwoPerTerm query",
      };
    }
  } else {
    return { status: 400, message: "Error occured on sumCatOnePerTerm query" };
  }
};

export const getReportSumationInYear = async (payload) => {
  let sumCatOnePerYear = await db.query(catOneSumPerYear, payload);
  if (sumCatOnePerYear) {
    let sumCatTwoPerYear = await db.query(catTwoSumPerYear, payload);
    if (sumCatTwoPerYear) {
      let examSumResPerYear = await db.query(examSumPerYear, payload);
      if (examSumResPerYear) {
        let maxkMarksRes = await db.query(maxMarks, [payload[1]]);
        if (maxkMarksRes) {
          //Term 1 queries
          let catOneSumPerTerm1Res = await db.query(catOneSumPerTerm1, payload);
          let catTwoSumPerTerm1Res = await db.query(catTwoSumPerTerm2, payload);
          let examSumPerTerm1Res = await db.query(examSumPerTerm1, payload);

          //Term 2 queries
          let catOneSumPerTerm2Res = await db.query(catOneSumPerTerm2, payload);
          let catTwoSumPerTerm2Res = await db.query(catTwoSumPerTerm2, payload);
          let examSumPerTerm2Res = await db.query(examSumPerTerm2, payload);

          //Term 3 queries
          let catOneSumPerTerm3Res = await db.query(catOneSumPerTerm3, payload);
          let catTwoSumPerTerm3Res = await db.query(catTwoSumPerTerm2, payload);
          let examSumPerTerm3Res = await db.query(examSumPerTerm3, payload);

          const classIdRes = await db.query(getStudentClass, [
            payload[0],
            payload[2],
          ]);
          const anualPositions = await db.query(getPositionsByClassInYear, [
            classIdRes.rows[0].classid,
            payload[2],
          ]);

          let positonTerm1Res = await db.query(getPositionsByClassInTerm1, [
            classIdRes.rows[0].classid,
          ]);
          let positonTerm2Res = await db.query(getPositionsByClassInTerm2, [
            classIdRes.rows[0].classid,
          ]);
          let positonTerm3Res = await db.query(getPositionsByClassInTerm3, [
            classIdRes.rows[0].classid,
          ]);
          //  console.log(classIdRes.rows[0].classid);

          //{ catmax: '210', exammax: '280', totalmax: '490' }
          const average =
            ((sumCatOnePerYear.rows[0].catonesuminyer +
              sumCatTwoPerYear.rows[0].cattwosuminyear +
              examSumResPerYear.rows[0].examsumperyear) *
              100) /
            (maxkMarksRes.rows[0].totalmax * 3);
          return {
            report: {
              catOneSumInTerm: sumCatOnePerYear.rows[0].catonesuminyer,
              catTwoSumInTerm: sumCatTwoPerYear.rows[0].cattwosuminyear,
              examSumInTerm: examSumResPerYear.rows[0].examsumperyear,
              dataForTerms: {
                term1: {
                  catOneSum: catOneSumPerTerm1Res.rows[0],
                  catTwoSum: catTwoSumPerTerm1Res.rows[0],
                  examSum: examSumPerTerm1Res.rows[0],
                  position: getStudentPosition(positonTerm1Res.rows,payload[0]),
                },
                term2: {
                  catOneSum: catOneSumPerTerm2Res.rows[0],
                  catTwoSum: catTwoSumPerTerm2Res.rows[0],
                  examSum: examSumPerTerm2Res.rows[0],
                  position: getStudentPosition(positonTerm2Res.rows,payload[0]),
                },
                term3: {
                  catOneSum: catOneSumPerTerm3Res.rows[0],
                  catTwoSum: catTwoSumPerTerm3Res.rows[0],
                  examSum: examSumPerTerm1Res.rows[0],
                  position: getStudentPosition(positonTerm3Res.rows,payload[0]),
                },
              },

              totalMarksPerYear:
                sumCatOnePerYear.rows[0].catonesuminyer +
                sumCatTwoPerYear.rows[0].cattwosuminyear +
                examSumResPerYear.rows[0].examsumperyear,
              maxMarks: {
                maxCatMarks: maxkMarksRes.rows[0].catmax,
                maxExamMarks: maxkMarksRes.rows[0].exammax,
                maxTotalMarks: maxkMarksRes.rows[0].totalmax,
              },
              average,
              position: getStudentPosition(anualPositions.rows, payload[0]),
            },
          };
        } else {
          return {
            status: 400,
            message: "Error occured on markMarksRes query",
          };
        }
      } else {
        return {
          status: 400,
          message: "Error occured on examSumPerTerm query",
        };
      }
    } else {
      return {
        status: 400,
        message: "Error occured on sumCatTwoPerTerm query",
      };
    }
  } else {
    return { status: 400, message: "Error occured on sumCatOnePerTerm query" };
  }
};

export const getStudentPosition = (students = [], studentid) => {
  const sorted = students.sort(compare);
  let position = 0;
  for (let i = 0; i < sorted.length; i++) {
    if (sorted[i].studentid === studentid) {
      position = i + 1;
      break;
    }
  }
  return position;
};

export const compare = (stundent1, stundent2) => {
  const marks1 = stundent1.totalmarks;
  const marks2 = stundent2.totalmarks;

  let comparison = 0;
  if (marks1 > marks2) {
    comparison = -1;
  } else if (marks1 < marks2) {
    comparison = 1;
  }
  return comparison;
};
