import React, { useEffect, useState, useRef } from 'react'

const DayTooltip = ({ display, mouseX, mouseY }) => {
    const [height, setHeight] = useState(0);
    const box = useRef(null);

    useEffect(() => {
        if (box.current && box.current.clientHeight)
        {
            setHeight(box.current.clientHeight)
        }
        
    }, [display]);

  return (
    <>
        {
            display && 
            <div 
                ref={box}
                className='bg-white p-16 shadow-lg rounded-md absolute'
                style={{ left: mouseX, top: mouseY - height}}
            >
                <h1>Tool Tip</h1>
            </div>
        }
    </>
    
  )
}

export default DayTooltip