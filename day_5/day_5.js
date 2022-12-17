const { readFileSync } = require("fs");

function supplyStacks(filename) {
  // formatting the input data into an array of assignment pairs
  const rawData = readFileSync(filename, "utf-8").split("\n\n");
  const supplyStacksRaw = rawData[0];
  const instructionsArray = rawData[1].split("\n");

  // adds dummy @ and removes spaces and square brackets
  const formatArray = supplyStacksRaw.split("\n").map((str) =>
    str
      .replace(/    /g, "@")
      .replace(/ /g, "")
      .replace(/[\[\]]/g, "")
      .split("")
  );

  // removes array of numbers
  formatArray.pop();

  const transposedArray = transposeArray(formatArray);

  // removes dummies
  for (i = 0; i < transposedArray.length; i++) {
    transposedArray[i] = transposedArray[i].filter((item) => item !== "@");
  }

  const transposedArray1 = [...transposedArray];
  const transposedArray2 = [...transposedArray];

  const movedArrP1 = moveWithCrane1(transposedArray1, instructionsArray);
  console.log(`Tops of stacks using first crane is ${movedArrP1}.`);

  const movedArrP2 = moveWithCrane2(transposedArray2, instructionsArray);
  console.log(`Tops of stacks using second crane is ${movedArrP2}.`);
}

function transposeArray(array) {
  const newArray = [];
  var arrayLength = array[0].length;

  for (let i = 0; i < arrayLength; i++) {
    newArray[i] = Array(array.length);
  }

  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < arrayLength; j++) {
      newArray[j][i] = array[i][j];
    }
  }

  return newArray;
}

function moveWithCrane1(atc, aoi) {
  // function for moving num from x to y part 1

  while (aoi.length > 0) {
    const arrFromString = aoi[0].split(" ");
    let numInInstruction = parseInt(arrFromString[1]);
    const x = parseInt(arrFromString[3]) - 1;
    const y = parseInt(arrFromString[5]) - 1;

    while (numInInstruction > 0) {
      //moves 1 from x to y
      atc[y] = [atc[x][0], ...atc[y]];
      atc[x] = atc[x].slice(1);
      numInInstruction--;
    }

    aoi = aoi.slice(1);
  }

  const topsOfStack = atc.map((arr) => arr[0]);
  return topsOfStack.join();
}

function moveWithCrane2(arrayToChange, arrOfInstruction) {
  // function for moving num from x to y part 2

  while (arrOfInstruction.length > 0) {
    const arrFromString = arrOfInstruction[0].split(" ");
    let numInInstruction = parseInt(arrFromString[1]);
    const x = parseInt(arrFromString[3]) - 1;
    const y = parseInt(arrFromString[5]) - 1;

    var arrayToAdd = [];

    while (numInInstruction > 0) {
      //moves 1 from x to y
      arrayToAdd = [arrayToChange[x][0], ...arrayToAdd];
      arrayToChange[x] = arrayToChange[x].slice(1);
      numInInstruction--;
    }

    const reversedArrayToAdd = arrayToAdd.reverse();
    arrayToChange[y] = [reversedArrayToAdd, ...arrayToChange[y]];
    arrayToChange = arrayToChange.map((arr) => arr.flat());

    arrOfInstruction = arrOfInstruction.slice(1);
  }
  let topsOfStack = arrayToChange.map((arr) => arr[0]);
  return topsOfStack.join();
}

supplyStacks("day_5/supplyStacksData.txt");
