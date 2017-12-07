// input may contain whitespace (\s), and/or carriage return or line feed (\r\n)
// input may contain only digits, or digits and other
let input = ` asdf 1 
5 2`;
let rows = "input does not contain rows (\\r\\n)";
let arr = "input does not contain whitespace (\\s)";
let arr2D = "rows do not contain whitespace (\\s)";

// remove beginning/trailing whitespace
input = input.trim();

// if input contains carriage return(s) and/or line feed(s) (\r\n) then it has "rows"
if (/[\r\n]+/.test(input)) {
    rows = input
        .split(/[\r\n]+/)
        .map(i => isNaN(i) ? i.trim() : parseInt(i));
}
console.log("rows:", rows);

// if input contains whitespace (\s)
if (/[\s]+/.test(input)) {
    arr = input.split(/[\s]+/).map(i => isNaN(i) ? i : parseInt(i));
}
console.log("arr:", arr);

// if rows contain whitespace (\s)
arr2D = [];
rows.forEach((row) => {
    if (/[\s]+/.test(row)) {
        arr2D.push(row.split(/[\s]+/).map(i => isNaN(i) ? i : parseInt(i)));
    }
});
console.log("arr2D:", arr2D);