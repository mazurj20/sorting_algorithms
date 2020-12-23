const getMergeSortAnimations = (unsortedArray) => {
  //array to keep track of animations
  const animations = [];
  // change the unsorted array into an array of objects to keep track of the original indecies
  let arr = [];
  for (let i = 0; i < unsortedArray.length; i++) {
    arr.push({
      idx: i,
      value: unsortedArray[i],
    });
  }
  return {
    animations: animations,
    sortedArray: mergeSort(arr, animations),
  };
};

// recursively divide initial array until base case is reached
function mergeSort(arr, animations) {
  // if its already at 1 it can be considered sorted
  if (arr.length <= 1) {
    return arr;
  }

  // find middle point to continue dividing into half
  const middle = Math.floor(arr.length / 2);

  // seperate into left and right halves
  const left = arr.slice(0, middle);
  const right = arr.slice(middle);

  // run merge with the left and right halves being recursively split
  return merge(
    mergeSort(left, animations),
    mergeSort(right, animations),
    animations
  );
}

// merge left and right arrays
function merge(left, right, animations) {
  // keep track of the original indecies coming in in order from left to right
  let awardableIndecies = [];
  for (let i = 0; i < left.length; i++) {
    awardableIndecies.push(left[i].idx);
  }
  for (let i = 0; i < right.length; i++) {
    awardableIndecies.push(right[i].idx);
  }
  // award count will let me assign spots by index in order when merging
  let awardedCount = 0;
  // result array will be returned with the sorted values
  let resultArray = [],
    leftIndex = 0,
    rightIndex = 0;

  // push the next smallest value to the results array
  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex].value < right[rightIndex].value) {
      // push twice for toggling in the SortingVisualizer file
      animations.push({
        rightIdx: left[leftIndex].idx,
        to: awardableIndecies[awardedCount],
        value: left[leftIndex].value,
      });
      animations.push({
        rightIdx: left[leftIndex].idx,
        to: awardableIndecies[awardedCount],
        value: left[leftIndex].value,
      });
      // index awardableIndecies[awardedCount] is no longer avaliable
      awardedCount++;
      resultArray.push(left[leftIndex]);

      // move left array cursor
      leftIndex++;
    } else {
      animations.push({
        rightIdx: right[rightIndex].idx,
        to: awardableIndecies[awardedCount],
        value: right[rightIndex].value,
      });
      animations.push({
        rightIdx: right[rightIndex].idx,
        to: awardableIndecies[awardedCount],
        value: right[rightIndex].value,
      });
      // change the idx for all of the values being shifted
      for (let i = leftIndex; i < left.length; i++) {
        if (left[i].idx < right[rightIndex].idx) {
          left[i].idx++;
        }
      }
      for (let i = rightIndex; i < right.length; i++) {
        if (right[i].idx < right[rightIndex].idx) {
          right[i].idx++;
        }
      }

      right[rightIndex].idx = awardableIndecies[awardedCount];

      awardedCount++;

      resultArray.push(right[rightIndex]);
      rightIndex++; // move right array cursor
    }
  }

  // upon exiting while loop, push the rest
  for (let i = rightIndex; i < right.length; i++) {
    animations.push({
      rightIdx: right[i].idx,
      to: right[i].idx,
      value: right[i].value,
    });
    animations.push({
      rightIdx: right[i].idx,
      to: right[i].idx,
      value: right[i].value,
    });
  }
  for (let i = leftIndex; i < left.length; i++) {
    animations.push({
      rightIdx: left[i].idx,
      to: left[i].idx,
      value: left[i].value,
    });
    animations.push({
      rightIdx: left[i].idx,
      to: left[i].idx,
      value: left[i].value,
    });
  }

  return resultArray
    .concat(left.slice(leftIndex))
    .concat(right.slice(rightIndex));
}

export default getMergeSortAnimations;
