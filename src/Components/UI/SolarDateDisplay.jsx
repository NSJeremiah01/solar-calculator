import React from "react";

const SolarDateDisplay = ({ date = new Date(), className = ""}) => {

  const dayName = date.toLocaleDateString('en-US', { weekday: 'long'});
  
  const monthName = date.toLocaleDateString('en-US', { month: 'long'});

  const getWeekOfMonth = (targetDate) => {
  const day = targetDate.getDate();
  const startofMonth = new Date(targetDate.getFullYear(), targetDate.getMonth(), 1);
   const startDay = startofMonth.getDate();
  return Math.ceil((day + startDay) / 7)

  };

  const weekNumber = getWeekOfMonth(date);

  return (
<div className={`p-4 bg-slate-800 text-white rounded-xl shadow-md border border-slate-700 flex flex-wrap items-center justify-between gap-4 ${className}`}>
<div>
  <p className="text-xs font-semibold uppercase tracking-wider text-amber-400">Solar Period</p>
  <h3 className="text-xl font-bold">{dayName}</h3>
</div>

<div className="flex gap-2">
<span className="px-3 py-1 bg-slate-700/60 rounded-lg text-sm border border-slate-600">
 Month: <span className="font-semibold text-amber-300">{monthName}</span>
</span>

 <span className="px-3 py-1 bg-slate-600/60 rounded-lg text-sm border border-slate-600">
 Timeline: <span className="font-semibold text-amber-300">Week {weekNumber}</span>
 </span>


</div>


</div>

  );
};

export default SolarDateDisplay;