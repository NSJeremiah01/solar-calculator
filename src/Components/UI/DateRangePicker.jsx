import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


function DateRangePicker({ startDate, endDate, onRangeChange, label = "Select Date Range:" }) {
  const handleDateChange = (dates) => {
  const [start, end] = dates;
  onRangeChange(start, end);

  };




  return ( 
       <div className="">
       {label && <label className="block mb-1.25 text-sm font-medium">{label}</label>}

        <div className="relative w-64">
       <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none z-10 text-gray-500">
          <svg 
            className="w-4 h-4" 
            aria-hidden="true" 
            xmlns="http://w3.org" 
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
          </svg>
        </div>

       <DatePicker
       selected={startDate}
       onChange={handleDateChange}
       startDate={startDate}
       endDate={endDate}
       selectsRange
       isClearable
       placeholderText="Choose dates"
       dateForma="MMM d, yyyy"
       className="w-full pl-10 pr-6 py-2 text-sm outline-none bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      
       />
     <div/>

       </div>
</div>

   );
}

export default DateRangePicker;