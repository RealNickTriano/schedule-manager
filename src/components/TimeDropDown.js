import React, { useState } from 'react'
import TimeMenuItem from './TimeMenuItem'

const TimeDropDown = ({ showTimeMenu, setMyTime }) => {

    const [menuAnimation, setMenuAnimation] = useState('')

    const myDate = new Date(new Date().setMinutes(0))
    const times = []

    for (let i = 0; i < 24; i++) {
        times.push(new Date(myDate.setHours(i)))
    }

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
                                setMyTime={setMyTime}
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