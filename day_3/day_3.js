const { readFileSync } = require("fs");

function prioritiseRucksack(filename) {
  // formatting the input data into an array of rucksacks
  const rucksacksRawData = readFileSync(filename, "utf-8");
  const rucksackArray = rucksacksRawData.split("\n");

  // splitting rucksack in half
  var arrayOfSplitRucksacks = [];
  for (rucksack of rucksackArray) {
    arrayOfSplitRucksacks.push(rucksack.slice(0, rucksack.length / 2));
    arrayOfSplitRucksacks.push(rucksack.slice(rucksack.length / 2));
  }

  // finding common element as char code part 1
  for (let i = 0; i < arrayOfSplitRucksacks.length; i += 2) {
    for (let j in arrayOfSplitRucksacks[i]) {
      arrayOfSplitRucksacks[i + 1].includes(arrayOfSplitRucksacks[i][j])
        ? (arrayOfSplitRucksacks[i] = arrayOfSplitRucksacks[i][j].charCodeAt(0))
        : false;
    }
  }

  // calculate score for part 1
  const resultPart1 = calculateScore1(arrayOfSplitRucksacks);
  console.log(`Calculated score using part 1 is ${resultPart1}.`);

  // finding common element as char code part 2
  for (let i = 0; i < rucksackArray.length; i += 3) {
    for (let j in rucksackArray[i]) {
      if (
        rucksackArray[i + 1].includes(rucksackArray[i][j]) &&
        rucksackArray[i + 2].includes(rucksackArray[i][j])
      ) {
        rucksackArray[i] = rucksackArray[i][j].charCodeAt(0);
      }
    }
  }

  // calculate score for part 2
  const resultPart2 = calculateScore2(rucksackArray);
  console.log(`Calculated score using part 2 is ${resultPart2}.`);
}

function calculateScore1(arr) {
  var score = 0;
  for (let i = 0; i < arr.length; i += 2) {
    arr[i] > 91 ? (score += arr[i] - 96) : (score += arr[i] - 38);
  }
  return score;
}

function calculateScore2(arr) {
  var score = 0;
  for (let i = 0; i < arr.length; i += 3) {
    arr[i] > 91 ? (score += arr[i] - 96) : (score += arr[i] - 38);
  }
  return score;
}

prioritiseRucksack("day_3/rucksackData.txt");
