import React, { useState, useEffect } from "react";
import getMergeSortAnimations from "../SortingAlgorithms/MergeSort.js";
import getSelectionSortAnimations from "../SortingAlgorithms/SelectionSort";
import "./SortingVisualizer.css";

const speed = 1000;

const numOfBars = 20;

const primaryColor = "rgb(54, 179, 184)";

const secondaryColor = "red";

const SortingVisualizer = () => {
  const [array, setArray] = useState([]);

  useEffect(() => {
    resetArray();
  }, []);

  const resetArray = () => {
    const newArray = [];
    for (let i = 0; i < numOfBars; i++) {
      newArray.push(randomIntFromInterval(1, 70));
    }
    setArray(newArray);
  };

  const selectionSort = () => {
    const animations = getSelectionSortAnimations(array);
    console.log(animations);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName("array-bar");
      console.log(arrayBars);
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

  const quickSort = () => {};

  const heapSort = () => {};

  const bubbleSort = () => {};

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
      </div>
    </div>
  );
};

export default SortingVisualizer;

const randomIntFromInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
