const selectionSort = (arr) => {
  let animations = [];
  // nested for loop to switch starting point with new minimum value
  for (let i = 0; i < arr.length; i++) {
    let min_idx = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[min_idx] > arr[j]) {
        min_idx = j;
      }
    }
    if (min_idx !== i) {
      // push animations twice for toggling in SortingVisualizer
      animations.push([i, arr[i], min_idx, arr[min_idx]]);
      animations.push([i, arr[i], min_idx, arr[min_idx]]);
      [arr[i], arr[min_idx]] = [arr[min_idx], arr[i]];
    }
  }
  return animations;
};

export default selectionSort;
