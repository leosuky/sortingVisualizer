import React from 'react'
import './rangeslider.css';

function RangeSlider({onChange, value}) {
    // const [value, setValue] = React.useState(50)

    // const handlechange = event => {
    //     let v = event.target.value
    //     setValue(v)
    // }
  return (
    <div className='range'>
        <div className="title">
            <h4>Set Array Size</h4>
        </div>

        <div className="field">
            <input type="range" min={5} max={100} step={5} onChange={onChange} title={value} value={value}/>
        </div>
    </div>
  )
}

export default RangeSlider