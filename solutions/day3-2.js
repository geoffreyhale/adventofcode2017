const target = 347991;
let value = 1;
let x = 0;
let y = 0;
let dx = 1;
let dy = 0;
const arySize = 20;
const aryOffset = arySize/2;

const ary = Array(arySize).fill(0).map(x => Array(arySize).fill(0));
ary[aryOffset+x][aryOffset+y] = value;
console.log(ary);

while (value < target) {
    //step
    x += dx; console.log("x:",x);
    y += dy; console.log("y:",y);

    ary[aryOffset+x][aryOffset+y] = 0 +
        +	ary[aryOffset+x+1][aryOffset+y] //e
        + ary[aryOffset+x+1][aryOffset+y+1] //ne
        + ary[aryOffset+x][aryOffset+y+1] //n
        + ary[aryOffset+x-1][aryOffset+y+1] //nw
        + ary[aryOffset+x-1][aryOffset+y] //w
        + ary[aryOffset+x-1][aryOffset+y-1] //sw
        + ary[aryOffset+x][aryOffset+y-1] //s
        + ary[aryOffset+x+1][aryOffset+y-1] //se
    ;

    value = ary[x+aryOffset][y+aryOffset]; console.log("value:",value);

    //switch conditions
    if (x == (-y + 1) && dx == 1) { dx=0; dy=1; console.log("bottomRight, go up"); }
    else if (x == y && dy == 1) { dx=-1; dy=0; console.log("topRight, go left"); }
    else if (-x == y && dx == -1) { dx=0; dy=-1; console.log("topLeft, go down"); }
    else if (x == y && dy == -1) { dx=1; dy=0; console.log("bottomLeft, go right"); }
}

console.log("solution:", value); //349975