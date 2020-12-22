const insertionSort = (inputArr) => {
  let animations = [];
  for (let i = 1; i < inputArr.length; i++) {
    // the key is the value of point we are at in the for loop
    let key = {
      idx: i,
      value: inputArr[i],
    };
    //
    let j = i - 1;
    while (j >= 0 && inputArr[j] > key.value) {
      animations.push({
        leftIdx: j,
        rightIdx: j + 1,
        swap: true,
      });
      animations.push({
        leftIdx: j,
        rightIdx: j + 1,
        swap: true,
      });
      inputArr[j + 1] = inputArr[j];
      j--;
    }
    //
    inputArr[j + 1] = key.value;
    if (j >= 0) {
      animations.push({
        leftIdx: j,
        rightIdx: j + 1,
        swap: false,
      });
      animations.push({
        leftIdx: j,
        rightIdx: j + 1,
        swap: false,
      });
    }
  }
  return animations;
};

export default insertionSort;
