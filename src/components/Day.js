import React from 'react'
import { useState } from 'react'
import DayTooltip from './DayTooltip'

const Day = ({ dayName, monthName, dayNumber }) => {
  const [displayTip, setDisplayTip] = useState(false)
  const [mouseX, setMouseX] = useState(null)
  const [mouseY, setMouseY] = useState(null)

  const daysOfWeek = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat']
  const months = ['January', 'Feburary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

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
      className='flex flex-col justify-center items-center text-center bg-white rounded-xl shadow-md'>
        <div className='border-b-2 border-blue-500 w-1/2'>
            <h1 className='font-bold'>{daysOfWeek[dayName]}</h1>
            <h1>{months[monthName]} {dayNumber}</h1>
        </div>
        <div className='flex flex-col justify-center items-center pt-4 pb-10 px-4'>
            <h1 className=''>4:00PM - 10:00PM</h1>
            <h1 className=''>{`(Server)`}</h1>
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