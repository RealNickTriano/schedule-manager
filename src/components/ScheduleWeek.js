import React, { useState, useEffect } from 'react'
import Day from './Day'
import { query, collection, getDocs, where } from "firebase/firestore";
import { db } from "../firebase";

const ScheduleWeek = ({ startDay, user }) => {

    /**
     * Takes a startDay (Sunday) and displays Day componenets for the week
     * including startDay, so Sun-Sat
     */

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
        console.log(myDays)
        setDays(myDays)
        fetchTimes(myDays)
      
    }, [startDay])

    const fetchTimes = async (myDays) => {
        const myDeats =[]

        try {
            const q = query(collection(db, "testOrg"), where("uid", "==", 'Hj9Y0kISYUVzV9paVjaDWp4yfdI2'));
            const doc = await getDocs(q);
            const data = doc.docs[0].data();
            myDays.forEach((item1, index) => {
                const result = data.schedule.find(item => 
                    (new Date(item.timeStart.seconds * 1000).getDate() === item1.getDate())
                    && (new Date(item.timeStart.seconds * 1000).getMonth() === item1.getMonth())
                    && (new Date(item.timeStart.seconds * 1000).getFullYear() === item1.getFullYear()))
                myDeats.push(result)
            })
            setDetails(myDeats)
            } catch (error) {
            console.log(error)
        }

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