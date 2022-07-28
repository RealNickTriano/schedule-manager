import React from 'react'

const Day = () => {
  return (
    <div className='flex flex-col justify-center items-center text-center bg-white rounded-xl shadow-md'>
        <div className='border-b-2 border-blue-500 w-1/2'>
            <h1 className='font-bold'>Mon</h1>
            <h1>July 25</h1>
        </div>
        <div className='flex flex-col justify-center items-center pt-4 pb-10 px-4'>
            <h1 className='font-bold bg-gray-300 rounded-full px-8'>Dinner</h1>
            <h1 className=''>4:00PM - 10:00PM</h1>
            <h1 className=''>Open</h1>
            <h1 className=''>{`(Server)`}</h1>
        </div>
    </div>
  )
}

export default Day