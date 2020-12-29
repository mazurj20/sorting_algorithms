export default function getHeapSortAnimations(arr) {
  let animations = [];
  let len = arr.length;
  for (let i = Math.floor(len / 2) - 1; i >= 0; i--) {
    getMaxHeap(arr, i, len, animations);
  }
  for (let i = len - 1; i >= 0; i--) {
    swap(arr, 0, i, animations); //Delete root element
    getMaxHeap(arr, 0, i, animations);
  }
  return animations;
}

function getMaxHeap(arr, i, len, animations) {
  let left = 2 * i; //Left child index
  let right = 2 * i + 1; //Right child index
  let maximum;
  if (right < len) {
    //Check if right child exists
    if (arr[left] >= arr[right]) {
      //Compares children to find maximum
      maximum = left;
    } else {
      maximum = right;
    }
  } else if (left < len) {
    //Check if left child exists
    maximum = left;
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
