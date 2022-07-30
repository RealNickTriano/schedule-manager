import React, { useState, useEffect } from 'react'
import Day from './Day'

const ScheduleWeek = ({ startDay }) => {

    /**
     * Takes a startDay (Sunday) and displays Day componenets for the week
     * including startDay, so Sun-Sat
     */

    const [days, setDays] = useState([])

    useEffect(() => {
      const myDays = []
      myDays.push(new Date(startDay))
      let day = new Date(startDay)
      for (let i = 0; i < 6; i++) {
        day = new Date(day.getTime() + 60 * 60 * 24 *1000)
        myDays.push(day)
      }  
      setDays(myDays)
    }, [])
    
  return (
    <div className='flex justify-center items-center gap-2 p-8'>
        {
            days.map((item, index) => {
                return (
                    <Day 
                        key={index}
                        dayName={item.getDay()}
                        monthName={item.getMonth()}
                        dayNumber={item.getDate()}
                    />
                )  
            })
        }
    </div>
  )
}

export default ScheduleWeek