import React from "react";
import { RiBattery2ChargeLine } from "react-icons/ri";
import TextTruncate from "./UI/TextTruncate";

function Recommendations() {


  return ( 
    <div className="w-full  p-5 bg-white rounded-2xl shadow-sm">
      
     <div className="flex items-center justify-between mb-4 wrap-break-word line-clamp-2">
        <h2 className="text-xs sm:text-sm md:text-xl font-bold text-gray-800">System Recommendations</h2>
        <select className="px-2 py-1 text-xs bg-gray-50 border border-gray-200 rounded-lg text-gray-600 focus:outline-none">
        <option >View All</option>
        <option >Select View</option>

        </select>
     </div>
       
      <div className="gap-3 flex flex-col">


       <div className="flex flex-col gap-2   px-2 bg-white rounded-xl shadow-sm">
          <div  className="flex items-start justify-between gap-2 wrap-break-word line-clamp-2">
            <div className="flex items-center gap-2">
              <RiBattery2ChargeLine className="text-emerald-600 text-xl shrink-0" />
               <h3 className="text-xs sm:text-sm font-semibold text-gray-900">Increase Battery Capacity</h3>
            </div>
               <span className="text-xs px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded-md shrink-0 wrap-break-word line-clamp-2">
              Recommended
            </span>
          </div> 

            <div className="text-xs text-gray-500 leading-relaxed">
             

              <TextTruncate text={'Consider adding a battery storage system to store excess energy generated during the day for use at night or during cloudy days. And based on your load profile, increase battery capacity to 20kwh will improve backup by 35%'}  />
              
            </div>
            
              
       </div>

 <div className="flex flex-col gap-2   px-2 bg-white rounded-xl shadow-sm">
          <div  className="flex items-start justify-between gap-2 wrap-break-word line-clamp-2">
            <div className="flex items-center gap-2">
              <RiBattery2ChargeLine className="text-purple-600 text-xl shrink-0" />
               <h3 className="text-xs sm:text-sm font-semibold text-gray-900">Upgrade to MPPT Controller</h3>
            </div>
               <span className="text-xs px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded-md shrink-0 wrap-break-word line-clamp-2">
              Recommended
            </span>
          </div> 

            <div className="text-xs text-gray-500 leading-relaxed">
             

              <TextTruncate text={'Consider upgrading to an MPPT (Maximum Power Point Tracking) controller to improve the efficiency of your solar panel system. And based on your load profile, increase battery capacity to 20kwh will improve backup by 35%'}  />
              
            </div>
            
              
       </div>




       




      </div>




    </div>




   );
}

export default Recommendations;