import { useState, useEffect } from "react";  

const UniversalSolarDate = ({ dateProp = null, className = ""}) => {
 const [date, setDate] = useState(dateProp || new Date());

 useEffect(() => {
 if (dateProp) {
  setDate(dateProp);
 }

 }, [dateProp]);

useEffect(() => {
 if (dateProp) return; 

 const timer = setInterval(() => {
 setDate(new Date());
 }, 1000);

 return () => clearInterval(timer);

}, [dateProp]);

 const dayName = date.toLocaleDateString('en-US', { weekday: 'long'});
 const monthName = date.toLocaleDateString('en-US', { month: 'long'});


 const getWeekOfMonth = (targetDate) => {
  const day = targetDate.getDate();
  const startOfMonth = new Date(targetDate.getFullYear(), targetDate.getMonth(), 1);
  const startDay = startOfMonth.getDay();
  return Math.ceil((day + startDay) / 7)

 };

 const weekNumber = getWeekOfMonth(date);

 return(
 <div className={`p-4 bg-slate-800 text-white rounded-xl shadow-md border border-slate-700 flex flex-wrap items-center justify-between gap-4 ${className}`}>
  <div>
     <div className="flex items-center gap-2">
      <p className="text-xs font-semibold uppercase tracking-wider text-amber-400">
        {dateProp ? 'Projected Period' : 'Live Tracker'}</p>
       {!dateProp && <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"/>}
     </div>
      <h3 className="text-1 font-bold ">{dayName}</h3>

  </div>
 <div className="flex gap-2">
 <span>
  Month: <span className="font-semibold text-amber-300">{monthName}</span>
 </span>

  <span className="px-3 py-1 bg-slate-700/60 rounded-lg text-sm border border-slate-600">
    Timeline: <span className="font-semibold text-amber-300">Week {weekNumber}</span>
  </span>

 </div>


 </div>
 );

};

export default  UniversalSolarDate;