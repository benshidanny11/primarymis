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
} from "../database/queries/Points";
import db from "../database/connection/query";

export const getReportSumationInTerm = async (payload) => {
  let sumCatOnePerTerm = await db.query(catOneSumPerTerm, [payload[0],payload[1],payload[2]]);
  if (sumCatOnePerTerm) {
    let sumCatTwoPerTerm = await db.query(catTwoSumPerTerm, [payload[0],payload[1],payload[2]]);
    if (sumCatTwoPerTerm) {
      let examSumPerTermRes = await db.query(examSumPerTerm, [payload[0],payload[1],payload[2]]);
      if (examSumPerTermRes) {
        let maxkMarksRes = await db.query(maxMarks,[payload[1]]);
        if (maxkMarksRes) {
          const classIdRes = await db.query(getStudentClass, [payload[0]]);
          console.log(classIdRes.rows[0]);
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
          return {
            report: {
              catOneSumInTerm: sumCatOnePerTerm.rows[0].catonesuminterm,
              catTwoSumInTerm: sumCatTwoPerTerm.rows[0].cattwosuminterm,
              examSumInTerm: examSumPerTermRes.rows[0].examsumperterm,
              maxMarks: maxkMarksRes.rows[0],
              average,
              position: getStudentPosition(positionsByClass.rows, payload[0]),
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
        let maxkMarksRes = await db.query(maxMarks);
        if (maxkMarksRes) {
          const classIdRes = await db.query(getStudentClass, [payload[0]]);
          const anualPositions = await db.query(getPositionsByClassInYear, [
            classIdRes.rows[0].classid,
          ]);
          console.log(maxkMarksRes.rows[0]);

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
              totalMarksPerYear:sumCatOnePerYear.rows[0].catonesuminyer +sumCatTwoPerYear.rows[0].cattwosuminyear + examSumResPerYear.rows[0].examsumperyear ,
              maxMarks: {
                maxCatMarksPerYer: maxkMarksRes.rows[0].catmax * 3,
                maxExamMarksPerYer: maxkMarksRes.rows[0].exammax * 3,
                maxTotalMarksPerYer:maxkMarksRes.rows[0].totalmax*3
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
