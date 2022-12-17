const { readFileSync } = require("fs");

function strategyForRockPaperScissors(filename) {
  // formatting the input data into an array of pairs
  const rawDataIntoPairs = readFileSync(filename, "utf-8");

  // translating letters into r,p,s (part 1 logic)
  const translatedStringUsingPart1Logic = rawDataIntoPairs
    .replace(/X|A/g, "r")
    .replace(/Y|B/g, "p")
    .replace(/Z|C/g, "s")
    .split("\n");

  // translating letters into r,p,s and win,lose,draw (part 2 logic)
  const translatedStringUsingPart2Logic = rawDataIntoPairs
    .replace(/A/g, "r")
    .replace(/B/g, "p")
    .replace(/C/g, "s")
    .replace(/X/g, "l")
    .replace(/Y/g, "d")
    .replace(/Z/g, "w")
    .split("\n");

  // calculate score for part 1
  var resultPart1 = calculateScore(translatedStringUsingPart1Logic);
  console.log(`Calculated score using part 1 is ${resultPart1}.`);

  // manipulate arr 2 to get to format of arr 1
  const scenario2IntoUsableFormat = translatedStringUsingPart2Logic.map(
    (str) => {
      const firstChar = str.charAt(0);
      return str
        .replace(/w/g, getDesiredResult("w", firstChar))
        .replace(/l/g, getDesiredResult("l", firstChar))
        .replace(/d/g, getDesiredResult("d", firstChar));
    }
  );

  var resultPart2 = calculateScore(scenario2IntoUsableFormat);
  console.log(`Calculated score using part 2 is ${resultPart2}.`);
}

function calculateScore(arr) {
  // function to calculate score from array of pairs
  var score = 0;

  arr.forEach((pair) => {
    if (pair.charAt(2) == "r") {
      switch (pair.charAt(0)) {
        case "r":
          score += 4;
          break;
        case "p":
          score++;
          break;
        case "s":
          score += 7;
      }
    } else if (pair.charAt(2) == "p") {
      switch (pair.charAt(0)) {
        case "r":
          score += 8;
          break;
        case "p":
          score += 5;
          break;
        case "s":
          score += 2;
      }
    } else {
      switch (pair.charAt(0)) {
        case "r":
          score += 3;
          break;
        case "p":
          score += 9;
          break;
        case "s":
          score += 6;
      }
    }
  });
  return score;
}

function getDesiredResult(outcome, elfChoice) {
  switch (outcome) {
    case "d":
      return elfChoice;
    case "w":
      if (elfChoice == "r") return "p";
      else if (elfChoice == "p") return "s";
      else return "r";
    case "l":
      if (elfChoice == "r") return "s";
      else if (elfChoice == "p") return "r";
      else return "p";
    default:
      return "error in getting desired result";
  }
}

strategyForRockPaperScissors("day_2/strategy.txt");
