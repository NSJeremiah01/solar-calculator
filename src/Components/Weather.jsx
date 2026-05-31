import { RiSunFill } from "react-icons/ri";
import { RiCelsiusFill } from "react-icons/ri";
import { MdSunny } from "react-icons/md";
import { WiSunset } from "react-icons/wi";
import { WiHumidity } from "react-icons/wi";

function Weather() {

  return ( 
  <div className="w-full mt-4  p-6 bg-white rounded-2xl shadow-sm">
    <div>
      <h3 className="font-bold text-xl">Weather & Solar Conditions</h3>
      <p className="font-semibold text-black/50 text-sm">Lagos, Nigeria</p>
    </div>

    <div className="flex justify-between">
      <div className="flex gap-4 translate-y-8">
        <div className="font-bold text-5xl text-amber-400">
          <RiSunFill />
        </div>
         <div className="">
          <span className="flex">
            <h1 className="font-bold text-2xl">32</h1>
            <h2 className="font-bold"><RiCelsiusFill /></h2>
          </span>
            <p className="font-semibold text-xs text-black/60">Sunny</p>
         </div>
      </div>
     
      <div>
       <div className="flex items-center gap-4">
        <MdSunny className="text-amber-200" />
        <p>Peak Sun Hours</p>
       </div>

         <div className="flex items-center gap-4">
          <WiSunset className="text-blue-300" />
          <p>Irridiance</p>
         </div>

         <div className="flex items-center gap-4">
          <WiHumidity className="text-emerald-500" />
           <p>Humidity</p>
         </div>



      </div>

      <div>
     <p>5.8h</p>
     <p>6.2kWh/<span>m<sup>3</sup></span></p>
     <p>65%</p>
      </div>



    </div>





  </div>


   );
}

export default Weather;