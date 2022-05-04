
const BLUE = 0,
	// YELLOW = 1,
	// PURPLE = 2,
	RED = 3,
	// PINK = 5,
	GREEN = 4;


const BubbleSort = (array, arraySteps, colorSteps) => {
    let size = array.length
    let colorKey = [...colorSteps[0]];

    for (let i = 0; i < size - 1; i++) {

        for (let j = 0; j < size - i -1; j++) {
            arraySteps.push(array.slice());
			colorKey[j] = BLUE;
            colorKey[j+1] = RED;
			colorSteps.push(colorKey.slice());

            if (array[j] > array[j + 1]) {
                var swap = array[j];
                array[j] = array[j + 1];
                array[j + 1] = swap;
            }

            arraySteps.push(array.slice());
            colorKey[j+1] = GREEN;
            colorSteps.push(colorKey.slice());
        }
    }
    arraySteps.push(array.slice());
	colorSteps.push(colorKey.slice().fill(GREEN));
}

export default BubbleSort