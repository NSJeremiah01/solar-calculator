import React from "react";


import { MdFrontHand } from "react-icons/md";
import DateRangePicker from "./UI/DateRangePicker";
import { useState, useEffect } from "react";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./UI/card";

import { GoProjectRoadmap } from "react-icons/go";
import { IoMdArrowDropup } from "react-icons/io";
import { MdPhotoSizeSelectLarge } from "react-icons/md";
import { MdOutlineSavings } from "react-icons/md";
import { LuLeaf } from "react-icons/lu";
import { MdArrowDropDown } from "react-icons/md";
import { LuClock2 } from "react-icons/lu";
import BodyPart1 from "./BodyPart1";

function Body() {
 const [start, setStart] = useState(new Date("2026-05-20"));
 const [end, setEnd] = useState(new Date ("2026-05-26"));

    const handleFilterChange = (newStart, newEnd) => {
   setStart(newStart);
   setEnd(newEnd);
    };
  return ( 
<>
  <div className="w-full px-4  overflow-x-hidden">
    <div className="flex items-center p-4 justify-between">
      <div className="">
      <div className="flex items-center relative">
        <h2 className="font-bold text-xs sm:text-sm ">Welcome back, Sunday!</h2> 
        <MdFrontHand className="text-yellow-300 text-sm" />
      </div>
      <div>
        <p className="text-xs sm:text-sm ">Here's what's happening with your solar projects today.</p>
      </div>
   </div>
    <div className=" text-left flex justify-start text-xs md:text-sm px-2 wrap-break-word line-clamp-2">
       <DateRangePicker
       startDate={start}
       endDate={end}
       onRangeChange={handleFilterChange}
       label="Filter Dates By:"
       />
    </div>

  </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2 mb-2 items-stretch ">
      <div className="flex items-start gap-3 py-6 px-3 border  border-gray-100 rounded-lg shadow-sm bg-white">
        {/* Icon */}
        <span className="bg-[#a855f7]/20 rounded-full mt-1 p-2 shrink-0">
          <GoProjectRoadmap className="text-[#a855f7] text-xs w-full h-auto object-cover" />
        </span>
        {/* Text stack */}
        <div className="min-w-0 gap-2 flex flex-col">
          <p className="text-xs text-gray-500 wrap-break-word line-clamp-2">Total Projects</p>
          <p className="text-xl font-bold wrap-break-word line-clamp-2">24</p>
          <div className="flex items-center gap-0.5">
            <IoMdArrowDropup className="text-green-500 text-sm" />
            <span className="text-green-500 text-xs">12%</span>
            <span className="text-gray-400 text-xs whitespace-nowrap wrap-break-word line-clamp-2">from last month</span>
          </div>
        </div>
      </div>

        <div className="flex items-start  gap-3 py-6 px-3 border bg-white border-gray-100 rounded-lg shadow-sm">
        {/* Icon */}
        <span className="bg-green-100 rounded-full mt-1 p-2 shrink-0">
          <MdPhotoSizeSelectLarge className="text-green-600 text-xs" />
        </span>
        {/* Text stack */}
        <div className="min-w-0 gap-2 flex flex-col">
          <p className="text-xs text-gray-500 wrap-break-word line-clamp-2">System Size</p>
          <p className="text-xl font-bold wrap-break-word line-clamp-2">128.4 <span className="text-xs ">kw</span></p>
          <div className="flex items-center gap-0.5">
            <IoMdArrowDropup className="text-green-500 text-sm" />
            <span className="text-green-500 text-xs  ">18%</span>
            <span className="text-gray-400 text-xs whitespace-nowrap wrap-break-word line-clamp-2">from last month</span>
          </div>
        </div>
      </div>


     <div className="flex items-start  gap-3 py-6 px-3 border bg-white border-gray-100 rounded-lg shadow-sm">
        {/* Icon */}
        <span className="bg-[#a67c00]/20 rounded-full mt-1 p-2 shrink-0">
          <MdOutlineSavings className="text-[#a67c00] text-xs" />
        </span>
        {/* Text stack */}
        <div className="min-w-0 gap-2 flex flex-col">
          <p className="text-xs text-gray-500 wrap-break-word line-clamp-2">Monthly Savings</p>
          <p className="text-xl font-bold wrap-break-word line-clamp-2">₦1,245,000</p>
          <div className="flex items-center gap-0.5">
            <IoMdArrowDropup className="text-green-500 text-sm" />
            <span className="text-green-500 text-xs">15%</span>
            <span className="text-gray-400 text-xs whitespace-nowrap wrap-break-word line-clamp-2">from last month</span>
          </div>
        </div>
      </div>

      <div className="flex items-start  gap-3 py-6 px-3 border bg-white border-gray-100 rounded-lg shadow-sm">
        {/* Icon */}
        <span className="bg-green-50 rounded-full mt-1 p-2 shrink-0">
          <LuLeaf className="text-green-500 text-xs" />
        </span>
        {/* Text stack */}
        <div className="min-w-0 gap-2 flex flex-col">
          <p className="text-xs text-gray-500 wrap-break-word line-clamp-2">CO₂ Reduction</p>
          <p className="text-xl font-bold wrap-break-word line-clamp-2">12.8 Ton</p>
          <div className="flex items-center gap-0.5">
            <IoMdArrowDropup className="text-green-500 text-sm" />
            <span className="text-green-500 text-xs ">15%</span>
            <span className="text-gray-400 text-xs whitespace-nowrap wrap-break-word line-clamp-2">from last month</span>
          </div>
        </div>
      </div>

      <div className="flex items-start  gap-3 py-6 px-3 border bg-white border-gray-100 rounded-lg shadow-sm">
        {/* Icon */}
        <span className="bg-[#080838]/30 rounded-full mt-1 p-2 shrink-0">
          <LuClock2 className="text-blue-700 text-xs" />
        </span>
        {/* Text stack */}
        <div className="min-w-0 gap-2 flex flex-col">
          <p className="text-xs text-gray-500 wrap-break-word line-clamp-2">Payback Period</p>
          <p className="text-xl font-bold wrap-break-word line-clamp-2">3.6 Years</p>
          <div className="flex items-center gap-0.5">
            <MdArrowDropDown className="text-red-500 text-sm" />
            <span className="text-red-500 text-xs ">0.3%</span>
            <span className="text-gray-400 text-xs whitespace-nowrap wrap-break-word line-clamp-2">from last month</span>
          </div>
        </div>
      </div>








    </div>

  <BodyPart1/>

  </div>


</>




   );
}

export default Body;