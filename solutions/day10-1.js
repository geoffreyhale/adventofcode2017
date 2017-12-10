const input = `157,222,1,2,177,254,0,228,159,140,249,187,255,51,76,30`;
const lengths = input.split(/[,]+/).map(length => parseInt(length.trim()));
console.log("lengths:", lengths);

let list = [];
for (let i = 0; i < 256; i++) {
    list.push(i);
}
console.log("list:", list);

let currentPosition = 0;
let skipSize = 0;
let round = 0;

for (length of lengths) {
    round++; console.log("Round: ", round);
    let revArray = [];
    let regArray1 = [];
    let regArray2 = [];
    if ((currentPosition + length) > list.length) {
        regArray1 = list.slice(((currentPosition + length) % list.length), currentPosition);
        revArray = list.slice(currentPosition);
        revArray = revArray.concat(list.slice(0,(currentPosition + length) % list.length));
    } else {
        regArray1 = list.slice(0,currentPosition);
        revArray = list.slice(currentPosition, currentPosition + length);
        regArray2 = list.slice(currentPosition + length);
    }
    revArray.reverse();
    let newArray = [];
    if ((currentPosition + length) > list.length) {
        newArray = revArray.slice(revArray.length - (currentPosition + length) % list.length);
        newArray = newArray.concat(regArray1);
        newArray = newArray.concat(revArray.slice(0, revArray.length - (currentPosition + length) % list.length));
    } else {
        newArray = regArray1;
        newArray = newArray.concat(revArray);
        newArray = newArray.concat(regArray2);
    }
    list = newArray;
    console.log("newArray:",newArray);

    currentPosition = (currentPosition + length + skipSize) % list.length;
    skipSize++;
}

console.log("Part 1 Solution: ", list[0] * list[1]);