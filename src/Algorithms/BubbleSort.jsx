// Bubble Sort Algorithm

const bubblesort = ({size, setSortHistory, setPlaying, array}) => {
    var historyArray = [[...array]];
    for (let i = 0; i < size - 1; i++) {
        for (let j = 0; j < size - i - 1; j++) {
            if (array[j] > array[j + 1]) {
            var swap = array[j];
            array[j] = array[j + 1];
            array[j + 1] = swap;
            historyArray.push([...array]);
            }
        }
    }
    setSortHistory(historyArray)
    setPlaying(true)
}

export default bubblesort