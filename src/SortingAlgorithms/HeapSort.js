export default function getHeapSortAnimations(arr) {
  let animations = [];
  let len = arr.length;
  //i is the last parent node in the heap
  for (let i = Math.floor(len / 2) - 1; i >= 0; i--) {
    getMaxHeap(arr, i, len, animations);
  }
  //now we have the max heap and we need to switch the last child with the root element
  //here, i is the last child in the heap
  for (let i = len - 1; i >= 0; i--) {
    swap(arr, 0, i, animations); //delete the root element
    getMaxHeap(arr, 0, i, animations); //repeat
  }
  return animations;
}

function getMaxHeap(arr, i, len, animations) {
  let left = 2 * i + 1; //left child idx
  let right = left + 1; //right child idx
  let max = i;
  if (left < len && arr[left] > arr[max]) {
    animations.push({
      leftIdx: left,
      rightIdx: max,
      leftValue: arr[left],
      rightValue: arr[max],
      colorChange: true,
    });

    animations.push({
      leftIdx: left,
      rightIdx: max,
      leftValue: arr[left],
      rightValue: arr[max],
      colorChange: true,
      revert: true,
    });
    max = left;
  }
  if (right < len && arr[right] > arr[max]) {
    animations.push({
      leftIdx: right,
      rightIdx: max,
      leftValue: arr[right],
      rightValue: arr[max],
      colorChange: true,
    });
    animations.push({
      leftIdx: right,
      rightIdx: max,
      leftValue: arr[right],
      rightValue: arr[max],
      colorChange: true,
      revert: true,
    });
    max = right;
  }
  if (max !== i) {
    swap(arr, i, max, animations);
    getMaxHeap(arr, max, len, animations);
  }
  return arr;
}

function swap(arr, i, j, animations) {
  animations.push({
    leftIdx: i,
    rightIdx: j,
    leftValue: arr[i],
    rightValue: arr[j],
  });
  [arr[i], arr[j]] = [arr[j], arr[i]];
}
