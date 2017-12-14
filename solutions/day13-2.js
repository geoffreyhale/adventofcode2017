const input = `0: 3
1: 2
2: 4
4: 4
6: 5
8: 6
10: 8
12: 8
14: 6
16: 6
18: 8
20: 8
22: 6
24: 12
26: 9
28: 12
30: 8
32: 14
34: 12
36: 8
38: 14
40: 12
42: 12
44: 12
46: 14
48: 12
50: 14
52: 12
54: 10
56: 14
58: 12
60: 14
62: 14
66: 10
68: 14
74: 14
76: 12
78: 14
80: 20
86: 18
92: 14
94: 20
96: 18
98: 17`;
const scannerSizes = {};
for (row of input.split(/[\r\n]+/)) {
    scannerSizes[row.substr(0, row.indexOf(":"))] = parseInt(row.substr(row.indexOf(":") + 2));
}
//console.log("scannerSizes:", scannerSizes);

const tryPico = (pico) => {
    //console.log("pico: ", pico);
    for (key in scannerSizes) {
        if ((pico + parseInt(key)) % (2 * (scannerSizes[key] - 1)) == 0) {
            //console.log("key:", key, "val:", scannerSizes[key], );
            return false;
        }
    }
    return true;
};

let pico = -1;
let success = false;
while (!success) {
    pico++;
    success = tryPico(pico);
}
console.log ("Solution (pico):", pico);
//3907470