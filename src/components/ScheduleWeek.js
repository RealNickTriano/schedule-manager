import React, { useState, useEffect } from 'react'
import Day from './Day'
import { query, collection, getDocs, where } from "firebase/firestore";
import { auth, db, getUserScheduleForOrg } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const ScheduleWeek = ({ startDay }) => {

    /**
     * Takes a startDay (Sunday) and displays Day componenets for the week
     * including startDay, so Sun-Sat
     */

    const [user, loading, error] = useAuthState(auth);

    const [days, setDays] = useState([])
    const [details, setDetails] = useState([])

    useEffect(() => {
        if (!startDay) return
        const myDays = []
        const myDeats = []
        myDays.push(startDay)
        let day = startDay
        for (let i = 0; i < 6; i++) {
            day = new Date(day.getTime() + 60 * 60 * 24 * 1000)
            myDays.push(day)
        }  
        setDays(myDays)
        fetchTimes(myDays)
      
    }, [startDay])

    const fetchTimes = async (myDays) => {
       const myArray = await getUserScheduleForOrg(user?.uid, 'testOrg', myDays)
       setDetails(myArray)
    }
    
  return (
    <div className='flex justify-center items-center gap-2'>
        {
            days.map((item, index) => {
                return (
                    <Day 
                        key={index}
                        position={details[index] ? details[index].position : ''}
                        timeStart={details[index] ? details[index].timeStart * 1000 : ''}
                        timeEnd={details[index] ? details[index].timeEnd * 1000 : ''}
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