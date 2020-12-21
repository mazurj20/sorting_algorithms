const bubbleSort = (unsortedArray) => {
  console.log(unsortedArray);
  //make into an array of objects
  let arr = [];
  let animations = [];
  for (let i = 0; i < unsortedArray.length; i++) {
    arr.push({
      idx: i,
      value: unsortedArray[i],
    });
  }

  let len = arr.length;
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - i - 1; j++) {
      if (arr[j].value > arr[j + 1].value) {
        animations.push({
          leftIdx: arr[j].idx,
          rightIdx: arr[j + 1].idx,
          swap: true,
        });
        animations.push({
          leftIdx: arr[j].idx,
          rightIdx: arr[j + 1].idx,
          swap: true,
        });
        let tmp = arr[j].value;
        arr[j].value = arr[j + 1].value;
        arr[j + 1].value = tmp;
      } else {
        animations.push({
          leftIdx: arr[j].idx,
          rightIdx: arr[j + 1].idx,
          swap: false,
        });
        animations.push({
          leftIdx: arr[j].idx,
          rightIdx: arr[j + 1].idx,
          swap: false,
        });
      }
    }
  }
  let sortedArray = [];
  for (let i = 0; i < arr.length; i++) {
    sortedArray.push(arr[i].value);
  }
  return { animations: animations, sortedArray: sortedArray };
};

export default bubbleSort;
