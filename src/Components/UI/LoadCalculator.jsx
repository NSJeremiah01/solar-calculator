import { useState } from "react";

// Default appliances list - common Nigerian household/office items
const defaultAppliances = [
  { id: 1, name: "LED Bulb",        watts: 10,   qty: 6,  hours: 6  },
  { id: 2, name: "Ceiling Fan",     watts: 75,   qty: 2,  hours: 8  },
  { id: 3, name: "Refrigerator",    watts: 150,  qty: 1,  hours: 24 },
  { id: 4, name: "TV (32 inch)",    watts: 60,   qty: 1,  hours: 6  },
  { id: 5, name: "Phone Charger",   watts: 10,   qty: 4,  hours: 3  },
];

export default function LoadCalculator() {
  const [appliances, setAppliances] = useState(defaultAppliances);

  // Add a new empty appliance row
  const addAppliance = () => {
    const newId = appliances.length + 1;
    setAppliances([...appliances, { id: newId, name: "", watts: 0, qty: 1, hours: 1 }]);
  };

  // Peak sun hours map per location
  const sunHoursMap = {
    lagos: 5.8, abuja: 6.0, kano: 6.5,
    ph: 5.5, ibadan: 5.7, enugu: 5.6, custom: 0
  };

  const [config, setConfig] = useState({
    location: "lagos",
    peakSunHours: 5.8,
    systemVoltage: 24,
    panelWatts: 400,
    autonomyDays: 2,
    batteryType: "lithium",
    efficiency: 85,
    safetyMargin: 20,
  });

  const updateConfig = (field, value) => {
    setConfig((prev) => {
      const updated = { ...prev, [field]: value };
      // Auto update peak sun hours when location changes
      if (field === "location" && value !== "custom") {
        updated.peakSunHours = sunHoursMap[value];
      }
      return updated;
    });
  };

  // Remove an appliance row by id
  const removeAppliance = (id) => {
    setAppliances(appliances.filter((a) => a.id !== id));
  };

  // Update a specific field on a specific appliance
  const updateAppliance = (id, field, value) => {
    setAppliances(appliances.map((a) =>
      a.id === id ? { ...a, [field]: field === "name" ? value : Number(value) } : a
    ));
  };

  // Calculate daily Wh for each appliance
  const getDailyWh = (a) => a.watts * a.qty * a.hours;

  // Total daily load
  const totalDailyWh = appliances.reduce((sum, a) => sum + getDailyWh(a), 0);

  return (
    <div className="w-full px-4 pb-8">

      {/* Page Header */}
      <div className="py-4">
        <h2 className="font-bold text-xl text-gray-900">Load Calculator</h2>
        <p className="text-sm text-gray-500">Enter your appliances to calculate your solar system size.</p>
      </div>

      {/* Appliance Input Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-gray-800">Appliances</h3>
          <button
            onClick={addAppliance}
            className="text-xs bg-amber-500 hover:bg-amber-600 text-white px-3 py-1.5 rounded-lg font-medium transition-colors"
          >
            + Add Appliance
          </button>
        </div>

        {/* Table Header */}
        <div className="grid grid-cols-6 gap-2 text-xs font-medium text-gray-400 mb-2 px-2">
          <span className="col-span-2">Appliance Name</span>
          <span>Watts (W)</span>
          <span>Quantity</span>
          <span>Hours/Day</span>
          <span>Daily (Wh)</span>
        </div>

        {/* Appliance Rows */}
        <div className="flex flex-col gap-2">
          {appliances.map((a) => (
            <div key={a.id} className="grid grid-cols-6 gap-2 items-center bg-gray-50 rounded-lg px-2 py-1.5">
              
              {/* Name */}
              <input
                className="col-span-2 text-sm bg-white border border-gray-200 rounded-lg px-2 py-1 focus:outline-none focus:border-amber-400"
                value={a.name}
                onChange={(e) => updateAppliance(a.id, "name", e.target.value)}
                placeholder="e.g. LED Bulb"
              />

              {/* Watts */}
              <input
                type="number"
                className="text-sm bg-white border border-gray-200 rounded-lg px-2 py-1 focus:outline-none focus:border-amber-400 w-full"
                value={a.watts}
                onChange={(e) => updateAppliance(a.id, "watts", e.target.value)}
              />

              {/* Quantity */}
              <input
                type="number"
                className="text-sm bg-white border border-gray-200 rounded-lg px-2 py-1 focus:outline-none focus:border-amber-400 w-full"
                value={a.qty}
                onChange={(e) => updateAppliance(a.id, "qty", e.target.value)}
              />

              {/* Hours */}
              <input
                type="number"
                className="text-sm bg-white border border-gray-200 rounded-lg px-2 py-1 focus:outline-none focus:border-amber-400 w-full"
                value={a.hours}
                onChange={(e) => updateAppliance(a.id, "hours", e.target.value)}
              />

              {/* Daily Wh + Delete */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-700">
                  {getDailyWh(a).toLocaleString()} Wh
                </span>
                <button
                  onClick={() => removeAppliance(a.id)}
                  className="text-red-400 hover:text-red-600 text-xs ml-1 transition-colors"
                >
                  ✕
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Total Row */}
        <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-100 px-2">
          <span className="text-sm font-bold text-gray-700">Total Daily Load</span>
          <span className="text-lg font-bold text-amber-600">
            {totalDailyWh.toLocaleString()} Wh/day
            <span className="text-sm text-gray-400 font-normal ml-2">
              ({(totalDailyWh / 1000).toFixed(2)} kWh/day)
            </span>
          </span>
        </div>

      </div>

      {/* System Configuration */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-4">
        <h3 className="font-bold text-gray-800 mb-4">System Configuration</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

          {/* Location / Peak Sun Hours */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-500">Location</label>
            <select
              className="text-sm bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-amber-400"
              value={config.location}
              onChange={(e) => updateConfig("location", e.target.value)}
            >
              <option value="lagos">Lagos (5.8h)</option>
              <option value="abuja">Abuja (6.0h)</option>
              <option value="kano">Kano (6.5h)</option>
              <option value="ph">Port Harcourt (5.5h)</option>
              <option value="ibadan">Ibadan (5.7h)</option>
              <option value="enugu">Enugu (5.6h)</option>
              <option value="custom">Custom</option>
            </select>
          </div>

          {/* Custom Peak Sun Hours - only shows if custom selected */}
          {config.location === "custom" && (
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-gray-500">Peak Sun Hours</label>
              <input
                type="number"
                step="0.1"
                className="text-sm bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-amber-400"
                value={config.peakSunHours}
                onChange={(e) => updateConfig("peakSunHours", Number(e.target.value))}
                placeholder="e.g. 5.8"
              />
            </div>
          )}

          {/* Battery Voltage */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-500">System Voltage</label>
            <select
              className="text-sm bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-amber-400"
              value={config.systemVoltage}
              onChange={(e) => updateConfig("systemVoltage", Number(e.target.value))}
            >
              <option value={12}>12V</option>
              <option value={24}>24V</option>
              <option value={48}>48V</option>
            </select>
          </div>

          {/* Panel Wattage */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-500">Panel Wattage (W)</label>
            <select
              className="text-sm bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-amber-400"
              value={config.panelWatts}
              onChange={(e) => updateConfig("panelWatts", Number(e.target.value))}
            >
              <option value={200}>200W</option>
              <option value={250}>250W</option>
              <option value={300}>300W</option>
              <option value={400}>400W</option>
              <option value={550}>550W</option>
              <option value={600}>600W</option>
            </select>
          </div>

          {/* Days of Autonomy */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-500">Days of Autonomy</label>
            <select
              className="text-sm bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-amber-400"
              value={config.autonomyDays}
              onChange={(e) => updateConfig("autonomyDays", Number(e.target.value))}
            >
              <option value={1}>1 day</option>
              <option value={2}>2 days</option>
              <option value={3}>3 days</option>
              <option value={5}>5 days</option>
            </select>
          </div>

          {/* Depth of Discharge */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-500">Battery Type</label>
            <select
              className="text-sm bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-amber-400"
              value={config.batteryType}
              onChange={(e) => updateConfig("batteryType", e.target.value)}
            >
              <option value="leadacid">Lead Acid (50% DoD)</option>
              <option value="agm">AGM (60% DoD)</option>
              <option value="gel">Gel (70% DoD)</option>
              <option value="lithium">Lithium LiFePO4 (80% DoD)</option>
            </select>
          </div>

          {/* System Efficiency */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-500">System Efficiency (%)</label>
            <input
              type="number"
              min={70}
              max={95}
              className="text-sm bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-amber-400"
              value={config.efficiency}
              onChange={(e) => updateConfig("efficiency", Number(e.target.value))}
            />
            <p className="text-xs text-gray-400">Typical: 80-85%</p>
          </div>

          {/* Safety Margin */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-500">Safety Margin (%)</label>
            <input
              type="number"
              min={10}
              max={30}
              className="text-sm bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-amber-400"
              value={config.safetyMargin}
              onChange={(e) => updateConfig("safetyMargin", Number(e.target.value))}
            />
            <p className="text-xs text-gray-400">Typical: 20-25%</p>
          </div>

        </div>
      </div>

    </div>
  );
}