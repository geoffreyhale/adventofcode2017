const input = `157,222,1,2,177,254,0,228,159,140,249,187,255,51,76,30`;
let lengths = input.split('').map(char => char.charCodeAt());
const salt = `17, 31, 73, 47, 23`.split(/[,]+/).map(length => parseInt(length.trim()));
//console.log("salt:",salt);
lengths = lengths.concat(salt);
console.log("lengths:", lengths);

let list = [];
for (let i = 0; i < 256; i++) {
    list.push(i);
}
//console.log("list:", list);

const processRound = (lengths, currentPosition, skipSize) => {
    for (length of lengths) {
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
        //console.log("newArray:",newArray);

        currentPosition = (currentPosition + length + skipSize) % list.length;
        skipSize++;
    }

    return [lengths, currentPosition, skipSize];
}

let currentPosition = 0;
let skipSize = 0;
for (let j = 0; j < 64; j++) {
    [lengths, currentPosition, skipSize] = processRound(lengths, currentPosition, skipSize);
}

let sparseHash = list;
console.log("sparseHash:", sparseHash);

let denseHash = [];
for (let k = 0; k < 255; k += 16) {
    denseHash.push(sparseHash[k] ^ sparseHash[k+1] ^ sparseHash[k+2] ^ sparseHash[k+3] ^ sparseHash[k+4] ^ sparseHash[k+5] ^ sparseHash[k+6] ^ sparseHash[k+7] ^ sparseHash[k+8] ^ sparseHash[k+9] ^ sparseHash[k+10] ^ sparseHash[k+11] ^ sparseHash[k+12] ^ sparseHash[k+13] ^ sparseHash[k+14] ^ sparseHash[k+15]);
}
console.log("denseHash:", denseHash);

let KnotHash = '';
for (dec of denseHash) {
    const hex = dec.toString(16);
    const hexPad = (hex.length < 2) ? ("0" + hex) : hex;
    console.log(hexPad);
    KnotHash += hexPad;
}
console.log("solution (Knot Hash): ", KnotHash);
//2b0c9cc0449507a0db3babd57ad9e8d8