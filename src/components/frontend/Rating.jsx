
import React from 'react'
import { FaRegStar, FaStar } from 'react-icons/fa'

function Rating() {
  return (
    <div className="flex items-center">
      <FaStar className="text-[#FF9900]"/>
      <FaStar className="text-[#FF9900]"/>
      <FaStar className="text-[#FF9900]"/>
      <FaStar className="text-[#FF9900]"/>
      <FaRegStar className="text-[#FF9900]"/>
      <span className="mr-2 ml-3 rounded bg-[#FF9900] text-white px-2.5 py-0.5 text-xs font-semibold ">
        4.0
      </span>
    </div>
  )
}

export default Rating