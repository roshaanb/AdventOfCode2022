const { readFileSync } = require("fs");

function countHighestCalories(filename) {
  // formatting the input data into an array

  const rawData = readFileSync(filename, "utf-8");
  const arrayOfCaloriesSeparatedByElf = rawData
    .split("\n")
    .toString()
    .split(",,");

  // creating array of sum of each elf's calories
  const elfCaloriesSummed = arrayOfCaloriesSeparatedByElf.map(
    (stringOfNums) => {
      const nums = stringOfNums.split(",");
      const numsToInts = nums.map((element) => {
        const num = parseInt(element);
        return num;
      });
      return (sum = numsToInts.reduce((accumulator, value) => {
        return accumulator + value;
      }, 0));
    }
  );

  // sorting by most calories
  elfCaloriesSummed.sort(function (a, b) {
    return b - a;
  });

  const elfWithMost = elfCaloriesSummed[0];
  const sumOfHighest3 =
    elfCaloriesSummed[0] + elfCaloriesSummed[1] + elfCaloriesSummed[2];

  console.log(`Elf with most calories has ${elfWithMost} calories.`);
  console.log(`Sum of higest 3 elves is ${sumOfHighest3} calories.`);
}

countHighestCalories("day_1/elvesItems.txt");
