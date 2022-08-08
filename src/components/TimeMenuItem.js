import React from 'react'

const TimeMenuItem = ({ content, setMyTime }) => {

  const DisplayTime = (date) => {
    let output = ''
    let suffix = 'am'
    let h = date.getHours();
    let m = date.getMinutes();

    if(h > 11)
    {
      suffix = 'pm'
    }
    if (h > 12)
    {
      h -= 12
    }

    output = `${h === 0 ? 12 : h }:${m < 10 ? `0${m}` : m} ${suffix}`
    return output
  }

  return (
    <button 
        onClick={() => setMyTime(content)} 
        class="block px-4 py-2 text-lg hover:bg-gray-800 hover:cursor-pointer font-medium"
    >{DisplayTime(content)}</button>
  )
}

export default TimeMenuItem