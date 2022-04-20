// Insertion Sort Algorithm


const insertionSort = ({size, setSortHistory, setPlaying, array}) => {
    let historyArray = [[...array]]

    // start loop from the 2nd element in the list
    for (let i=1; i<size; i++) {

        let key = array[i] 
        let j = i-1 // Assign index to the previous element

        // while index j is at least 0 and current element at i < previous element at j
        while ((j>=0) && (key < array[j])) {
            array[j+1] = array[j] // switch the element at forward index j with current index j
            j--
        }

        // once the loop is done or current element at i is greater or equal to current element at j
        array[j+1] = key // switch the next element at j to current element at i
        historyArray.push([...array]);
    }

    setSortHistory(historyArray)
    setPlaying(true)
}

export default insertionSort