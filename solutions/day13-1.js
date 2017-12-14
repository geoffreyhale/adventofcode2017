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
    scannerSizes[row.substr(0, row.indexOf(":"))] = parseInt(row.substr(row.indexOf(":")+2));
}
console.log("scannerSizes:", scannerSizes);

let scannerStates = _.cloneDeep(scannerSizes);
for (key in scannerStates) {
    scannerStates[key] = 0;
}
console.log("scannerStates:", scannerStates);
let scannerDown = _.cloneDeep(scannerSizes);
for (key in scannerDown) {
    scannerDown[key] = true;
}

let totalSeverity = 0;
//console.log(Math.max(...Object.keys(scannerSizes).map((i)=>parseInt(i))) + 1);
for (let t = 0; t < Math.max(...Object.keys(scannerSizes).map((i)=>parseInt(i))) + 1; t++) {
    console.log("round t:", t, "scannerStates[t]:", scannerStates[t], "scannerStates:", scannerStates);
    if (t in scannerStates) {
        // caught:
        if (scannerStates[t] == 0) {
            totalSeverity += t * scannerSizes[t];
            console.log("caught:", t, scannerSizes[t], "totalSeverity:", totalSeverity);
        }
    }
    // inc scanners
    for (j in scannerStates) {
        //downing
        if (scannerDown[j]) {
            scannerStates[j]++;
            if (scannerStates[j] == scannerSizes[j] - 1) {
                scannerDown[j] = false;
            }
        }
        //uping
        else if (!scannerDown[j]) {
            scannerStates[j]--;
            if (scannerStates[j] == 0) {
                scannerDown[j] = true;
            }
        }
        console.log(t, j, scannerStates[j]);
    }
}

console.log("totalSeverity: ", totalSeverity); //2160