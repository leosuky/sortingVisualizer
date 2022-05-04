import { useState, useEffect } from 'react';

// UI
import Navbar from './components/ui/Navbar/Navbar';
import Bar from './components/ui/Bar/Bar';

import './App.css';

// Algorithms
import {
	MergeSort,
	InsertionSort,
	QuickSort,
	BubbleSort,
	SelectionSort,
} from './components/algorithms';


function App() {
	const [array, setArray] = useState([]);
	const [arraySteps, setArraySteps] = useState([]);
	const [colorSteps, setColorSteps] = useState([]);
	const [currentStep, setCurrentStep] = useState(0);
  	const [arraySize, setArraySize] = useState(15);
  	const [delay, setDelay] = useState(50);
	const [algorithm, setAlgorithm] = useState("");
	const [timeouts, setTimeouts] = useState([]);
	const [startGeneratingSteps, setStartGeneratingSteps] = useState(false);

  

  // returns the sorting algorithm delay speed using formula
	// formula: speed = 1000/arraySize
  const getDelay = (arraySize) => {
		return Math.floor(1000 / arraySize);
	};

  // change size of random array and corresponding sorting speed
  const handleArraySizeAndSpeedChange = (newArraySize) => {
    const size = parseInt(newArraySize)
		const newDelay = getDelay(size);
		setArraySize(size);
		setDelay(newDelay);
    console.log(typeof arraySize) // delete this later
	};

  // returns an array of n numbers where n =arraySize
	const generateRandomArray = () => {
		let randomArray = [];
		for (let i = 0; i < arraySize; i++) {
			randomArray.push(Math.floor(Math.random() * 100) + 10);
		}
		return randomArray;
	};

  // clear color key and set it to default
	const clearKey = () => {
		let blankKey = new Array(arraySize).fill(0);
		setColorSteps([blankKey]);
	};

  // generates steps
	const generateSteps = () => {
		console.log(`generating steps`);
		let arr = [...array];
		let steps = [array.slice()];
		let clrSteps = [...colorSteps];
		sort(arr, steps, clrSteps);
		setArraySteps(steps);
		setColorSteps(clrSteps);
		setStartGeneratingSteps(false); // after generating steps, set it to false
	};

  // calls the appropriate algorithm to set the sorting steps
	const sort = (array, arraySteps, colorSteps) => {
		// console.log(`sorting Algorithm: ${algorithm}`);
		// console.log(`arraysteps: ${arraySteps}`);
		// console.log(`colorSteps: ${colorSteps}`);
		switch (algorithm) {
			case "Merge Sort":
				MergeSort(array, arraySteps, colorSteps);
				break;
			case "Quick Sort":
				QuickSort(array, arraySteps, colorSteps);
				break;
			case "Insertion Sort":
				InsertionSort(array, arraySteps, colorSteps);
				break;
			case "Bubble Sort":
				BubbleSort(array, arraySteps, colorSteps);
				break;
			case "Selection Sort":
				SelectionSort(array, arraySteps, colorSteps);
				break;
			default:
				console.error("Invalid algorithm selected!");
		}
	};

  const clearTimeouts = () => {
		timeouts.forEach((timeout) => clearTimeout(timeout));
		setTimeouts([]);
		console.log(`Timeouts cleared...`);
	};

  // Initializes the app by generating random array
	const initialize = () => {
		const newArray = generateRandomArray();
		setArray(newArray);
		setArraySteps([newArray]);
		setCurrentStep(0);
		setDelay(getDelay(arraySize));
		clearKey();
		clearTimeouts();
		setStartGeneratingSteps(true); //invoke start generating steps
	};

  const initialize_with_current_array = () => {
		const arrayCopy = array.slice();
		setArraySteps([arrayCopy]);
		setCurrentStep(0);
		setDelay(getDelay(arraySize));
		clearKey();
		clearTimeouts();
		setStartGeneratingSteps(true); //invoke start generating steps
	};

  // start playing sort animation
	const startSorting = () => {
		let timeoutsArray = [];
		let currStep = currentStep;
		// If already at sorted state, just return back
		if (currentStep === arraySteps.length - 1) {
			return false;
		}
		for (let i = 0; i < arraySteps.length; i++) {
			let timeout = setTimeout(() => {
				setArray([...arraySteps[i]]);
				setCurrentStep(currStep++);
			}, delay * (i + 1));
			timeoutsArray.push(timeout);
		}
		console.log(`setting tiemeout`);
		setTimeouts(timeoutsArray);
	};


  // returns the bar width according to the arraysize
	const getBarWidth = () => {
		return Math.floor(500 / arraySize);
	};

  // bars jsx object
	const bars = array.map((number, index) => {
		return (
			<Bar 
				key={index}
				index={index}
				length={number}
				width={getBarWidth()}
				color={colorSteps[currentStep][index]}
			/>
		);
	});

  // When the document loads, initialize with new array
	useEffect(() => {
		initialize();
	}, [arraySize]);

	// when the array is done initializing, generate steps
	useEffect(() => {
		if (startGeneratingSteps) {
			generateSteps();
		}
	}, [startGeneratingSteps]);

	// when the algorithm changes, start generating steps again
	useEffect(() => {
		initialize_with_current_array();
	}, [algorithm]);


  return (
    <div className="App">
      <Navbar
        handleArraySizeAndSpeedChange={handleArraySizeAndSpeedChange}
        arraySize={arraySize}
        generateNewArray={initialize}
        setAlgorithm={setAlgorithm}
        startSorting={startSorting}
      />
			<div className="array-display">{bars}</div>
    </div>
  );
}

export default App;
