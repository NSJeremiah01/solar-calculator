import { useState } from "react";
import { IoMdArrowForward } from "react-icons/io";

const TextTruncate = ({text, line=3 }) => {
const [isExpanded, setIsExpanded] = useState(false);

const lineClasses = {
 1: 'line-clamp-1',
 2: 'line-clamp-2',
 3: 'line-clamp-3',
 4: 'line-clamp-4',
};

return(
 <div>
  <div 
  className={`cursor-pointer transition-all duration-300 ${!isExpanded ? lineClasses[line] || 'line-clamp-3' : ''}`}
  onClick={() => setIsExpanded(!isExpanded)}
  >
    {text}
  </div>
   <button
   onClick={() => setIsExpanded (!isExpanded)}
   className="text-blue-500 test-xs text-left mt-1 font-medium hover:text-blue-700"
   >
    {isExpanded ? 'Show Less' : 'View Details'}

   </button>
 </div>

);

};

export default TextTruncate;