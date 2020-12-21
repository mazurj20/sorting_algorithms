const handleMergeSort = (unsortedArray) => {
  let array = [];
  for (let i = 0; i < unsortedArray.length; i++) {
    array.push({ idx: i, value: unsortedArray[i] });
  }
  mergeSort(array);
  return animations;
};

const animations = [];

const mergeSort = (unsortedArray) => {
  if (unsortedArray.length <= 1) {
    return unsortedArray;
  }
  const middle = Math.floor(unsortedArray.length / 2);
  //look into splicing objects
  const left = unsortedArray.slice(0, middle);
  const right = unsortedArray.slice(middle);
  //
  return merge(mergeSort(left), mergeSort(right));
};

const merge = (left, right) => {
  let resultArray = [],
    leftIndex = 0,
    rightIndex = 0;

  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex].value < right[rightIndex].value) {
      resultArray.push(left[leftIndex]);
      //is this right
      animations.push({
        leftIdx: left[leftIndex].idx,
        leftValue: left[leftIndex].value,
        rightIdx: right[rightIndex].idx,
        rightValue: right[rightIndex].value,
        swap: false,
      });
      console.log("left", left[leftIndex], right[rightIndex]);
      //
      leftIndex++;
    } else {
      //is this right
      animations.push({
        leftIdx: left[leftIndex].idx,
        leftValue: left[leftIndex].value,
        rightIdx: right[rightIndex].idx,
        rightValue: right[rightIndex].value,
        swap: true,
      });
      console.log("right first", left[leftIndex], right[rightIndex]);

      //
      //how to change object keys
      right[rightIndex].idx = left[leftIndex].idx;
      left[leftIndex].idx = right[rightIndex].idx;
      resultArray.push(right[rightIndex]);
      //
      rightIndex++;
    }
  }
  //what do i do here
  if (left.length === 0) {
    for (let i = 0; i < right.length; i++) {
      animations.push({
        leftIdx: null,
        leftValue: null,
        rightIdx: null,
        rightValue: null,
        swap: false,
      });
    }
  }
  return resultArray
    .concat(left.slice(leftIndex))
    .concat(right.slice(rightIndex));
};

export default handleMergeSort;
//handleMergeSort([6, 4, 3, 2, 6, 7, 8, 9, 9]);
//console.log(animations);

/*
const mergeSort = (unsortedArray) => {
  if (unsortedArray.length <= 1) {
    return unsortedArray;
  }
  const middle = Math.floor(unsortedArray.length / 2);

  const left = unsortedArray.slice(0, middle);
  const right = unsortedArray.slice(middle);

  return merge(mergeSort(left), mergeSort(right));
};

const merge = (left, right) => {
  let resultArray = [],
    leftIndex = 0,
    rightIndex = 0;

  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      resultArray.push(left[leftIndex]);
      leftIndex++;
    } else {
      resultArray.push(right[rightIndex]);
      rightIndex++;
    }
  }

  return resultArray
    .concat(left.slice(leftIndex))
    .concat(right.slice(rightIndex));
};

export default mergeSort;
*/
