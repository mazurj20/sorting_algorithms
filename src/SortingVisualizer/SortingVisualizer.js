import React, { useState, useEffect } from "react";
import getMergeSortAnimations from "../SortingAlgorithms/MergeSort.js";
import getSelectionSortAnimations from "../SortingAlgorithms/SelectionSort";
import getBubbleSortAnimations from "../SortingAlgorithms/BubbleSort";
import getQuickSortAnimations from "../SortingAlgorithms/QuickSort";
import getInsertionSortAnimations from "../SortingAlgorithms/InsertionSort";
//import getheapSortAnimations from "../SortingAlgorithms/getheapSortAnimations";
import "./SortingVisualizer.css";

//settings
const primaryColor = "darkcyan";
const secondaryColor = "red";
const speed = 10;
const bars = 130;
const barSize = {
  top: 80,
  bottom: 1,
};
const barWidth = 0.5;

const SortingVisualizer = () => {
  const [array, setArray] = useState([]);

  useEffect(() => {
    resetArray();
  }, []);

  // generate new array
  const resetArray = () => {
    const newArray = [];
    for (let i = 0; i < bars; i++) {
      newArray.push(
        Math.floor(
          Math.random() * (barSize.top - barSize.bottom + 1) + barSize.bottom
        )
      );
    }
    setArray(newArray);
  };

  // algorithm visualizers
  // merge sort
  const mergeSort = async () => {
    const { animations, sortedArray } = await getMergeSortAnimations(array);
    const arrayBars = document.getElementsByClassName("bar");
    for (let i = 0; i < animations.length; i++) {
      const rightBarStyle = arrayBars[animations[i].rightIdx].style;
      const leftBarStyle = arrayBars[animations[i].to].style;
      setTimeout(() => {
        if (rightBarStyle.backgroundColor === primaryColor) {
          //shift array bars
          for (let j = animations[i].rightIdx; j > 0; j--) {
            arrayBars[j].height = arrayBars[j - 1].height;
          }
          //place array bar
          leftBarStyle.height = `${animations[i].value}vh`;
        }
        rightBarStyle.backgroundColor === secondaryColor
          ? (rightBarStyle.backgroundColor = primaryColor)
          : (rightBarStyle.backgroundColor = secondaryColor);
      }, (i * speed) / 2);
    }
    setArray(sortedArray);
  };

  const selectionSort = async () => {
    const animations = await getSelectionSortAnimations(array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName("bar");
      setTimeout(() => {
        const leftBarStyle = arrayBars[animations[i][0]].style;
        const rightBarStyle = arrayBars[animations[i][2]].style;
        if (leftBarStyle.backgroundColor === primaryColor) {
          leftBarStyle.height = `${animations[i][3]}vh`;
          rightBarStyle.height = `${animations[i][1]}vh`;
          leftBarStyle.backgroundColor = secondaryColor;
          rightBarStyle.backgroundColor = secondaryColor;
        } else {
          leftBarStyle.backgroundColor = primaryColor;
          rightBarStyle.backgroundColor = primaryColor;
        }
      }, i * speed);
    }
  };

  const quickSort = async () => {
    const animations = await getQuickSortAnimations(array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName("bar");
      setTimeout(() => {
        const leftBarStyle = arrayBars[animations[i].leftIdx].style;
        const rightBarStyle = arrayBars[animations[i].rightIdx].style;
        const pivotBarStyle = arrayBars[animations[i].pivot].style;
        //pivot bar
        if (i > 0) {
          if (animations[i].pivot !== animations[i - 1].pivot) {
            arrayBars[
              animations[i - 1].pivot
            ].style.backgroundColor = primaryColor;
            pivotBarStyle.backgroundColor = "black";
          } else {
            pivotBarStyle.backgroundColor = "black";
          }
        }
        //compared bars
        if (
          rightBarStyle.backgroundColor === primaryColor ||
          rightBarStyle.backgroundColor === "black"
        ) {
          leftBarStyle.height = `${animations[i].rightValue}vh`;
          rightBarStyle.height = `${animations[i].leftValue}vh`;
        }
        if (
          rightBarStyle.backgroundColor === secondaryColor ||
          rightBarStyle.backgroundColor === "black"
        ) {
          leftBarStyle.backgroundColor = primaryColor;
          rightBarStyle.backgroundColor = primaryColor;
        } else {
          leftBarStyle.backgroundColor = secondaryColor;
          rightBarStyle.backgroundColor = secondaryColor;
        }
        // end case
        if (i === animations.length - 1) {
          for (let j = 0; j < arrayBars.length; j++) {
            arrayBars[j].style.backgroundColor = primaryColor;
          }
        }
      }, i * speed);
    }
  };

  const heapSort = () => {
    //const animations = getheapSortAnimations(array);
    //console.log(animations);
  };

  const bubbleSort = async () => {
    const animations = await getBubbleSortAnimations(array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName("bar");
      setTimeout(() => {
        const leftBarStyle = arrayBars[animations[i].leftIdx].style;
        const rightBarStyle = arrayBars[animations[i].rightIdx].style;
        if (
          animations[i].swap &&
          rightBarStyle.backgroundColor === primaryColor
        ) {
          let temp = leftBarStyle.height;
          leftBarStyle.height = rightBarStyle.height;
          rightBarStyle.height = temp;
        }
        rightBarStyle.backgroundColor === secondaryColor
          ? (rightBarStyle.backgroundColor = primaryColor)
          : (rightBarStyle.backgroundColor = secondaryColor);
      }, (i * speed) / 28);
    }
  };

  const insertionSort = async () => {
    const animations = await getInsertionSortAnimations(array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName("bar");
      const leftBarStyle = arrayBars[animations[i].leftIdx].style;
      const rightBarStyle = arrayBars[animations[i].rightIdx].style;
      setTimeout(() => {
        if (
          animations[i].swap &&
          rightBarStyle.backgroundColor === primaryColor
        ) {
          let temp = leftBarStyle.height;
          leftBarStyle.height = rightBarStyle.height;
          rightBarStyle.height = temp;
        }
        rightBarStyle.backgroundColor === secondaryColor
          ? (rightBarStyle.backgroundColor = primaryColor)
          : (rightBarStyle.backgroundColor = secondaryColor);
      }, (i * speed) / 2);
    }
  };

  return (
    <div className="SortingVisualizer_container">
      <div className="array-container">
        {array.map((value, i) => (
          <div
            className="bar"
            style={{
              backgroundColor: primaryColor,
              height: `${value}vh`,
              width: `${barWidth}vw`,
            }}
            key={i}
          />
        ))}
      </div>
      <div className="buttons">
        <button onClick={() => resetArray()}>Generate New Array</button>
        <button onClick={() => mergeSort()}>Merge Sort</button>
        <button onClick={() => selectionSort()}>Selection Sort</button>
        <button onClick={() => quickSort()}>Quick Sort</button>
        <button onClick={() => heapSort()}>Heap Sort</button>
        <button onClick={() => bubbleSort()}>Bubble Sort</button>
        <button onClick={() => insertionSort()}>Insertion Sort</button>
      </div>
    </div>
  );
};

export default SortingVisualizer;
