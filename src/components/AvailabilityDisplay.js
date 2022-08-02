import React, { useState } from 'react'
import { FcCheckmark, FcCancel } from "react-icons/fc";
import TimeDropDown from './TimeDropDown';

const AvailabilityDisplay = ({ dayName, isAvailable, timeStart, timeEnd }) => {

  const [showFrom, setShowFrom] = useState(false)
  const [showTo, setShowTo] = useState(false)

  const DisplayTime = (date) => {
    let output = ''
    let suffix = 'am'
    console.log(date)
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
    <div className='flex flex-col justify-center items-center gap-2 text-center text-white'>
        <h1 className='font-medium text-xl'>{dayName}</h1>
        <h1 className={`text-md font-bold ${isAvailable ? 'text-green-600' : 'text-red-500'}`}>{isAvailable ? 'Available' : 'Unavailable'}</h1>
        { isAvailable &&
          <div className='flex flex-col justify-center items-center text-lg'>
            <div className='flex justify-center items-center gap-2 relative text-lg font-medium'>
              <h1>From:</h1>
              <button
                onClick={() => setShowFrom(!showFrom)}
              >9:00 am</button>
              <TimeDropDown 
                showTimeMenu={showFrom}
              />
            </div>

            <div className='flex justify-center items-center gap-2 relative text-lg font-medium'>
              <h1>To:</h1>
              <button
                onClick={() => setShowTo(!showTo)}
              >5:00 pm</button>
              <TimeDropDown 
                showTimeMenu={showTo}
              />
            </div>
          </div>
            
        }
    </div>
  )
}

export default AvailabilityDisplay