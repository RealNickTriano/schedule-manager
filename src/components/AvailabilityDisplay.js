import React, { useState } from 'react'
import { FaAngleDown } from "react-icons/fa";
import TimeDropDown from './TimeDropDown';

const AvailabilityDisplay = ({ dayName, isAvailable, timeStart, timeEnd }) => {

  const [showFrom, setShowFrom] = useState(false)
  const [showTo, setShowTo] = useState(false)
  const [available, setAvailable] = useState(isAvailable)
  const [myTimeStart, setMyTimeStart] = useState(timeStart)
  const [myTimeEnd, setMyTimeEnd] = useState(timeEnd)
  
  const DisplayTime = (date) => {
    let output = ''
    let suffix = 'am'
    let h = date.getHours();
    let m = date.getMinutes();

    if(h > 11)
    {
      suffix = 'pm'
    }
    if (h > 12)
    {
      h -= 12
    }

    output = `${h === 0 ? 12 : h }:${m < 10 ? `0${m}` : m} ${suffix}`
    return output
  }

  return (
    <div className='flex flex-col justify-center items-center gap-2 text-center text-white'>
        <h1 className='font-medium text-xl'>{dayName}</h1>
        <button 
          onClick={() => setAvailable(!available)}
          className={`text-md font-bold ${available ? 'text-green-600' : 'text-red-500'}`}>{available ? 'Available' : 'Unavailable'}</button>
        { available &&
          <div className='flex flex-col justify-center items-center text-lg gap-2'>
            <div className='flex flex-col justify-center items-center gap-2 relative text-lg font-medium'>
              <h1>From:</h1>
              <button
                className='flex justify-center items-center gap-2 border-2 border-white rounded-full px-4'
                onClick={() => setShowFrom(!showFrom)}
                onBlur={ () => setTimeout(() => {
                  setShowFrom(false)
                }, 200)
                  }
              >{DisplayTime(myTimeStart)} <FaAngleDown /></button>
              <TimeDropDown 
                showTimeMenu={showFrom}
                setMyTime={setMyTimeStart}
              />
            </div>

            <div className='flex flex-col justify-center items-center gap-2 relative text-lg font-medium'>
              <h1>To:</h1>
              <button
                className='flex justify-center items-center gap-2 border-2 border-white rounded-full px-4'
                onClick={() => setShowTo(!showTo)}
                onBlur={ () => setTimeout(() => {
                  setShowTo(false)
                }, 200)
                  }
              >{DisplayTime(myTimeEnd)} <FaAngleDown /></button>
              <TimeDropDown 
                showTimeMenu={showTo}
                setMyTime={setMyTimeEnd}
              />
            </div>
          </div>
            
        }
    </div>
  )
}

export default AvailabilityDisplay