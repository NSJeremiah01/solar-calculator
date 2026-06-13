import { RiSunFill } from "react-icons/ri";
import { RiCelsiusFill } from "react-icons/ri";
import { MdSunny } from "react-icons/md";
import { WiSunset } from "react-icons/wi";
import { WiHumidity } from "react-icons/wi";

function Weather() {

  return ( 
  <div className="w-full mt-4  p-6 bg-white rounded-2xl shadow-sm">
    <div>
      <h3 className="font-bold text-xs sm:text-sm md:text-xl">Weather & Solar Conditions</h3>
      <p className="font-semibold text-black/50 text-xs sm:text-sm">Lagos, Nigeria</p>
    </div>

    <div className="flex justify-between">
      <div className="flex gap-4 translate-y-8">
        <div className="font-bold text-3xl  sm:text-4xl lg:text-5xl text-amber-400">
          <RiSunFill />
        </div>
         <div className="">
          <span className="flex">
            <h1 className="font-bold text-sm sm:text-lg  md:text-2xl">32</h1>
            <h2 className="font-bold text-sm sm:text-lg  md:text-2xl"><RiCelsiusFill /></h2>
          </span>
            <p className="font-semibold text-xs text-black/60">Sunny</p>
         </div>
      </div>
     
      <div className="px-2 wrap-break-word line-clamp-2">
       <div className="flex items-center gap-4">
        <MdSunny className="text-amber-200" />
        <p className="text-xs sm:text-sm">Peak Sun Hours</p>
       </div>

         <div className="flex items-center gap-4">
          <WiSunset className="text-blue-300" />
          <p className="text-xs sm:text-sm">Irridiance</p>
         </div>

         <div className="flex items-center gap-4">
          <WiHumidity className="text-emerald-500" />
           <p className="text-xs sm:text-sm">Humidity</p>
         </div>



      </div>

      <div className="wrap-break-word line-clamp-2">
     <p className="text-xs sm:text-sm">5.8h</p>
     <p className="text-xs sm:text-sm">6.2kWh/<span>m<sup>3</sup></span></p>
     <p className="text-xs sm:text-sm">65%</p>
      </div>



    </div>





  </div>


   );
}

export default Weather;