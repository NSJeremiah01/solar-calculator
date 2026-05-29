import { useState } from "react";
import UniversalSolarDate from "./UniversalSolarDate";

const SolarCalculatorWorkspace = () => {
 const [forecastDate, setForeCastDate] = useState(null);

 const handleDateInput = (e) => {
 if (e.target.value) {
  setForeCastDate(new Date(e.target.value));
 } else {
  setForeCastDate(null);
 }

 };


  return(
  <div className="min-h-screen bg-slate-900 text-white p-6 space-y-8">
  <header className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
    <div>
      <h1 className="text-3xl font-bold tracking-tight">Solar Energy Calculator</h1>
       <p className="text-slate-400 text-sm">Monitor real-time outputs and predict seasonal efficiency.</p>
    </div>
    <UniversalSolarDate className="w-full md:w-auto shadow-indigo-500/10"/>
  </header>
  <main className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
   
   <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 space-y-4">
     <h3 className="text-lg font-semibold text-amber-400 ">Seasonal Forecast</h3>
     <p className="text-sm text-slate-300">Select a date to check historical solar irridiance for that specific week of the year.</p>

     <input type="date"
     onChange={handleDateInput}
     className="w-full p-3 rounded-xl bg-slate-900 border border-slate-700 focus:outline-none focus:border-amber-400 text-white"
     />
   </div>

    <div className="bg-slate-800/40 p-6 rounded-2xl border border-slate-700/60 flex flex-col justify-center space-y-4">
     <p className="text-xs uppercase tracking-wider text-slate-400">Target Timeframe</p>


     {forecastDate ? (
     <UniversalSolarDate
     dateProp={forecastDate}
      className="bg-gradient-to-r from-amber-600 to-orange-600 border-none"/>

     ):(
      <div className="p-6 text-center border-2 border-dashed border-slate-700 rounded-xl text-slate-500 text-sm">Select a date on the left to generate a projected timeframe</div>
     )}
    </div>


  </main>
  </div>
  );


};

export default SolarCalculatorWorkspace;