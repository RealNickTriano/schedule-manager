import React, { useEffect, useState } from 'react'
import ScheduleWeek from './ScheduleWeek'
import { FaAngleDoubleRight, FaAngleDoubleLeft } from 'react-icons/fa'
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

const ScheduleCard = ({ org }) => {

    const [user, loading, error] = useAuthState(auth);
    const [startDays, setStartDays] = useState(Array(3).fill(null));
    const [weekAnimation, setWeekAnimation] = useState('');

    useEffect(() => {
        if (loading) return;
        const startDaysArray = []

        const currentDate = getFirstDayThisWeek()
        const prevDate = new Date(currentDate.getTime() - (60 * 60 * 24 * 1000 * 7))
        const nextDate = new Date(currentDate.getTime() + (60 * 60 * 24 * 1000 * 7))
        startDaysArray.push(prevDate)
        startDaysArray.push(currentDate)
        startDaysArray.push(nextDate)
        setStartDays(startDaysArray)

    }, [user, loading])

    const getFirstDayThisWeek = () => {
        const todayDate = new Date()
        const today = todayDate.getDay()
        let startDate = new Date()
        for (let i = 0; i < today; i++) {
            startDate = new Date(startDate.getTime() - 60 * 60 * 24 *1000) 
        }
        return startDate
    }

    const onArrowRight = () => {
        setWeekAnimation('slideLeft')

        setTimeout(() => {
            const oldStartDaysArray = startDays
            const newStartDaysArray = []

            const currentDate = oldStartDaysArray[2]
            const prevDate = oldStartDaysArray[1]
            const nextDate = new Date(currentDate.getTime() + (60 * 60 * 24 * 1000 * 7))
            
            newStartDaysArray.push(prevDate)
            newStartDaysArray.push(currentDate)
            newStartDaysArray.push(nextDate)
            setStartDays(newStartDaysArray)
            setWeekAnimation('')
        }, 500);   
    }

    const onArrowLeft = () => {
        setWeekAnimation('slideRight')
        setTimeout(() => {
            const oldStartDaysArray = startDays
            const newStartDaysArray = []

            const currentDate = oldStartDaysArray[0]
            const prevDate = new Date(currentDate.getTime() - (60 * 60 * 24 * 1000 * 7))
            const nextDate = oldStartDaysArray[1]

            newStartDaysArray.push(prevDate)
            newStartDaysArray.push(currentDate)
            newStartDaysArray.push(nextDate)
            setStartDays(newStartDaysArray)
            setWeekAnimation('')
        }, 500);
    }
    
  return (
    <div className='flex flex-col justify-center items-start bg-gray-800 rounded-lg shadow-lg mt-12 pt-5'>
                <div className='bg-indigo-600 flex justify-between items-center w-full py-2 px-5'>
                    <h1 className='font-bold text-xl'>Your Schedule for {org}</h1>
                    <div className='flex justify-center items-center gap-2'>
                        <button
                            onClick={() => onArrowLeft()}
                        >
                            <FaAngleDoubleLeft size={25}/>
                        </button>
                        <button
                            onClick={() => onArrowRight()}
                        >
                            <FaAngleDoubleRight size={25}/>
                        </button>
                    </div>
                </div>

                <div
                    className="flex justify-center items-center w-[1200px] overflow-x-hidden mt-5 mx-5 h-64">
                    <div 
                        className="flex justify-center items-center gap-5"
                        style={{animationName: weekAnimation, animationDuration: '0.5s'}} 
                    >
                        <ScheduleWeek 
                            org={org}
                            startDay={startDays[0]}
                        />
                        <ScheduleWeek 
                            org={org}
                            startDay={startDays[1]}
                        />
                        <ScheduleWeek 
                            org={org}
                            startDay={startDays[2]}
                        />
                    </div>
                </div>
            </div>
  )
}

export default ScheduleCard