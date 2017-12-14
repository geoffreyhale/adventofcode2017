const processRound = (lengths, currentPosition, skipSize, list) => {
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

        currentPosition = (currentPosition + length + skipSize) % list.length;
        skipSize++;
    }

    return [lengths, currentPosition, skipSize, list];
};

function checkHex(n){return/^[0-9A-Fa-f]{1,64}$/.test(n)}
function Hex2Bin(n){if(!checkHex(n))return 0;return parseInt(n,16).toString(2)}



const rowBinFromKnotHash = (input) => {
    //console.log("input:",input);
    let lengths = input.split('').map(char => char.charCodeAt());
    const salt = `17, 31, 73, 47, 23`.split(/[,]+/).map(length => parseInt(length.trim()));
    lengths = lengths.concat(salt);

    let list = [];
    for (let i = 0; i < 256; i++) {
        list.push(i);
    }

    let currentPosition = 0;
    let skipSize = 0;
    for (let j = 0; j < 64; j++) {
        [lengths, currentPosition, skipSize, list] = processRound(lengths, currentPosition, skipSize, list);
    }

    let sparseHash = list;

    let denseHash = [];
    for (let k = 0; k < 255; k += 16) {
        denseHash.push(sparseHash[k] ^ sparseHash[k+1] ^ sparseHash[k+2] ^ sparseHash[k+3] ^ sparseHash[k+4] ^ sparseHash[k+5] ^ sparseHash[k+6] ^ sparseHash[k+7] ^ sparseHash[k+8] ^ sparseHash[k+9] ^ sparseHash[k+10] ^ sparseHash[k+11] ^ sparseHash[k+12] ^ sparseHash[k+13] ^ sparseHash[k+14] ^ sparseHash[k+15]);
    }

    let KnotHash = '';
    for (dec of denseHash) {
        const hex = dec.toString(16);
        const hexPad = (hex.length < 2) ? ("0" + hex) : hex;
        KnotHash += hexPad;
    }

    let row = [];
    for (ch of KnotHash) {
        let bin4 = Hex2Bin(ch);
        while (bin4.length < 4) {
            bin4 = "0" + bin4;
        }
        row = row.concat(bin4.split('').map(i=>parseInt(i)));
    }
    return row;
};

const prefixString = 'wenycdww';
const binGrid = [];
const binNames = [];
for (let i = 0; i < 128; i++) {
    binNames[i] = Array(128);
    binGrid[i] = rowBinFromKnotHash(prefixString + '-' + i);
}
console.log("grid:",binGrid);
console.log("binNames:",binNames);

const checkXY = (x,y) => {
    if (x < 0 || x >= 128 || y < 0 || y >= 128) {
        return;
    }
    if (binGrid[x][y] && !binNames[x][y]) {
        binNames[x][y] = currentName;
        checkXY(x+1,y);
        checkXY(x-1,y);
        checkXY(x,y+1);
        checkXY(x,y-1);
        return true;
    }
}

let currentName = 1;
let subtractNames = 0;
let currentXYs = [];
let foundInCurrent = false;
for (x in binGrid) {
    for (y in binGrid) {
        if (checkXY(parseInt(x),parseInt(y))) {currentName++;}
        foundInCurrent = false;
    }
}
console.log("answer:",currentName-1); //1128