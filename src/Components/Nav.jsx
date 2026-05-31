import { LuPlus } from "react-icons/lu";
import { GoHome } from "react-icons/go";
import { CiCalculator1 } from "react-icons/ci";
import { WiDaySunny } from "react-icons/wi";
import { PiBatteryVerticalMediumLight } from "react-icons/pi";
import { LiaInvision } from "react-icons/lia";
import { LuChartColumnIncreasing } from "react-icons/lu";
import { PiSuitcaseSimpleLight } from "react-icons/pi";
import { LiaDatabaseSolid } from "react-icons/lia";
import { VscSave } from "react-icons/vsc";
import { PiUsersThreeLight } from "react-icons/pi";
import { IoSettingsOutline } from "react-icons/io5";
import { IoHelpCircleOutline } from "react-icons/io5";
import { FaCrown } from "react-icons/fa";


function Nav() {

  return ( 
    <>
      <div className=" w-56 shrink-0 bg-white border-r border-gray-100 flex flex-col overflow-y-auto ">
         <div className="flex items-center py-2 px-3 pr-12 font-bold rounded-xl bg-amber-500 w-fit gap-2 my-6 mx-4 text-xs cursor-pointer">
           <LuPlus />
            <p>New Project</p>
         </div>
            
            <div className="hidden md:flex items-center gap-1 text-xs flex-wrap " >
              <div className="flex items-center gap-2 bg-amber-100 w-fit hover:text-amber-300 cursor-pointer pr-12 py-1 px-3 mx-4 rounded-xl">
                 <GoHome />
                 <p>Dashboard</p>
              </div>

                <div className="px-6 flex flex-col gap-4 ">
                <div className="flex items-center gap-2 hover:text-amber-300 cursor-pointer w-fit">
                  <CiCalculator1 />
                  <p>Load Calculator</p>
                </div>
                  <div className="flex items-center gap-2 hover:text-amber-300 cursor-pointer w-fit">
                    <WiDaySunny />
                   <p>Solar Sizing</p>
                  </div>

                  <div className="flex items-center gap-2 hover:text-amber-300 cursor-pointer w-fit">
                   <PiBatteryVerticalMediumLight />
                 <p>Battery Bank</p>
                  </div>
                   
                   <div className="flex items-center gap-2 hover:text-amber-300 cursor-pointer w-fit">
                    <LiaInvision />
                    <p>Inverter Sizing</p>
                   </div>
                   <div className="flex items-center gap-2 hover:text-amber-300 cursor-pointer w-fit">
                    <LuChartColumnIncreasing />
                    <p>Financial Analysis</p>
                   </div>

                   <div className="flex items-center gap-2 hover:text-amber-300 cursor-pointer w-fit">
                   <PiSuitcaseSimpleLight />
                    <p>Proposals</p>
                   </div>

                   <div className="flex items-center gap-2 hover:text-amber-300 cursor-pointer w-fit">
                    <LiaDatabaseSolid />
                    <p>Equipment Database</p>
                   </div>
                   
                   <div className="flex items-center gap-2 hover:text-amber-300 cursor-pointer w-fit">
                     <VscSave />
                     <p>Saved Projects</p>
                   </div>

                    <div className="flex items-center gap-2 hover:text-amber-300 cursor-pointer w-fit">
                      <PiUsersThreeLight />
                      <p>Clients</p>
                    </div>

                    <div className="flex items-center gap-2 hover:text-amber-300 cursor-pointer w-fit">
                      <IoSettingsOutline />
                      <p>Settings</p>
                    </div>
                   
                    <div className="flex items-center gap-2 hover:text-amber-300 cursor-pointer w-fit">
                     <IoHelpCircleOutline />
                      <p>Help & Support</p>
                    </div>
                    </div>
            </div>
          
          <div className="py-6 px-3 relative font-semibold text-white flex flex-col items-center rounded-xl bg-[#080838] w-fit gap-2 my-6 mx-4">
            <div className="flex items-center gap-2">
              <FaCrown className="text-amber-300" />
              <h2>Upgrade to pro</h2>
            </div>
              
              <div>
                <p className="text-[10px]">Unlock advanced features, more <br /> storage and priority support.</p>
              </div>

              <div>
                <button className="text-amber-300 border py-1 px-4 rounded-sm cursor-pointer">Upgrade Now</button>
              </div>

          </div>




      </div>
    
    
    
    
    
    
    </>
   );
}

export default Nav;