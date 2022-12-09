import fs from 'fs';

//const data = fs.readFileSync('input.txt', 'UTF-8');
const data = fs.readFileSync('test.txt', 'UTF-8')
const lines = data.split(/\r?\n/);

const ASCII_A = 65;
const MAX_HEIGHT = 9;

// Indicate that the tree has already been seen but code the height
const convertToCodeLetter = (height) => String.fromCharCode(height + ASCII_A);
const convertFromCodeLetter = (codeLetter) => codeLetter.charCodeAt(0) - ASCII_A;
const isLetter = (input) => /[A-Z]/.test(input);

const convertedData = lines.map(l => [...l]);

// TODO: This is really not DRY
const getFromLeftEdge = (inputRow) => {
    let count = 0;
    let maxHeight = -1;
    for (let column = 0; column < inputRow.length; column++) {
        if (isLetter(inputRow[column])) {
            maxHeight = convertFromCodeLetter(inputRow[column])
        }
        else if (inputRow[column] > maxHeight) {
            count++;
            maxHeight = parseInt(inputRow[column]);
            inputRow[column] = convertToCodeLetter(maxHeight);
        } else {
            return count;
        }
    }
    return count;
}

const getFromRightEdge = (inputRow) => {
    let count = 0;
    let maxHeight = -1;
    for (let column = inputRow.length - 1; column >= 0; column--) {
        if (isLetter(inputRow[column])) {
            maxHeight = parseInt(convertFromCodeLetter(inputRow[column]));
        }
        else if (inputRow[column] > maxHeight) {
            count++;
            maxHeight = parseInt(inputRow[column]);
            inputRow[column] = convertToCodeLetter(maxHeight);
        } else {
            return count;
        }
    }
    return count;
}

const getFromTopEdge = (arr, columnIndex) => {
    let count = 0;
    let maxHeight = -1;
    for (let row = 0; row < arr[0].length; row++) {
        if (isLetter(arr[row][columnIndex])) {
            maxHeight = convertFromCodeLetter(arr[row][columnIndex])
        }
        else if (arr[row][columnIndex] > maxHeight) {
            count++;
            maxHeight = parseInt(arr[row][columnIndex]);
            arr[row][columnIndex] = convertToCodeLetter(maxHeight);
        } else {
            return count;
        }
    }
    return count;
}

const getFromBottomEdge = (arr, columnIndex) => {
    let count = 0;
    let maxHeight = -1;
    for (let row = arr[0].length - 1; row >= 0; row--) {
        if (isLetter(arr[row][columnIndex])) {
            maxHeight = convertFromCodeLetter(arr[row][columnIndex])
        }
        else if (arr[row][columnIndex] > maxHeight) {
            count++;
            maxHeight = parseInt(arr[row][columnIndex]);
            arr[row][columnIndex] = convertToCodeLetter(maxHeight);
        } else {
            return count;
        }
    }
    return count;
}

const horizontalTrees = convertedData.reduce((acc, curr) => {
    const viewLeft = getFromLeftEdge(curr);
    const viewRight = getFromRightEdge(curr);
    acc = acc + viewLeft + viewRight;
    return acc;
}, 0);

let verticalTrees = 0;
for (let i = 0; i < convertedData[0].length; i++) {
    verticalTrees += getFromTopEdge(convertedData, i);
    verticalTrees += getFromBottomEdge(convertedData, i);
}

console.log(horizontalTrees + verticalTrees);