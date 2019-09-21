import memoize from 'lodash/memoize';

function sort(arr) {
    // ...
    return sortedArr;
}

const sort2 = memoize(sort);
const inputArr1 = [/* */];
const output1 = sort(inputArr1);
const output2 = sort(inputArr1);
output1 === output2 // true
const inputArr2 = [/* */];
const output3 = sort(inputArr2);
output1 !== output3 // true