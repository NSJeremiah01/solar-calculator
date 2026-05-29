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
  <div className="min-h-screen w-full px-2 mb-0 sm:px-6 lg:px-8">
    <div className="flex items-center p-4 justify-between">
      <div className="">
      <div className="flex items-center">
        <h2 className="font-bold">Welcome back, Sunday!</h2> <MdFrontHand className="text-yellow-300" />
      </div>
      <div>
        <p>Here's what's happening with your solar projects today.</p>
      </div>
   </div>
    <div className=" text-left flex justify-start">
       <DateRangePicker
       startDate={start}
       endDate={end}
       onRangeChange={handleFilterChange}
       label="Filter Dates By:"
       />
    </div>

  </div>
    <div className="flex gap-4 w-full ">
      <div>
        <Card size="sm" className="mx-auto w-full max-w-sm  border-black-50 shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-2 ">
              <span className="bg-[#080838]/20 rounded-full p-2 ">
              <GoProjectRoadmap className="text-blue-500  " />
              </span>
            <CardTitle> Total Projects</CardTitle>
            </div>
          </CardHeader>

          
          <CardContent>
          
              
           <div className="flex flex-col items-start pl-8 ">

              <p className="text-2xl font-bold leading-none">24</p>

             <div className="flex items-center leading-none">
              <IoMdArrowDropup className="text-2xl text-green-500" /> 
              <span className="text-green-500">12%</span>
              <span className="text-black pl-2 whitespace-nowrap">from last month</span>
              </div>
            </div>
            
          </CardContent>
          
        </Card>
      </div>

        <div>
        <Card size="sm" className="mx-auto w-full max-w-sm border-black-50 shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-2 ">
              <span className="bg-green-50 rounded-full p-2 ">
              <MdPhotoSizeSelectLarge className="text-green-400 " />
              </span>
            <CardTitle> Total System Size</CardTitle>
            </div>
          </CardHeader>

          
          <CardContent>
          
              
           <div className="flex flex-col items-start pl-8 ">

              <p className="text-2xl font-bold leading-none">128.4 <span className="text-xs ">kw</span></p>

             <div className="flex items-center leading-none ">
              <IoMdArrowDropup className="text-2xl text-green-500" /> 
              <span className="text-green-500">18%</span>
              <span className="text-black pl-2 whitespace-nowrap">from last month</span>
              </div>
            </div>
            
          </CardContent>
          
        </Card>
      </div>

      <div>
        <Card size="sm" className="mx-auto w-full max-w-sm border-black-50 shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-2 ">
              <span className="bg-[#a67c00]/20 rounded-full p-2 ">
              <MdOutlineSavings className="text-[#a67c00]  " />
              </span>
            <CardTitle> Monthly Savings</CardTitle>
            </div>
          </CardHeader>

          
          <CardContent>
          
              
           <div className="flex flex-col items-start pl-8 ">

              <p className="text-2xl font-bold leading-none ">₦1,245,000</p>

             <div className="flex items-center leading-none ">
              <IoMdArrowDropup className="text-2xl text-green-500" /> 
              <span className="text-green-500">15%</span>
              <span className="text-black pl-2 whitespace-nowrap">from last month</span>
              </div>
            </div>
            
          </CardContent>
          
        </Card>
      </div>

      <div>
        <Card size="sm" className="mx-auto w-full max-w-sm border-black-50 shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-2 ">
              <span className="bg-green-50 rounded-full p-2 ">
              <LuLeaf className="text-green-500 " />
              </span>
            <CardTitle> CO₂ Reduction</CardTitle>
            </div>
          </CardHeader>

          
          <CardContent>
          
              
           <div className="flex flex-col items-start pl-8 ">

              <p className="text-2xl font-bold leading-none">12.8 Ton</p>

             <div className="flex items-center leading-none">
              <IoMdArrowDropup className="text-2xl text-green-500" /> 
              <span className="text-green-500">10%</span>
              <span className="text-black pl-2 whitespace-nowrap">from last month</span>
              </div>
            </div>
            
          </CardContent>
          
        </Card>
      </div>

      <div>
        <Card size="sm" className="mx-auto w-full max-w-sm border-black-50 shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-2 ">
              <span className="bg-[#080838]/30 rounded-full p-2 ">
              <LuClock2 className="text-blue-700  " />
              </span>
            <CardTitle> Avg. Payback Period</CardTitle>
            </div>
          </CardHeader>

          
          <CardContent>
          
              
           <div className="flex flex-col items-start pl-8 ">

              <p className="text-2xl font-bold leading-none">3.6 Years</p>

             <div className="flex items-center leading-none ">
              <MdArrowDropDown className="text-2xl text-red-500" /> 
              <span className="text-red-500">0.3</span>
              <span className="text-black pl-2 whitespace-nowrap">from last month</span>
              </div>
            </div>
            
          </CardContent>
          
        </Card>
      </div>






    </div>

  <BodyPart1/>

  </div>


</>




   );
}

export default Body;