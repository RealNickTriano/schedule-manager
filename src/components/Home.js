import React from 'react'
import { FaAngleDoubleRight, FaAngleDoubleLeft } from "react-icons/fa";
import Day from './Day';

const Home = () => {
  return (
    <div className='flex flex-col justify-center items-center min-h-screen'>
        <h1 className="text-3xl text-blue-500 text-center font-bold">Welcome, Nick!</h1>
        <div className='flex flex-col justify-center items-center bg-gray-100 rounded-lg shadow-md mt-12'>
            <div className='bg-blue-400 flex justify-between items-center w-full py-2 px-5'>
                <h1 className='font-bold'>Your Schedule</h1>
                <div className='flex justify-center items-center gap-2'>
                    <FaAngleDoubleLeft />
                    <FaAngleDoubleRight />
                </div>
            </div>
            <div className='flex justify-center items-center'>
                <Day />
                <Day />
                <Day />
                <Day />
                <Day />
                <Day />
                <Day />
            </div>
        </div>
    </div>
  )
}

export default Home