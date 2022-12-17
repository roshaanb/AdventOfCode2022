const { readFileSync } = require("fs");

function supplyStacks(filename) {
  // formatting the input data into an array of assignment pairs
  const rawData = readFileSync(filename, "utf-8").split("\n\n");
  const supplyStacksRaw = rawData[0];

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

  const movedArrP1 = moveWithCrane1(transposedArray1, rawData[1].split("\n"));
  console.log(movedArrP1);

  const movedArrP2 = moveWithCrane2(transposedArray2, rawData[1].split("\n"));
  console.log(movedArrP2);
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
  // atc is arrayToChange;
  // aoi is arrOfInstructions;

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

function moveWithCrane2(atc, aoi) {
  // function for moving num from x to y part 2
  // atc is arrayToChange;
  // aoi is arrOfInstructions;

  while (aoi.length > 0) {
    const arrFromString = aoi[0].split(" ");
    let numInInstruction = parseInt(arrFromString[1]);
    const x = parseInt(arrFromString[3]) - 1;
    const y = parseInt(arrFromString[5]) - 1;

    var arrayToAdd = [];

    while (numInInstruction > 0) {
      //moves 1 from x to y
      arrayToAdd = [atc[x][0], ...arrayToAdd];
      atc[x] = atc[x].slice(1);
      numInInstruction--;
    }

    const reversedArrayToAdd = arrayToAdd.reverse();
    atc[y] = [reversedArrayToAdd, ...atc[y]];
    atc = atc.map((arr) => arr.flat());

    aoi = aoi.slice(1);
  }
  let topsOfStack = atc.map((arr) => arr[0]);
  return topsOfStack.join();
}

supplyStacks("day_5/supplyStacksData.txt");