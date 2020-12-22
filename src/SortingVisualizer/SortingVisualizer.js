import React, { useState, useEffect } from "react";
import getMergeSortAnimations from "../SortingAlgorithms/MergeSort.js";
import getSelectionSortAnimations from "../SortingAlgorithms/SelectionSort";
import getBubbleSortAnimations from "../SortingAlgorithms/BubbleSort";
import getQuickSortAnimations from "../SortingAlgorithms/QuickSort";
import getInsertionSortAnimations from "../SortingAlgorithms/InsertionSort";
import "./SortingVisualizer.css";

const speed = 20;

const numOfBars = 32;

const primaryColor = "aqua";

const secondaryColor = "red";

const SortingVisualizer = () => {
  const [array, setArray] = useState([]);

  useEffect(() => {
    resetArray();
  }, []);

  const resetArray = () => {
    const newArray = [];
    for (let i = 0; i < numOfBars; i++) {
      newArray.push(randomIntFromInterval(1, 80));
    }
    setArray(newArray);
  };

  const randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const selectionSort = () => {
    const animations = getSelectionSortAnimations(array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName("array-bar");
      if (animations[i].length === 4) {
        setTimeout(() => {
          const barOneStyle = arrayBars[animations[i][0]].style;
          const barTwoStyle = arrayBars[animations[i][2]].style;
          barOneStyle.height = `${animations[i][3]}vh`;
          barTwoStyle.height = `${animations[i][1]}vh`;
          barOneStyle.backgroundColor = primaryColor;
          barTwoStyle.backgroundColor = primaryColor;
        }, i * speed);
      } else {
        setTimeout(() => {
          const barOneStyle = arrayBars[animations[i][0]].style;
          const barTwoStyle = arrayBars[animations[i][1]].style;
          barOneStyle.backgroundColor = secondaryColor;
          barTwoStyle.backgroundColor = secondaryColor;
        }, i * speed);
      }
    }
  };

  const quickSort = () => {
    const animations = getQuickSortAnimations(array);
    console.log(animations);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName("array-bar");

      setTimeout(() => {
        const barOneStyle = arrayBars[animations[i].leftIdx].style;
        const barTwoStyle = arrayBars[animations[i].rightIdx].style;
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
          barTwoStyle.backgroundColor === primaryColor ||
          barTwoStyle.backgroundColor === "black"
        ) {
          barOneStyle.height = `${animations[i].rightValue}vh`;
          barTwoStyle.height = `${animations[i].leftValue}vh`;
        }
        if (
          barTwoStyle.backgroundColor === secondaryColor ||
          barTwoStyle.backgroundColor === "black"
        ) {
          barOneStyle.backgroundColor = primaryColor;
          barTwoStyle.backgroundColor = primaryColor;
        } else {
          barOneStyle.backgroundColor = secondaryColor;
          barTwoStyle.backgroundColor = secondaryColor;
        }

        // end case
        if (i === animations.length) {
          for (let j = 0; j < arrayBars.length; j++) {
            arrayBars[j].style.backgroundColor = primaryColor;
          }
        }
      }, i * speed);
    }
  };

  const heapSort = () => {};

  const bubbleSort = async () => {
    const animations = await getBubbleSortAnimations(array);
    console.log(animations);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName("array-bar");
      setTimeout(() => {
        const barOneStyle = arrayBars[animations[i].leftIdx].style;
        const barTwoStyle = arrayBars[animations[i].rightIdx].style;

        if (
          animations[i].swap &&
          barTwoStyle.backgroundColor === primaryColor
        ) {
          let temp = barOneStyle.height;
          barOneStyle.height = barTwoStyle.height;
          barTwoStyle.height = temp;
        }
        barTwoStyle.backgroundColor === secondaryColor
          ? (barTwoStyle.backgroundColor = primaryColor)
          : (barTwoStyle.backgroundColor = secondaryColor);
      }, (i * speed) / 20);
    }
  };

  const insertionSort = () => {
    const animations = getInsertionSortAnimations(array);
    console.log(animations);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName("array-bar");
      const barOneStyle = arrayBars[animations[i].leftIdx].style;
      const barTwoStyle = arrayBars[animations[i].rightIdx].style;
      setTimeout(() => {
        if (
          animations[i].swap &&
          barTwoStyle.backgroundColor === primaryColor
        ) {
          let temp = barOneStyle.height;
          barOneStyle.height = barTwoStyle.height;
          barTwoStyle.height = temp;
        }
        barTwoStyle.backgroundColor === secondaryColor
          ? (barTwoStyle.backgroundColor = primaryColor)
          : (barTwoStyle.backgroundColor = secondaryColor);
      }, i * speed);
    }
  };

  return (
    <div className="SortingVisualizer_container">
      <div className="array-container">
        {array.map((value, idx) => (
          <div
            className="array-bar"
            key={idx}
            style={{
              backgroundColor: primaryColor,
              height: `${value}vh`,
            }}
          ></div>
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
