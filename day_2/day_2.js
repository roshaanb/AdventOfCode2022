const { readFileSync } = require("fs");

function strategy(filename) {
  // formatting the input data into an array of pairs
  const rawDataIntoPairs = readFileSync(filename, "utf-8");

  // translating letters into r,p,s
  const translatedString = rawDataIntoPairs
    .replace(/X|A/g, "r")
    .replace(/Y|B/g, "p")
    .replace(/Z|C/g, "s");

  // turn pairs into an array and manipulate
  const arrayOfPairs = translatedString.split("\n");
  var score = 0;

  // calculate score
  arrayOfPairs.forEach((pair) => {
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

  console.log(score);
}

strategy("day_2/strategy.txt");
