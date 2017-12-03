// https://en.wikipedia.org/wiki/Taxicab_geometry
// distance between vectors p,q is...
// d_{1}(\mathbf {p} ,\mathbf {q} )=\|\mathbf {p} -\mathbf {q} \|_{1}=\sum _{i=1}^{n}|p_{i}-q_{i}|,

// so x diff plus y diff
// so how far from the center is target 347991?

const target = 347991; console.log("target:", target);
let value = 1;
let x = 0;
let y = 0;
let dx = 1;
let dy = 0;

while (value < target) {
    //step
    x += dx;
    y += dy;
    value++;
    console.log(x, y, value);

    //switch conditions
    if (x == (-y + 1) && dx == 1) { dx=0; dy=1; console.log("bottomRight, go up"); }
    else if (x == y && dy == 1) { dx=-1; dy=0; console.log("topRight, go left"); }
    else if (-x == y && dx == -1) { dx=0; dy=-1; console.log("topLeft, go down"); }
    else if (x == y && dy == -1) { dx=1; dy=0; console.log("bottomLeft, go right"); }
}
console.log("---")
console.log("dx:", x);
console.log("dy:", y);

const solution = Math.abs(x) + Math.abs(y);
console.log("solution: ", solution);