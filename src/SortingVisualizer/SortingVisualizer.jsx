import React from 'react'
import './sortingvisualizer.css'


function SortingVisualizer() {
    const [array, setArray] = React.useState([])
    const [sortHistory, setSortHistory] = React.useState([[...array]])
    const [playing, setPlaying] = React.useState(false)
    const [loop, setLoop] = React.useState(0)
    const colors = ['808080', 'a0a0a0', 'c0c0c0']

    const size = array.length;
    const timeoutRef = React.useRef()

    const randomIntFromInterval = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    const resetArray = React.useCallback(() => {
        const emptyArray = []
        for (let i=0; i<50; i++) {
            emptyArray.push(randomIntFromInterval(5, 700));
        }
        setArray(emptyArray)
        setLoop(0)
        setPlaying(false)
        // setSortHistory([[...array]])
    },[])

    React.useEffect(() => {
        setArray(sortHistory[loop]);
        console.log('copy')
    }, [loop, sortHistory]);
    
    React.useEffect(() => {
        resetArray()
        console.log('mine')
    },[resetArray])
    
    const bubblesort = () => {
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

    React.useEffect(() => {
        if (loop < sortHistory.length -1 && playing) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = setTimeout(() => {
                setLoop(loop +1);
            }, 1)
        }else setPlaying(false)
    }, [loop, playing, sortHistory.length])

    // const quickSort = () => {}
    // const heapSort = () => {}
    // const mergeSort = () => {}

  return (
    <>
        <div className="array-container">
            {
                array.map((value, idx) => (
                    <div 
                        className='array-bar' 
                        key={idx}
                        style={{
                            height: `${value}px`,
                            backgroundColor: playing? `#${colors[idx%3]}`:'green'
                        }}
                    >
                    </div>
                ))
            }
        </div>

        <button disabled={playing ? true:false} onClick={() => resetArray()}>RESET</button>
        <button onClick={() => bubblesort()}>Merge Sort</button>
        {/* <button onClick={() => quickSort()}>Quick Sort</button>
        <button onClick={() => heapSort()}>Heap Sort</button>
        <button onClick={() => mergeSort()}>Bubble Sort</button> */}
    </>
  )
}

export default SortingVisualizer