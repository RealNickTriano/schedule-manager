import React, { useState, useEffect } from 'react'
import { auth, getUserAvailabilityForOrg } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import AvailabilityDisplay from './AvailabilityDisplay'

const AvailabilityCard = ({ org }) => {

    const [user, loading, error] = useAuthState(auth);
    const [availability, setAvailability] = useState([])

    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

    useEffect(() => {
        if (!user) return
        fetchAvailability()

    }, [user])
    
    const fetchAvailability = async () => {
        const myArray = await getUserAvailabilityForOrg(user?.uid, org)
        setAvailability(myArray)
     }

  return (
    <div className='flex flex-col justify-center items-start bg-gray-800 rounded-lg shadow-lg mt-12 pt-5'>
        <div className='bg-indigo-600 flex justify-between items-center w-full py-2 px-5'>
            <h1 className='font-bold text-xl'>Your Availabilty for {org}</h1>
        </div>
        <div
            className="flex justify-around items-start w-[1200px] mt-5 mx-5 h-64">
                {
                    availability.map((item, index) => {
                        return (
                            <AvailabilityDisplay 
                                key={index}
                                dayName={dayNames[index]}
                                isAvailable={item.available}
                                timeStart={new Date(item.timeStart.seconds * 1000)}
                                timeEnd={new Date(item.timeEnd.seconds * 1000)}
                            />
                        )
                    })
                }
        </div>
    </div>

  )
}

export default AvailabilityCard