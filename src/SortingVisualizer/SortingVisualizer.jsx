import React from 'react'
import './sortingvisualizer.css'

import { 
    selectionSort, bubblesort,
    insertionSort
} from '../Algorithms'


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
        for (let i=0; i<100; i++) {
            emptyArray.push(randomIntFromInterval(5, 700));
        }
        setArray(emptyArray)
        setLoop(0)
        setPlaying(false)
    },[])

    React.useEffect(() => {
        setArray(sortHistory[loop]);
        console.log('copy')
    }, [loop, sortHistory]);
    
    React.useEffect(() => {
        resetArray()
        console.log('mine')
    },[resetArray])
    

    React.useEffect(() => {
        if (loop < sortHistory.length -1 && playing) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = setTimeout(() => {
                setLoop(loop +1);
            }, 100)
        }else setPlaying(false)
    }, [loop, playing, sortHistory.length])


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
        <button 
            disabled={playing ? true:false}
            onClick={() => bubblesort({size, setSortHistory, setPlaying, array})}
        >
            Bubble Sort
        </button>
        <button 
            disabled={playing ? true:false}
            onClick={() => selectionSort({size, setSortHistory, setPlaying, array})}
        >
            Selection Sort
        </button>
        <button 
            disabled={playing ? true:false}
            onClick={() => insertionSort({size, setSortHistory, setPlaying, array})}
        >
            Insertion Sort
        </button>
    </>
  )
}

export default SortingVisualizer