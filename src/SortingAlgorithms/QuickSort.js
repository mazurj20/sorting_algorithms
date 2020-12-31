const getQuickSortAnimation = (arr) => {
  const animations = [];
  quickSort(arr, 0, arr.length - 1, animations);
  return animations;
};

const swap = (arr, i, j) => {
  [arr[i], arr[j]] = [arr[j], arr[i]];
};
const partition = (arr, left, right, animations) => {
  let pivotIdx = Math.floor((right + left) / 2);
  let pivot = {
    idx: pivotIdx,
    value: arr[pivotIdx],
  };
  let i = left,
    j = right;
  while (i <= j) {
    //left pointer advances when values are less than pivot
    while (arr[i] < pivot.value) {
      i++;
    }
    //right pointer advances(backwards) when values are greater than pivot
    while (arr[j] > pivot.value) {
      j--;
    }
    //both while loops finish so we swap idxs
    if (i <= j) {
      if (i !== j) {
        animations.push({
          pivot: pivot.idx,
          leftIdx: i,
          rightIdx: j,
          leftValue: arr[i],
          rightValue: arr[j],
        });
        animations.push({
          pivot: pivot.idx,
          leftIdx: i,
          rightIdx: j,
          leftValue: arr[i],
          rightValue: arr[j],
        });
      }

      swap(arr, i, j);
      i++;
      j--;
    }
  }
  return i;
  //i becomes the index by which we partition the array
};

const quickSort = (arr, left, right, animations) => {
  let index;
  if (arr.length > 1) {
    index = partition(arr, left, right, animations);
    //do quicksort on both halves
    if (left < index - 1) {
      quickSort(arr, left, index - 1, animations);
    }
    if (index < right) {
      quickSort(arr, index, right, animations);
    }
  }
  return arr;
};

export default getQuickSortAnimation;
