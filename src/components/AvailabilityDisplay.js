import React from 'react'
import { FcCheckmark, FcCancel } from "react-icons/fc";

const AvailabilityDisplay = ({ dayName, isAvailable, timeStart, timeEnd }) => {

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
          <h1 className='font-medium'>{timeStart && DisplayTime(timeStart)} - {timeStart &&DisplayTime(timeEnd)}</h1>
        }
    </div>
  )
}

export default AvailabilityDisplay