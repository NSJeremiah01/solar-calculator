import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import UniversalSolarDate from "./UniversalSolarDate";


const SolarAdvancedWorkspace = () => {
 const [selectedDate, setSelectedDate ] = useState(null);
 const [metrics, setMetrics] = useState({ produced: 0, consumed: 0, solar: 0, grid: 0});
 const [loading, setLoading] = useState(false);

//  Configuration factors for coordinate and mock consumption
 const LATTITUDE = 6.45;
 const LONGITUDE = 3.39;
 const PROOF_KWP_CAPACITY = 5.0;
 const BASE_WEEKLY_CONSUMPTION = 140;
const GRID_RATE_PER_KWH = 0.23

// Extract date segments to pass to backend API route
const targetDate = selectedDate || new Date();
const monthName = targetDate.toLocaleDateString('en-US', { month: 'long'});


const getWeekString = (date) => {
 const day = date.getDate();
  const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  const startDay = startOfMonth.getDay();
  return `Week ${Math.ceil((day + startDay) / 7)}`;

};

const weekName = getWeekString(targetDate);


// API INTEGRAATION ENGINE

useEffect(() => {
 const fetchRealSolarData = async () => {
 setLoading(true);
 
 try {
//  Calculate start and end dates for the target week
const startOfWeek = new Date(targetDate);
startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());

const endOfWeek = new Date(startOfWeek);
endOfWeek.setDate(endOfWeek.getDate() + 6);

// Format dates to YYYY-MM-DD for the Open-Meteo API

const formatDateString = (d) => d.toISOString().split('T')[0];
const startStr = startOfWeek.toISOString().split('T')[0];
const endStr = endOfWeek.toISOString().split('T')[0];

// FIX #2
const todayStr = new Date().toISOString().split('T')[0];

// 2. Query Open-Meteo Archive API for shortwave solar radiation
const baseUrl = endStr > todayStr
const apiUrl = `https://open-meteo.com/v1/archive?latitude=${LATTITUDE}&longitude=${LONGITUDE}&start_date=${startStr}&end_date=${endStr}&hourly=shortwave_radiation`;

const response = await fetch(apiUrl);
if (!response.ok) throw new Error("API network response faild");
const data = await response.json();

// 3. Process the hourly radiation array (measured in W/m)

 const hourlyRadiationArray = data.hourly?.shortwave_radiation || [];

//  Sum all hourly values and convert Watt-hours to kilowatt-hours (KWh)
 const totalRadiationSum = hourlyRadiationArray.reduce((acc, val) => acc + (val || 0), 0);
 const totalKwhPerSqm = totalRadiationSum /1000;

//  4. Mathematical Conversion: scale irridiance to a residential solar array

const generatedSolarKwh = Math.round(totalKwhPerSqm * PROOF_KWP_CAPACITY * 0.75);

// Simulated localized consumption behaviors matching weather shifts

const conditionalConsumption = generatedSolarKwh > 100
? BASE_WEEKLY_CONSUMPTION + 15 
: BASE_WEEKLY_CONSUMPTION - 10;

// Balance sourcing equations
const solarEnergyUsedDirectly = Math.min(generatedSolarKwh, conditionalConsumption);
const gridDrawRequired = Math.max(0, conditionalConsumption - solarEnergyUsedDirectly);

// 5. Update State

setMetrics ({
 produced: generatedSolarKwh,
 consumed: conditionalConsumption,
 solar: solarEnergyUsedDirectly,
 grid: gridDrawRequired

});
 setLoading(false);
} catch (error) {
  console.error("Error communicating with Open-Meteo server:", error);
  setLoading(false);
}


 };
 
 fetchRealSolarData();
}, [selectedDate]);

 return (
  <div>
   <UniversalSolarDate selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
   {loading ? <p>Loading...</p> : <p>Solar metrics loaded.</p>}
  </div>
 );
};

export default SolarAdvancedWorkspace;

