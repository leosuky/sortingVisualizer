// Selection Sort Algorithm

const selectionSort = ({size, setSortHistory, setPlaying, array}) => {
    let historyArray = [[...array]]
    for (let i=0;i<size;i++) {
        let min = i
        for (let j=i+1; j<size; j++) {
            if (array[min] > array[j]) {
                min = j
            }
        }
        [array[i], array[min]] = [array[min], array[i]]
        historyArray.push([...array]);
    }

    setSortHistory(historyArray)
    setPlaying(true)
}

export default selectionSort