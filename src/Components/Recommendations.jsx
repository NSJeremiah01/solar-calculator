import React from "react";
import { RiBattery2ChargeLine } from "react-icons/ri";
import TextTruncate from "./UI/TextTruncate";

function Recommendations() {


  return ( 
    <div className="w-150 h-auto  m-4 max-w-5xl p-6 bg-white rounded-2xl shadow-sm">
     <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800">System Recommedations</h2>
        <select className="px-3 py-1.5 text-sm bg-gray-50 border border-gray-200 rounded-lg text-gray-600 focus:outline-none">
        <option >View All</option>
        <option >Select View</option>

        </select>
     </div>
       
      <div className="gap-4 flex flex-col">
       <div className="flex justify-between w-138 h-40 items-center  max-w-5xl  px-2 bg-white rounded-2xl shadow-sm">
         <div className="font-bold text-3xl px-2 -translate-y-10 text-emerald-600">
          <RiBattery2ChargeLine />
         </div>

         <div>
          <h3 className="text-lg font-semibold text-gray-900 -translate-y-0.5">Increase Battery Capacity</h3>

          <TextTruncate text={'Consider adding a battery storage system to store excess energy generated during the day for use at night or during cloudy days. And based on your load profile, increase battery capacity to 20kwh will improve backup by 35%'}  />
          
         </div>
        
          <button className="px-1 py-0.5  -translate-y-12 bg-emerald-500/10 text-emerald-600 rounded-lg focus:outline-none">
            Recommended
          </button>

       </div>

        <div className="flex justify-between w-138 h-40 items-center  max-w-5xl  px-2 bg-white rounded-2xl shadow-sm">
         <div className="font-bold text-3xl px-2 -translate-y-10 text-purple-600">
          <RiBattery2ChargeLine />
         </div>

         <div>
          <h3 className="text-lg font-semibold text-gray-900 -translate-y-0.5">Upgrade to MPPT Controller</h3>

          <TextTruncate text={'Consider upgrading to an MPPT (Maximum Power Point Tracking) controller to improve the efficiency of your solar panel system. And based on your load profile, increase battery capacity to 20kwh will improve backup by 35%'}  />
          
         </div>
        
          <button className="px-1 py-0.5  -translate-y-12 bg-emerald-500/10 text-emerald-600 rounded-lg focus:outline-none">
            Recommended
          </button>

       </div>




      </div>




    </div>




   );
}

export default Recommendations;