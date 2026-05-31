
import { PiSolarPanelFill,} from "react-icons/pi";
import { GrHomeRounded } from "react-icons/gr";
import { GoProjectRoadmap } from "react-icons/go";
import { PiCalculatorThin } from "react-icons/pi";
import { RiFundsBoxLine} from "react-icons/ri";
import { PiBriefcaseThin } from "react-icons/pi";
import { PiUsersThreeLight } from "react-icons/pi";
import { CiSearch } from "react-icons/ci";
import { LiaToolsSolid } from "react-icons/lia";
import { MdOnlinePrediction } from "react-icons/md";
import { IoMdNotificationsOutline, IoIosArrowDown } from "react-icons/io";
import ElecNova from '../assets/ElecNova.jpeg'

function Header() {
  return (  
   <div className='px-4 lg:px-6 bg-black text-white '>
    <div className='w-full flex  py-3  items-center justify-between'>
      
     <div>
        <PiSolarPanelFill /> <h1 className='relative inline-block  font-bold pr-10'>SolarCalc <span className='absolute bottom-0 left-12 top-5 text-sm font-semibold text-amber-300'>Pro</span></h1>
     </div>

      <div className='hidden md:flex gap-6'>
        <span className='flex flex-col items-center text-xs cursor-pointer hover:text-amber-300'>
          <GrHomeRounded className=' '/>
          <p>Dashboard</p>
        </span>
        
        <span className='flex flex-col items-center text-xs cursor-pointer hover:text-amber-300'>
          <GoProjectRoadmap className='' />
          <p>Projects</p>
        </span>
        
        <span className='flex flex-col items-center text-xs cursor-pointer hover:text-amber-300'>
          <PiCalculatorThin className='' />
          <p>Calculator</p>
        </span>
        
        <span className='flex flex-col items-center text-xs cursor-pointer hover:text-amber-300'>
          <RiFundsBoxLine className='' />
          <p>Financials</p>
        </span>
      
        <span className='flex flex-col items-center text-xs cursor-pointer hover:text-amber-300'>
        <LiaToolsSolid className='' />
        <p>Equipment</p>
        </span>
        
        <span className='flex flex-col items-center text-xs cursor-pointer hover:text-amber-300'>
         <PiBriefcaseThin className='' />
         <p>Proposals</p>
        </span>
        
        <span className='flex flex-col items-center text-xs cursor-pointer hover:text-amber-300'>
          <PiUsersThreeLight className='' />
          <p>Clients</p>
        </span>

      </div>

      <div className='flex gap-6 '>
     <span className='relative hidden sm:block'>
      <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
      <CiSearch  className='text-gray-400 text-xl'/>
      </div>
      <input type="text" placeholder='Serarch anything...' className='w-full pl-10 pr-4 py-1 mt-1.5 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500' />
     </span>
     
     <span className='flex items-center'>
      <IoMdNotificationsOutline className='text-xl cursor-pointer hover:text-amber-300'/>
     </span>

       <span className='flex gap-2'>
        <div className='relative'>
        <MdOnlinePrediction className='absolute bottom-0 right-0 text-xs bg-green-500 border border-white rounded-full z-10 animate-pulse text-yellow-600' />
       <img src={ElecNova} alt="" className='w-10 h-10 object-cover mt-2 rounded-full bottom-2'  />
       </div>
       
       <p className='text-[10px] relative top-3 font-bold'>Ndubuisi S.J. <br /><span className='text-white/40'>Solar Engineer</span></p>
       
       <IoIosArrowDown className='relative top-5'/>
       </span>
      </div>





    </div>
   
   
   
   
   </div>



  );
}

export default Header;