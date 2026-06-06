import react from "react";
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';
// Mock data tracking the dates matching your image

const data = [

{name: 'May 20', produced: 750, consumed: 450, solar: 250, grid: 200},
{name: 'May 21', produced: 1400, consumed: 900, solar: 750, grid: 150},
{name: 'May 22', produced: 1300, consumed: 850, solar: 300, grid: 50},
{name: 'May 23', produced: 1600, consumed: 1100, solar: 500, grid: 100},
{name: 'May 24', produced: 1900, consumed: 1500, solar: 900, grid: 250},
{name: 'May 25', produced: 1300, consumed: 100, solar: 400, grid: 50},
{name: 'May 26', produced: 1600, consumed: 850, solar: 450, grid: 100},
];

export default function SystemOverview() {
return(
 <div className="w-full mt-4  p-6 bg-white rounded-2xl shadow-sm">
   
   {/* Header Section */}

   <div className="flex items-center justify-between mb-6">
     <h2 className="text-xl font-bold text-gray-800">System Overview</h2>
     <select className="px-3 py-1.5 text-sm bg-gray-50 border border-gray-200 rounded-lg text-gray-600 focus:outline-none">
     <option >This Week</option>
     <option >This Month</option>

     </select>
   </div>

   {/* METRICS GRID (4 PASTED COLUMN USING WHITESPACE-NOWRAP) */}
     
     <div className="grid grid-cols-2 gap-6 mb-8 md:grid-cols-4 items-stretch">

      {/* METRIC 1 */}
      <div className="flex flex-col gap-1 ">
       <div className="flex items-center gap-2">
         <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0"></span>
         <p className="text-sm text-gray-500 font-medium whitespace-nowrap">Energy Produced</p>
       </div>
         <p className="pl-4 text-xl font-bold text-gray-900 whitespace-nowrap">4,562 <span className="text-sm font-normal text-gray-500 ">KWh</span></p>
      </div>
       
       {/* METRIC 2 */}

      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span>
          <p className="text-sm text-gray-500 font-medium whitespace-nowrap">Energy Consumed</p>

        </div>
         <p className="pl-4 text-xl font-bold text-gray-900 whitespace-nowrap">3,650 <span className="text-sm font-normal text-gray-500 ">KWh</span></p>
      </div>
     
     

 {/* METRIC 3 */}

      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full  bg-amber-400 shrink-0"></span>
          <p className="text-sm text-gray-500 font-medium whitespace-nowrap">From Solar</p>

        </div>
         <p className="pl-4 text-xl font-bold text-gray-900 whitespace-nowrap">3,245 <span className="text-sm font-normal text-gray-500 ">KWh</span></p>
      </div>

 {/* METRIC 4 */}

      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-500 shrink-0"></span>
          <p className="text-sm text-gray-500 font-medium whitespace-nowrap">From Grid</p>

        </div>
         <p className="pl-4 text-xl font-bold text-gray-900 whitespace-nowrap">405 <span className="text-sm font-normal text-gray-500 ">KWh</span></p>
      </div>

     </div>

{/* 3. CHART CONTAINER */}

  <div className="w-full h-52 relative">

    {/*  Unit label placen on top of Y Axis  */}

    <span className="absolute left-10 -top-5 text-xs text-gray-400">KWh</span>

    <ResponsiveContainer width="100%" height="100%">
     <AreaChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
      <CartesianGrid vertical={false} stroke="#f0f0f0"/>
       <XAxis
       dataKey="name"
       axisLine={false}
       tickLine={false}
       tick={{ fill: '#9ca3af', fontSize: 12}}
       dy={10}
       />
       <YAxis 
        axisLine={false}
        tickLine={false}
        tick={{ fill: '#9ca3af', fontSize: 12}}
        ticks={ [0, 500, 1000, 1500, 2000]}
        tickFormatter={(value) => value === 2000 ? '2k' : value === 1500 ? '1.5k' : value === 1000 ? '1k' : value}
       />

      {/* Smooth Curve Lines Matching colors */}
      <Area type="monotone" dataKey="produced" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.1} strokeWidth={2} dot={false}/>
      <Area type="monotone" dataKey="consumed" stroke="#10b981" fill="#10b981" fillOpacity={0.1} strokeWidth={2} dot={false}/>
      <Area type="monotone" dataKey="solar"    stroke="#fbbf24" fill="#fbbf24" fillOpacity={0.1} strokeWidth={2} dot={false}/>
      <Area type="monotone" dataKey="grid"     stroke="#a855f7" fill="#a855f7" fillOpacity={0.1} strokeWidth={2} dot={false}/>
      <Tooltip />
     </AreaChart>
    </ResponsiveContainer>
  </div>
  {/* 4 BOTTOM LEGEND ROW */}
   <div className="flex flex-wrap justify-center gap-6 mt-4 text-xs font-medium text-gray-500">
     <div className="flex items-center gap-2 "><span className="w-3 h-0.5 bg-blue-500"></span>Energy Produced</div>
     <div className="flex items-center gap-2 "><span className="w-3 h-0.5 bg-green-500"></span>Energy Consumed</div>
     <div className="flex items-center gap-2 "><span className="w-3 h-0.5 bg-amber-400"></span>From Solar</div>
      <div className="flex items-center gap-2 "><span className="w-3 h-0.5 bg-purple-500"></span>From Grid</div>

   </div>

 </div>
);
}