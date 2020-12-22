const bubbleSort = (arr) => {
  let animations = [];
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
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
        let tmp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = tmp;
      } else {
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
  }
  return animations;
};

export default bubbleSort;
