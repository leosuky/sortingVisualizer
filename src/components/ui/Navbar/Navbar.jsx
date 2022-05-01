import React from 'react';
import './navbar.css';

import RangeSlider from '../RangeSlider/RangeSlider';
import SelectAlgorithm from '../SelectAlgorithm/SelectAlgorithm';

function VerticalBar() {
    return (
        <div className='verticalBar'></div>
    )
}

function Navbar(props) {

    // generates a new random array
	const generateNewArrayHandler = () => {
		props.generateNewArray();
	};

    // lets the user change size of array and speed of sorting
    const handleArraySizeAndSpeedChange = (event) => {
        props.handleArraySizeAndSpeedChange(event.target.value);
    }

    // handle changing of algorithm
	const handleSortingAlgorithmChange = (event) => {
		props.setAlgorithm(event.target.value);
	};

    // starts playing the sorting algorithm
	const sortArrayHandler = () => {
		props.startSorting();
	};

  return (
    <div className='navbar'>
        <div className="navbar__title">
            <h1>Sorting Algorithm Visualizer</h1>
        </div>
        
        <div className="navbar__toolbar">

            <div className="navbar__toolbar-slider">
                <RangeSlider 
                    onChange={handleArraySizeAndSpeedChange}
                    value={props.arraySize}
                />
            </div>

            <div><VerticalBar/></div>

            <div className="navbar__toolbar-newarray">
                <button 
                    className='Algobutton'
                    onClick={generateNewArrayHandler}
                >GENERATE THE ARRAY</button>
            </div>

            <div><VerticalBar/></div>

            <div className="navbar__toolbar-algorithms">
                <SelectAlgorithm
                    onChange={handleSortingAlgorithmChange}
                />
            </div>

            <div><VerticalBar/></div>

            <div className="navbar__toolbar-sort">
                <button 
                    className='Algobutton'
                    onClick={sortArrayHandler}
                >SORT!</button>
            </div>

        </div>
    </div>
  )
}

export default Navbar