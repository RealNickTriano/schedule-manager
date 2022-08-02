import React, { useState } from 'react'
import TimeMenuItem from './TimeMenuItem'

const TimeDropDown = ({ showTimeMenu }) => {

    const [menuAnimation, setMenuAnimation] = useState('')

    const times = ['12:00 am', '1:00 am', '2:00 am', '3:00 am', '4:00 am', '5:00 am', '6:00 am', '7:00 am', '8:00 am', '9:00 am', '10:00 am', '11:00 am', '12:00 pm', '1:00 pm', '2:00 pm', '3:00 pm', '4:00 pm', '5:00 pm', '6:00 pm', '7:00 pm', '8:00 pm', '9:00 pm', '10:00 pm', '11:00 pm',]

    const handleMenuChange = () => {
        if (showTimeMenu)
        {
            setMenuAnimation('animate-leaving')
        }
        else if(!showTimeMenu)
        {
            setMenuAnimation('animate-entering')
        }  
    }

  return (
    <>
        { showTimeMenu &&
            <div class={`origin-top-right absolute top-0 -right-10 mt-6 rounded-md shadow-lg py-1 text-white bg-gray-900 focus:outline-none ${menuAnimation} h-64 overflow-y-scroll z-20`} role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">
                {
                    times.map((item,index) => {
                        return (
                            <TimeMenuItem 
                                key={index}
                                content={item}
                            />
                        )
                    })
                }
            </div>
        }
    </>
  )
}

export default TimeDropDown