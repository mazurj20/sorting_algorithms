import React, { useState, useEffect } from "react";
import SettingChoices from "./SettingChoices.js";
import getMergeSortAnimations from "../SortingAlgorithms/MergeSort.js";
import getSelectionSortAnimations from "../SortingAlgorithms/SelectionSort";
import getBubbleSortAnimations from "../SortingAlgorithms/BubbleSort";
import getQuickSortAnimations from "../SortingAlgorithms/QuickSort";
import getInsertionSortAnimations from "../SortingAlgorithms/InsertionSort";
import getHeapSortAnimations from "../SortingAlgorithms/HeapSort";
import "./SortingVisualizer.css";

//settings
const primaryColor = "slategrey";
const secondaryColor = "coral";
const barLength = {
  top: 80,
  bottom: 1,
};

const SortingVisualizer = () => {
  const [array, setArray] = useState([]);
  const [algo, setAlgo] = useState(null);
  const [speed, setSpeed] = useState(10);
  const [bars, setBars] = useState(100);
  const [barWidth, setBarWidth] = useState(0.8);

  useEffect(() => {
    resetArray();
  }, [bars]);

  // generate new array
  const resetArray = () => {
    const newArray = [];
    for (let i = 0; i < bars; i++) {
      newArray.push(
        Math.floor(
          Math.random() * (barLength.top - barLength.bottom + 1) +
            barLength.bottom
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
      }, i * speed * 3);
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
            pivotBarStyle.backgroundColor = "aqua";
          } else {
            pivotBarStyle.backgroundColor = "aqua";
          }
        }
        //compared bars
        if (
          rightBarStyle.backgroundColor === primaryColor ||
          rightBarStyle.backgroundColor === "aqua"
        ) {
          leftBarStyle.height = `${animations[i].rightValue}vh`;
          rightBarStyle.height = `${animations[i].leftValue}vh`;
        }
        if (
          rightBarStyle.backgroundColor === secondaryColor ||
          rightBarStyle.backgroundColor === "aqua"
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
      }, i * speed * 2);
    }
  };

  const heapSort = () => {
    const animations = getHeapSortAnimations(array);
    console.log(animations);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName("bar");
      const leftBarStyle = arrayBars[animations[i].leftIdx].style;
      const rightBarStyle = arrayBars[animations[i].rightIdx].style;
      setTimeout(() => {
        if (animations[i].colorChange) {
          if (animations[i].revert) {
            leftBarStyle.backgroundColor = primaryColor;
            rightBarStyle.backgroundColor = primaryColor;
          } else {
            leftBarStyle.backgroundColor = secondaryColor;
            rightBarStyle.backgroundColor = secondaryColor;
          }
        } else {
          leftBarStyle.height = `${animations[i].rightValue}vh`;
          rightBarStyle.height = `${animations[i].leftValue}vh`;
        }
      }, i * speed);
    }
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
      }, (i * speed) / 10);
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
      }, (i * speed) / 6);
    }
  };
  const sort = () => {
    switch (algo) {
      case "mergeSort":
        return mergeSort;
      case "selectionSort":
        return selectionSort;
      case "quickSort":
        return quickSort;
      case "heapSort":
        return heapSort;
      case "bubbleSort":
        return bubbleSort;
      case "insertionSort":
        return insertionSort;
      default:
        return "select an algorithm";
    }
  };

  return (
    <div className='SortingVisualizer_container'>
      <div className='navbar_top'>
        <div className='navbar_sort'>
          <div className='navbar_selected' style={{ color: primaryColor }}>
            {algo ? (
              <h3>{`Selected: ${algo}`}</h3>
            ) : (
              <h3>Please select a sorting algorithm!</h3>
            )}
          </div>
        </div>
        <div className='navbar_choices'>
          {algo === "mergeSort" ? (
            <button
              onClick={() => setAlgo("mergeSort")}
              style={{ backgroundColor: "lightgrey" }}
            >
              Merge Sort
            </button>
          ) : (
            <button onClick={() => setAlgo("mergeSort")}>Merge Sort</button>
          )}
          {algo === "selectionSort" ? (
            <button
              onClick={() => setAlgo("selectionSort")}
              style={{ backgroundColor: "lightgrey" }}
            >
              Selection Sort
            </button>
          ) : (
            <button onClick={() => setAlgo("selectionSort")}>
              Selection Sort
            </button>
          )}
          {algo === "quickSort" ? (
            <button
              onClick={() => setAlgo("quickSort")}
              style={{ backgroundColor: "lightgrey" }}
            >
              Quick Sort
            </button>
          ) : (
            <button onClick={() => setAlgo("quickSort")}>Quick Sort</button>
          )}
          {algo === "heapSort" ? (
            <button
              onClick={() => setAlgo("heapSort")}
              style={{ backgroundColor: "lightgrey" }}
            >
              Heap Sort
            </button>
          ) : (
            <button onClick={() => setAlgo("heapSort")}>Heap Sort</button>
          )}
          {algo === "bubbleSort" ? (
            <button
              onClick={() => setAlgo("bubbleSort")}
              style={{ backgroundColor: "lightgrey" }}
            >
              Bubble Sort
            </button>
          ) : (
            <button onClick={() => setAlgo("bubbleSort")}>Bubble Sort</button>
          )}
          {algo === "insertionSort" ? (
            <button
              onClick={() => setAlgo("insertionSort")}
              style={{ backgroundColor: "lightgrey" }}
            >
              Insertion Sort
            </button>
          ) : (
            <button onClick={() => setAlgo("insertionSort")}>
              Insertion Sort
            </button>
          )}
        </div>
      </div>
      <div className='navbar_settings'>
        <div>
          <button onClick={sort()} style={{ backgroundColor: "lightgreen" }}>
            Sort
          </button>
          <button
            onClick={() => {
              window.location.reload();
            }}
            style={{ backgroundColor: "lightcoral" }}
          >
            Cancel Operation
          </button>
          <button
            onClick={() => {
              window.location.reload();
            }}
          >
            Generate New Array
          </button>
        </div>
        <div className='navbar_settings_right'>
          <SettingChoices
            setSpeed={setSpeed}
            setBars={setBars}
            setBarWidth={setBarWidth}
          />
        </div>
      </div>
      <div className='array-container'>
        {array.map((value, i) => (
          <div
            className='bar'
            style={{
              backgroundColor: primaryColor,
              height: `${value}vh`,
              width: `${barWidth}vw`,
            }}
            key={i}
          />
        ))}
      </div>
    </div>
  );
};

export default SortingVisualizer;
