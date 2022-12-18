const { readFileSync } = require("fs");

const rawData = readFileSync("day_6/datastreamBuffer.txt", "utf-8").split("");

function messageMarker(array, num) {
  // add num dummies to bool array
  var boolArr = [];
  for (j = 0; j < num; j++) {
    boolArr.push("@");
  }

  let i = 0;
  while (true) {
    var arrOf14 = [];
    for (j = 0; j < num; j++) {
      arrOf14.push(array[i + j]);
    }
    if (containsDuplicate(arrOf14)) {
      boolArr.push(true);
    } else {
      boolArr.push(false);
      break;
    }
    i++;
  }
  return boolArr;
}

function containsDuplicate(array) {
  var arrayCopy = [...array];
  var resultsArr = [];
  for (i = 0; i < array.length; i++) {
    arrayCopy.shift();
    resultsArr.push(arrayCopy.includes(array[i]));
  }
  return resultsArr.includes(true);
}

// const arrayOfPacketBools = packetMarker(rawData);
// console.log(arrayOfPacketBools.indexOf(false));

const arrayOfPacketBools = messageMarker(rawData, 4);
const arrayOfMessageBools = messageMarker(rawData, 14);

console.log(
  `${arrayOfPacketBools.indexOf(
    false
  )} characters need to be processed before the first start-of-packet marker is detected.`
);
console.log(
  `${arrayOfMessageBools.indexOf(
    false
  )} characters need to be processed before the first start-of-message marker is detected.`
);
