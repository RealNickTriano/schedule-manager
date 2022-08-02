import React from 'react'
import AvailabilityDisplay from './AvailabilityDisplay'

const AvailabilityCard = () => {

  return (
    <div className='flex flex-col justify-center items-start bg-gray-800 rounded-lg shadow-lg mt-12 pt-5'>
        <div className='bg-indigo-600 flex justify-between items-center w-full py-2 px-5'>
            <h1 className='font-bold text-xl'>Your Availabilty</h1>
        </div>
        <div
            className="flex justify-around items-center w-[1200px] overflow-x-hidden mt-5 mx-5 h-64">
                <AvailabilityDisplay 
                    dayName={'Sunday'}
                    isAvailable={true}
                    timeStart={new Date()}
                    timeEnd={new Date(new Date().getTime() + 60 * 60 * 6 * 1000)}
                />
                <AvailabilityDisplay 
                    dayName={'Monday'}
                    isAvailable={true}
                    /* timeStart={''}
                    timeEnd={''} */
                />
                <AvailabilityDisplay 
                    dayName={'Tuesday'}
                    isAvailable={true}
                    /* timeStart={''}
                    timeEnd={''} */
                />
                <AvailabilityDisplay 
                    dayName={'Wednesday'}
                    isAvailable={true}
                    /* timeStart={''}
                    timeEnd={''} */
                />
                <AvailabilityDisplay 
                    dayName={'Thursday'}
                    isAvailable={true}
                    /* timeStart={''}
                    timeEnd={''} */
                />
                <AvailabilityDisplay 
                    dayName={'Friday'}
                    isAvailable={true}
                    /* timeStart={''}
                    timeEnd={''} */
                />
                <AvailabilityDisplay 
                    dayName={'Saturday'}
                    isAvailable={true}
                    /* timeStart={''}
                    timeEnd={''} */
                />
        </div>
    </div>

  )
}

export default AvailabilityCard