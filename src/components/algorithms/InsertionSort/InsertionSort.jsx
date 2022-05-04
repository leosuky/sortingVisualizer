const BLUE = 0,
	YELLOW = 1,
	// PURPLE = 2,
	RED = 3,
	// PINK = 5,
	GREEN = 4;

const InsertionSort = (array, arraySteps, colorSteps) => {
	let size = array.length
	let colorKey = [...colorSteps[0]];

	for (let i=0; i<size; i++) {
		arraySteps.push(array.slice());
		colorKey[i] = BLUE;
		colorKey[0] = RED;
		colorSteps.push(colorKey.slice());
		
		// if the element we're at is less than the first element
		if (array[i] < array[0]) {
			// move the element to the first position
			array.unshift(array.splice(i,1)[0]);			
		} else {
			// loop from the 2nd element in the list up to the element at index i
			for (let j=1; j<i; j++) {

				arraySteps.push(array.slice());
				colorKey[j] = BLUE;
				colorKey[i] = YELLOW;
				colorSteps.push(colorKey.slice());

				// if i > element before j but less than j at the same time...
				if (array[i] >= array[j-1] && array[i] <= array[j]) {
					// insert the element i at index j (and then j's index becomes (j+1))
					array.splice(j,0,array.splice(i,1)[0]);
				}
			}

			arraySteps.push(array.slice());
			colorKey[i] = GREEN;
			colorSteps.push(colorKey.slice());
		}
		arraySteps.push(array.slice());
		colorKey[0] = GREEN;
		colorSteps.push(colorKey.slice());
	}

	arraySteps.push(array.slice());
	colorSteps.push(colorKey.slice().fill(GREEN));
};

export default InsertionSort;
