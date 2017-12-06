let input = `14	0	15	12	11	11	3	5	1	6	8	4	9	1	8	4`;
const history = [];
history.push(input);

let ary = input.split(/[\s]+/).map(i => parseInt(i));
console.log(ary);

reDistCount = 0;
const reDist = (ary) => {
    reDistCount++;
    let max = Math.max(...ary);
    let i = ary.indexOf(Math.max(...ary));
    ary[i] = 0;
    while (max > 0) {
        i++;
        if (i >= ary.length) {
            i = 0;
        }
        ary[i]++;
        max--;
    }
    return ary;
}

while (true) {
    if (history.indexOf(ary.toString()) > -1) {
        break; //match!
    }
    history.push(ary.toString());

    ary = reDist(ary);
    console.log(ary);
}

console.log(reDistCount); //11137