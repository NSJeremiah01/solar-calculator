import { useState, useEffect } from "react";
import SolarDateDisplay from "./UI/SolarDateDisplay";
import UniversalSolarDate from "./UI/UniversalSolarDate";
import SolarCalculatorWorkspace from "./UI/DemoCalculator";
import SolarAdvancedWorkspace from "./UI/SolarAdvancedWorkspace";
import react from "react";
import { BsDot } from "react-icons/bs";
import SystemOverview from "./UI/SystemOverview";
import RecentProjectsTable from "./UI/RecentProjectsTable";
import PieChartInGrid from "./UI/PieChartInGrid";
import Recommendations from "./Recommendations";
import Weather from "./Weather";


function BodyPart1() {

 const [selectedDate, setSelectedDate] = useState(new Date());
 
 const handleDateChange = (e) => {
  setSelectedDate(new Date(e.target.value));
 };




  return ( 

    <div className=" flex  ">
       
       <div>
        <SystemOverview/>
        <RecentProjectsTable/>
        <Weather/>
      </div>

        <div>
        <PieChartInGrid/>
        <Recommendations/>
        </div>
    </div>

   );
}

export default BodyPart1;