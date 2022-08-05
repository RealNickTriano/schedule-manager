import React from 'react'
import { useState, useEffect } from 'react'
import DayTooltip from './DayTooltip'

const Day = ({ dayName, monthName, dayNumber, position, timeStart, timeEnd }) => {
  const [displayTip, setDisplayTip] = useState(false)
  const [mouseX, setMouseX] = useState(null)
  const [mouseY, setMouseY] = useState(null)
  const [start, setStart] = useState(new Date(timeStart))
  const [end, setEnd] = useState(new Date(timeEnd))

  const daysOfWeek = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat']
  const months = ['January', 'Feburary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

  useEffect(() => {
    setStart(new Date(timeStart))
    setEnd(new Date(timeEnd))
  }, [timeStart, timeEnd])
  
  const DisplayTime = (date) => {
    let output = ''
    let suffix = 'am'
    let h = date.getHours();
    let m = date.getMinutes();
    let s = date.getSeconds();

    if(h > 11)
    {
      suffix = 'pm'
    }
    if (h > 12)
    {
      h -= 12
    }

    output = `${h}:${m < 10 ? `0${m}` : m} ${suffix}`
    return output
  }

  return (
    <div 
      onMouseMove={(e) => {
        setMouseX(e.clientX)
        setMouseY(e.clientY)
      }}
      onMouseEnter={(e) => {
        setDisplayTip(true)
      }}
      onMouseLeave={(e) => {
        setDisplayTip(false)
      }}
      className={`hover:cursor-pointer flex flex-col justify-start items-center text-center text-white bg-gray-900 rounded-xl shadow-md ${dayNumber === new Date().getDate() && monthName === new Date().getMonth() ? 'mb-12 bg-stone-900' : ''}`}
      style={{minWidth: '10rem', minHeight: '12rem'}} 
    >
        <div className='border-b-2 border-indigo-600 w-3/4 pb-2'>
            <h1 className='font-bold'>{daysOfWeek[dayName]}</h1>
            <h1>{months[monthName]} {dayNumber}</h1>
        </div>
        <div className='flex flex-col justify-center items-center pt-4 pb-10 px-4'>
          {timeStart && <h1 className=''>{DisplayTime(start)} - {DisplayTime(end)}</h1>}
            <h1 className=''>{position}</h1>
        </div>
        <DayTooltip 
          display={displayTip}
          mouseX={mouseX}
          mouseY={mouseY}
        />
    </div>
  )
}

export default Day