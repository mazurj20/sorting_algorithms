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
  let right = 2 * i; //right child idx
  let maximum;
  if (left < len) {
    //Check if left child exists
    if (arr[right] >= arr[left]) {
      //change colors for comparisons
      animations.push({
        leftIdx: left,
        rightIdx: right,
        leftValue: arr[left],
        rightValue: arr[right],
        colorChange: true,
      });
      //change colors back
      animations.push({
        leftIdx: left,
        rightIdx: right,
        leftValue: arr[left],
        rightValue: arr[right],
        colorChange: true,
        revert: true,
      });
      //Compares children to find maximum
      maximum = right;
    } else {
      animations.push({
        leftIdx: left,
        rightIdx: right,
        leftValue: arr[left],
        rightValue: arr[right],
        colorChange: true,
      });
      animations.push({
        leftIdx: left,
        rightIdx: right,
        leftValue: arr[left],
        rightValue: arr[right],
        colorChange: true,
        revert: true,
      });
      maximum = left;
    }
  } else if (right < len) {
    //check if right child exists
    maximum = right;
  } else return;
  if (arr[i] < arr[maximum]) {
    //swap if the largest child is greater than parent
    swap(arr, i, maximum, animations);
    getMaxHeap(arr, maximum, len, animations);
  }
  return;
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
