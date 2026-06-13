import { NavLink } from 'react-router-dom';
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

const navItems = [
  { to: "/load-calculator",    icon: <CiCalculator1 />,                  label: "Load Calculator"    },
  { to: "/solar-sizing",       icon: <WiDaySunny className="text-lg" />, label: "Solar Sizing"       },
  { to: "/battery-bank",       icon: <PiBatteryVerticalMediumLight />,   label: "Battery Bank"       },
  { to: "/inverter-sizing",    icon: <LiaInvision />,                    label: "Inverter Sizing"    },
  { to: "/financial-analysis", icon: <LuChartColumnIncreasing />,        label: "Financial Analysis" },
  { to: "/proposals",          icon: <PiSuitcaseSimpleLight />,          label: "Proposals"          },
  { to: "/equipment",          icon: <LiaDatabaseSolid />,               label: "Equipment Database" },
  { to: "/saved-projects",     icon: <VscSave />,                        label: "Saved Projects"     },
  { to: "/clients",            icon: <PiUsersThreeLight />,              label: "Clients"            },
  { to: "/settings",           icon: <IoSettingsOutline />,              label: "Settings"           },
  { to: "/help",               icon: <IoHelpCircleOutline />,            label: "Help & Support"     },
];

function Nav() {
  return (
    <aside className="w-40 sm:w-56 shrink-0 bg-white border-r border-gray-100 flex flex-col min-h-0 overflow-y-auto">
      <div className="flex flex-col flex-1 py-4 px-3 gap-1">

        {/* New Project button */}
        <button className="flex items-center gap-2 py-2 px-3 font-bold rounded-xl bg-amber-500 text-white text-xs cursor-pointer hover:bg-amber-600 transition-colors mb-3 w-full">
          <LuPlus className="shrink-0" />
          <p>New Project</p>
        </button>

        {/* Dashboard */}
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `flex items-center gap-2 py-2 px-3 rounded-xl text-sm font-medium transition-colors ${
              isActive
                ? "bg-amber-50 text-amber-700"
                : "text-gray-600 hover:bg-amber-50 hover:text-amber-600"
            }`
          }
        >
          <GoHome className="shrink-0" />
          <p>Dashboard</p>
        </NavLink>

        {/* Other nav items */}
        <div className="flex flex-col gap-0.5 mt-1">
          {navItems.map(({ to, icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-2 py-2 px-3 rounded-lg text-sm transition-colors ${
                  isActive
                    ? "bg-amber-50 text-amber-700 font-medium"
                    : "text-gray-600 hover:text-amber-600 hover:bg-amber-50"
                }`
              }
            >
              <span className="shrink-0 text-base">{icon}</span>
              <p className="truncate">{label}</p>
            </NavLink>
          ))}
        </div>

        {/* Upgrade card */}
        <div className="mt-auto pt-4">
          <div className="py-4 px-3 font-semibold text-white flex flex-col items-center rounded-xl bg-[#080838] gap-2">
            <div className="flex items-center gap-2">
              <FaCrown className="text-amber-300 shrink-0" />
              <h2 className="text-sm">Upgrade to pro</h2>
            </div>
            <p className="text-[10px] text-center text-white/60">Unlock advanced features, more storage and priority support.</p>
            <button className="text-amber-300 border border-amber-300/50 py-1 px-4 rounded-lg cursor-pointer text-xs hover:bg-amber-300/10 transition-colors w-full">
              Upgrade Now
            </button>
          </div>
        </div>

      </div>
    </aside>
  );
}

export default Nav;