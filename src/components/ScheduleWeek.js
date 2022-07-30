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
      const myDays = []
      const myDeats = []
      myDays.push(new Date(startDay))
      let day = new Date(startDay)
      for (let i = 0; i < 6; i++) {
        day = new Date(day.getTime() + 60 * 60 * 24 * 1000)
        myDays.push(day)
      }  
      setDays(myDays)
      fetchTimes(myDays)
      
    }, [])

    const fetchTimes = async (myDays) => {
        const myDeats =[]

        try {
            const q = query(collection(db, "testOrg"), where("uid", "==", 'Hj9Y0kISYUVzV9paVjaDWp4yfdI2'));
            const doc = await getDocs(q);
            const data = doc.docs[0].data();
            myDays.forEach((item1, index) => {
                const result = data.schedule.find(item => new Date(item.timeStart.seconds * 1000).getDate() === item1.getDate())
                myDeats.push(result)
            })
            setDetails(myDeats)
            } catch (error) {
            console.log(error)
        }

    }
    
  return (
    <div className='flex justify-center items-center gap-2 p-8'>
        {
            days.map((item, index) => {
                console.log(details)
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