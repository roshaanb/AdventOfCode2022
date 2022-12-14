const { readFileSync } = require("fs");
const range = require("lodash.range");

function assignmentRanges(filename) {
  // formatting the input data into an array of assignment pairs
  const assignmentsRaw = readFileSync(filename, "utf-8").split("\n");
  const assignmentPairsArray = assignmentsRaw.map((pair) => pair.split(","));

  // initialise array of ranges
  const arrayIntoRanges = [];

  // flatten array and add to arrays of ranges
  for (i = 0; i < assignmentPairsArray.length; i++) {
    for (j = 0; j < assignmentPairsArray[i].length; j++) {
      assignmentPairsArray[i][j] = assignmentPairsArray[i][j].split("-");
    }
    assignmentPairsArray[i] = assignmentPairsArray[i].flat();
    arrayIntoRanges.push(
      range(
        assignmentPairsArray[i][0],
        parseInt(assignmentPairsArray[i][1]) + 1
      )
    );
    arrayIntoRanges.push(
      range(
        assignmentPairsArray[i][2],
        parseInt(assignmentPairsArray[i][3]) + 1
      )
    );
  }

  let countOfFullyContainedAssignments = 0;

  // add to score if array containment
  for (i = 0; i < arrayIntoRanges.length; i += 2) {
    const arr1 = arrayIntoRanges[i];
    const arr2 = arrayIntoRanges[i + 1];
    const trueIfArr1ContainsArr2 = arr1.every((element) => {
      return arr2.includes(element);
    });
    const trueIfArr2ContainsArr1 = arr2.every((element) => {
      return arr1.includes(element);
    });

    trueIfArr1ContainsArr2 || trueIfArr2ContainsArr1
      ? countOfFullyContainedAssignments++
      : false;
  }

  let countOfOverlappingAssignments = 0;

  for (i = 0; i < arrayIntoRanges.length; i += 2) {
    const arr1 = arrayIntoRanges[i];
    const arr2 = arrayIntoRanges[i + 1];
    const trueIfAnyArr1ContainedInArr2 = arr1.some((element) => {
      return arr2.includes(element);
    });
    const trueIfAnyArr2ContainedInArr1 = arr2.some((element) => {
      return arr1.includes(element);
    });

    trueIfAnyArr1ContainedInArr2 || trueIfAnyArr2ContainedInArr1
      ? countOfOverlappingAssignments++
      : false;
  }

  console.log(assignmentPairsArray);
  console.log(arrayIntoRanges);
  console.log(countOfFullyContainedAssignments);
  console.log(countOfOverlappingAssignments);
}

assignmentRanges("day_4/assignmentsData.txt");
