const getQuickSortAnimation = (arr) => {
  const animations = [];
  quickSort(arr, 0, arr.length - 1, animations);
  return animations;
};

function swap(arr, i, j) {
  [arr[i], arr[j]] = [arr[j], arr[i]];
}
function partition(arr, left, right, animations) {
  var pivotIdx = Math.floor((right + left) / 2);
  var pivot = {
    idx: pivotIdx,
    value: arr[pivotIdx],
  };
  var i = left,
    j = right;
  while (i <= j) {
    while (arr[i] < pivot.value) {
      i++;
    }
    while (arr[j] > pivot.value) {
      j--;
    }
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
}

function quickSort(arr, left, right, animations) {
  let index;
  if (arr.length > 1) {
    index = partition(arr, left, right, animations);
    if (left < index - 1) {
      quickSort(arr, left, index - 1, animations);
    }
    if (index < right) {
      quickSort(arr, index, right, animations);
    }
  }
  return arr;
}

export default getQuickSortAnimation;
