import { useState, useEffect } from "react";
import BOMPanel from "./BOM/BOMPanel";  
import BOMBattery from "./BOM/BOMBattery";  
import BOMInverter from "./BOM/BOMInverter"; 
import BOMChargeController from "./BOM/BOMChargeController";
import BOMInverterController from "./BOM/BOMInverterController";  
// Default appliances list - common Nigerian household/office items
const defaultAppliances = [
  { id: 1, name: "LED Bulb",        watts: 10,   qty: 6,  hours: 6  },
  { id: 2, name: "Ceiling Fan",     watts: 75,   qty: 2,  hours: 8  },
  { id: 3, name: "Refrigerator",    watts: 150,  qty: 1,  hours: 8 },
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
    dod: 80,
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
      
        // Sync bom panel watts when config panelWatts changes
      useEffect(() => {
        setBom((prev) => ({
          ...prev,
          panel: {
            ...prev.panel,
            watts: config.panelWatts,
          }
        }));
      }, [config.panelWatts]);


       
          const [bom, setBom] = useState({
      // Panels
      panel: {
        search: "",
        brand: "",
        model: "",
        watts: config.panelWatts,
        qty: 0,          // will be set from panelCount
        unitPrice: 0,
        isCustom: false,
      },

       battery: {
      search: "", brand: "", model: "",
      voltage: config.systemVoltage,
      ah: 200, type: config.batteryType,
      qty: 0, unitPrice: 0, isCustom: false,
               },

               inverter: {
        search: "", brand: "", model: "",
        kw: 0, type: "hybrid",
        voltage: config.systemVoltage,
        unitPrice: 0, isCustom: false,
               },

               chargeController: {
          search: "", brand: "", model: "",
          amps: 0, type: "mppt",
          voltage: config.systemVoltage,
          qty: 1, unitPrice: 0, isCustom: false,
         },
      // we'll add batteries, inverter etc. next
    });

    const updateBom = (field, value) => {
      setBom((prev) => ({ ...prev, [field]: Number(value) }));
    };

       // Panel search
const [panelResults, setPanelResults] = useState([]);
const [showPanelResults, setShowPanelResults] = useState(false);

const searchPanels = (query) => {
  setBom((prev) => ({
    ...prev,
    panel: { ...prev.panel, search: query, isCustom: true }
  }));
  if (query.length < 2) {
    setPanelResults([]);
    setShowPanelResults(false);
    return;
  }
  const results = panelDatabase.filter(
    (p) =>
      p.brand.toLowerCase().includes(query.toLowerCase()) ||
      p.model.toLowerCase().includes(query.toLowerCase()) ||
      p.watts.toString().includes(query)
  );
  setPanelResults(results);
  setShowPanelResults(true);
};

const selectPanel = (panel) => {
  setBom((prev) => ({
    ...prev,
    panel: {
      ...prev.panel,
      search:    `${panel.brand} ${panel.model}`,
      brand:     panel.brand,
      model:     panel.model,
      watts:     panel.watts,
      unitPrice: panel.price,
      isCustom:  false,
    },
  }));
  setPanelResults([]);
  setShowPanelResults(false);
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
       
      // ── SIZING CALCULATIONS ──────────────────────────────────

    // Adjusted daily load accounting for system efficiency and safety margin
    const adjustedLoad = totalDailyWh / (config.efficiency / 100) * (1 + config.safetyMargin / 100);

    // Peak load (watts) - max simultaneous load
    const peakLoad = appliances.reduce((sum, a) => sum + a.watts * a.qty, 0);

      // ── SOLAR PANELS ─────────────────────────────────────────
  const panelLoad = totalDailyWh * (1 + config.safetyMargin / 100);
  const rawPanelCount = panelLoad / (config.peakSunHours * config.panelWatts);
  const panelCount = Math.ceil(rawPanelCount);
  const totalArrayWatts = panelCount * config.panelWatts;
  const dailyGeneration = Math.round(totalArrayWatts * config.peakSunHours);

  // ── PANEL COMBINATIONS ───────────────────────────────────
  // Find all combinations that produce the same or slightly more total wattage
  const getPanelCombinations = (targetWatts) => {
    const standardSizes = [100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700];
    const combos = [];

    standardSizes.forEach((panelW) => {
      const count = Math.ceil(targetWatts / panelW);
      const totalW = count * panelW;
      // only include if within 20% above target
      if (totalW >= targetWatts && totalW <= targetWatts * 1.2) {
        combos.push({ count, panelW, totalW });
      }
    });

    // sort by fewest panels first
    return combos.sort((a, b) => a.count - b.count).slice(0, 5);
  };

  const panelCombinations = getPanelCombinations(totalArrayWatts);

    // ── BATTERY BANK ─────────────────────────────────────────
    const batteryAh = Math.ceil(
      (totalDailyWh * config.autonomyDays) / (config.systemVoltage * (config.dod / 100))
    );
    const batteryKwh = ((batteryAh * config.systemVoltage) / 1000).toFixed(2);

    // ── CHARGE CONTROLLER ────────────────────────────────────
    const chargeControllerAmps = Math.ceil((totalArrayWatts / config.systemVoltage) * 1.25);

    // ── INVERTER ─────────────────────────────────────────────
    const inverterKw = ((peakLoad * 1.25) / 1000).toFixed(2);
    const inverterSize = Math.ceil(peakLoad * 1.25 / 500) * 500; // rounds to nearest 500W

    // ── LOAD FACTOR ──────────────────────────────────────────
    const loadFactor = peakLoad > 0 ? ((totalDailyWh / 24) / peakLoad * 100).toFixed(1) : 0;

    // ── RUNTIME ON BATTERY ───────────────────────────────────
    const runtimeHours = peakLoad > 0
      ? ((batteryAh * config.systemVoltage * (config.dod / 100)) / peakLoad).toFixed(1)
      : 0;

    // ── CABLE SIZING (mm²) ───────────────────────────────────
    // Based on current in each section
    const pvCurrent = totalArrayWatts / config.systemVoltage;
    const pvCableSize = pvCurrent <= 10 ? 4 : pvCurrent <= 20 ? 6 : pvCurrent <= 30 ? 10 : 16;

    const batteryCurrent = (inverterSize / config.systemVoltage);
    const batteryCableSize = batteryCurrent <= 50 ? 16 : batteryCurrent <= 100 ? 25 : batteryCurrent <= 150 ? 35 : 50;

    // ── BREAKER SIZING (A) ───────────────────────────────────
    const pvBreaker = Math.ceil(pvCurrent * 1.25 / 5) * 5;        // DC breaker panels→controller
    const batteryBreaker = Math.ceil(batteryCurrent * 1.25 / 10) * 10; // DC breaker battery→inverter
    const acBreaker = Math.ceil((inverterSize / 230) * 1.25 / 5) * 5;  // AC breaker output

    // ── WARNINGS & CHECKS ────────────────────────────────────
    const warnings = [];

    // ERROR: inverter overload
    if (peakLoad > inverterSize) {
      warnings.push({ type: "error", msg: `Peak load (${peakLoad}W) exceeds inverter size (${inverterSize}W). Increase inverter capacity.` });
    }
    // WARNING: inverter near capacity
    else if (peakLoad > inverterSize * 0.8) {
      warnings.push({ type: "warning", msg: `Peak load is above 80% of inverter capacity. Consider a larger inverter.` });
    }
    // WARNING: low load factor
    if (loadFactor < 20) {
      warnings.push({ type: "warning", msg: `Low load factor (${loadFactor}%). System may be oversized for actual usage.` });
    }
    // WARNING: very short runtime
    if (runtimeHours < 3) {
      warnings.push({ type: "warning", msg: `Battery runtime is only ${runtimeHours}h at peak load. Consider increasing battery bank.` });
    }
    // INFO: earthing reminder
    if (totalArrayWatts > 3000) {
      warnings.push({ type: "info", msg: `System exceeds 3kW. Proper earthing/grounding is required per electrical standards.` });
    }
    // INFO: SPD recommendation
    if (totalArrayWatts > 1000) {
      warnings.push({ type: "info", msg: `Surge Protection Device (SPD) is recommended for this system size.` });
    }
    // INFO: high autonomy cost note
    if (config.autonomyDays >= 3) {
      warnings.push({ type: "info", msg: `${config.autonomyDays} days autonomy requires a large battery bank. Verify budget vs. benefit.` });
    }



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
          <label className="text-xs font-medium text-gray-500">System Voltage (V)</label>
        <div className="flex gap-2">
          <select
            className="text-sm bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-amber-400 flex-1"
            value={[12, 24, 48].includes(config.systemVoltage) ? config.systemVoltage : "custom"}
            onChange={(e) => {
              if (e.target.value !== "custom") {
                updateConfig("systemVoltage", Number(e.target.value));
              }
            }}
              >
            <option value={12}>12V</option>
            <option value={24}>24V</option>
            <option value={48}>48V</option>
            <option value="custom">Custom</option>
          </select>
          <input
            type="number"
            className="text-sm bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-amber-400 w-20"
            value={config.systemVoltage}
            onChange={(e) => updateConfig("systemVoltage", Number(e.target.value))}
            placeholder="V"
          />
        </div>
      </div>

          {/* Panel Wattage */}
      <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-gray-500">Panel Wattage (W)</label>
        <div className="flex gap-2">
          <select
            className="text-sm bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-amber-400 flex-1"
            value={[200, 250, 300, 400, 550, 600].includes(config.panelWatts) ? config.panelWatts : "custom"}
            onChange={(e) => {
              if (e.target.value !== "custom") {
                updateConfig("panelWatts", Number(e.target.value));
              }
            }}
          >
            <option value={200}>200W</option>
            <option value={250}>250W</option>
            <option value={300}>300W</option>
            <option value={400}>400W</option>
            <option value={550}>550W</option>
            <option value={600}>600W</option>
            <option value="custom">Custom</option>
          </select>
          <input
            type="number"
            className="text-sm bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-amber-400 w-20"
            value={config.panelWatts}
            onChange={(e) => updateConfig("panelWatts", Number(e.target.value))}
            placeholder="W"
          />
        </div>
      </div>

          {/* Days of Autonomy */}
    <div className="flex flex-col gap-1">
      <label className="text-xs font-medium text-gray-500">
        Days of Autonomy 
       <span className="text-gray-400 font-normal ml-1">(cloudy day backup)</span>
      </label>
      <div className="flex gap-2">
        <select
          className="text-sm bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-amber-400 flex-1"
          value={[1, 2, 3, 5].includes(config.autonomyDays) ? config.autonomyDays : "custom"}
          onChange={(e) => {
            if (e.target.value !== "custom") {
              updateConfig("autonomyDays", Number(e.target.value));
            }
          }}
        >
          <option value={1}>1 day</option>
          <option value={2}>2 days</option>
          <option value={3}>3 days</option>
          <option value={5}>5 days</option>
          <option value="custom">Custom</option>
        </select>
        <input
          type="number"
          min={1}
          max={30}
          className="text-sm bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-amber-400 w-20"
          value={config.autonomyDays}
          onChange={(e) => updateConfig("autonomyDays", Number(e.target.value))}
          placeholder="days"
        />
      </div>
    </div>

          {/* Depth of Discharge */}
    <div className="flex flex-col gap-1">
         <label className="text-xs font-medium text-gray-500">Battery Type</label>
      <select
        className="text-sm bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-amber-400"
        value={config.batteryType}
        onChange={(e) => {
          updateConfig("batteryType", e.target.value);
          const dodMap = {
            leadacid: 50, agm: 60, gel: 70, lithium: 80
          };
          if (e.target.value !== "custom") {
            updateConfig("dod", dodMap[e.target.value]);
          }
        }}
      >
        <option value="leadacid">Lead Acid</option>
        <option value="agm">AGM</option>
        <option value="gel">Gel</option>
        <option value="lithium">Lithium LiFePO4</option>
        <option value="custom">Custom</option>
      </select>
      <div className="flex items-center gap-2 mt-1">
        <label className="text-xs text-gray-400">Depth of Discharge (%):</label>
        <input
          type="number"
          min={10}
          max={100}
          className="text-sm bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 focus:outline-none focus:border-amber-400 w-16"
          value={config.dod}
          onChange={(e) => updateConfig("dod", Number(e.target.value))}
        />
      </div>
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
       {/* Results Section */}
      {totalDailyWh > 0 && (
        <div className="flex flex-col gap-4">

          {/* Warnings */}
          {warnings.length > 0 && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <h3 className="font-bold text-gray-800 mb-3">⚡ System Checks</h3>
              <div className="flex flex-col gap-2">
                {warnings.map((w, i) => (
                  <div key={i} className={`flex items-start gap-2 px-3 py-2 rounded-lg text-sm ${
                    w.type === "error"   ? "bg-red-50 text-red-700" :
                    w.type === "warning" ? "bg-amber-50 text-amber-700" :
                                          "bg-blue-50 text-blue-700"
                  }`}>
                    <span className="shrink-0 mt-0.5">
                      {w.type === "error" ? "🔴" : w.type === "warning" ? "🟡" : "🟢"}
                    </span>
                    <p>{w.msg}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Sizing Results */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <h3 className="font-bold text-gray-800 mb-4">System Sizing Results</h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">

              {[
                { label: "Daily Load",         value: `${totalDailyWh.toLocaleString()} Wh`,    sub: `${(totalDailyWh/1000).toFixed(2)} kWh/day`,  color: "bg-blue-50 text-blue-700"   },
                { label: "Adjusted Load",       value: `${Math.round(adjustedLoad).toLocaleString()} Wh`, sub: "with efficiency + margin",           color: "bg-purple-50 text-purple-700"},
                { label: "Peak Load",           value: `${peakLoad.toLocaleString()} W`,         sub: "max simultaneous",                            color: "bg-amber-50 text-amber-700" },
                { label: "Solar Panels", value: `${panelCount} × ${config.panelWatts}W`, sub: `${totalArrayWatts}W array → ~${dailyGeneration}Wh/day`, color: "bg-green-50 text-green-700"},
                { label: "Battery Bank", value: `${batteryAh} Ah`, sub: `${batteryKwh} kWh @ ${config.systemVoltage}V | ${config.autonomyDays}d autonomy, ${config.dod}% DoD`, color: "bg-amber-50 text-amber-700"},
                { label: "Charge Controller",   value: `${chargeControllerAmps} A`,              sub: "MPPT recommended",                            color: "bg-blue-50 text-blue-700"   },
                { label: "Inverter Size",       value: `${inverterKw} kW`,                       sub: `${inverterSize}W minimum`,                    color: "bg-green-50 text-green-700" },
                { label: "Load Factor",         value: `${loadFactor}%`,                         sub: "avg ÷ peak load",                             color: "bg-purple-50 text-purple-700"},
                { label: "Battery Runtime",     value: `${runtimeHours} hrs`,                    sub: "at peak load",                                color: "bg-blue-50 text-blue-700"   },
              ].map(({ label, value, sub, color }) => (
                <div key={label} className={`${color} rounded-xl p-3`}>
                  <p className="text-xs font-medium opacity-70 mb-1">{label}</p>
                  <p className="text-lg font-bold leading-tight">{value}</p>
                  <p className="text-xs opacity-60 mt-0.5">{sub}</p>
                </div>
              ))}

            </div>
          </div>

              {/* Panel Combinations */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <div className="flex items-start justify-between mb-1">
              <h3 className="font-bold text-gray-800">Recommended Panel Configurations</h3>
            </div>
            <p className="text-xs text-gray-400 mb-4">
              All combinations below meet your {totalArrayWatts}W array requirement. 
              Choose based on available panel sizes in your market.
            </p>

            <div className="flex flex-col gap-2">
              {panelCombinations.map(({ count, panelW, totalW }, i) => (
                <div
                  key={i}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl border transition-colors ${
                    panelW === config.panelWatts
                      ? "border-amber-400 bg-amber-50"
                      : "border-gray-100 bg-gray-50 hover:border-amber-200"
                  }`}
                >
                  {/* Left - combination */}
                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-md ${
                      i === 0 ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-600"
                    }`}>
                      {i === 0 ? "Fewest Panels" : `Option ${i + 1}`}
                    </span>
                    <p className="text-sm font-bold text-gray-800">
                      {count} × {panelW}W
                    </p>
                  </div>

                  {/* Middle - total watts */}
                  <p className="text-sm font-semibold text-gray-600">
                    = {totalW.toLocaleString()}W array
                  </p>

                  {/* Right - daily generation */}
                  <div className="text-right">
                    <p className="text-xs text-gray-500">~{Math.round(totalW * config.peakSunHours).toLocaleString()} Wh/day</p>
                    <p className="text-xs text-gray-400">{config.peakSunHours}h sun</p>
                  </div>

                  {/* Selected indicator */}
                  {panelW === config.panelWatts && (
                    <span className="text-xs text-amber-600 font-semibold ml-2">← Your selection</span>
                  )}
                </div>
              ))}
            </div>

            {/* Cloudy day note */}
            <div className="mt-4 px-4 py-3 bg-blue-50 rounded-xl">
              <p className="text-xs text-blue-700 font-medium">☁️ Cloudy Day Coverage</p>
              <p className="text-xs text-blue-600 mt-1">
                Your battery bank of <strong>{batteryAh}Ah ({batteryKwh}kWh)</strong> provides 
                <strong> {config.autonomyDays} day{config.autonomyDays > 1 ? "s" : ""}</strong> of backup 
                without any solar generation. Increase <em>Days of Autonomy</em> in configuration for longer cloudy periods.
              </p>
            </div>
          </div>


                {/* ── BILL OF MATERIALS ─────────────────────────── */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-xl text-gray-900">Bill of Materials</h3>
            <span className="text-xs text-gray-400 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
              All prices in ₦
            </span>
          </div>

          {/* panel card */}
          
            <BOMPanel
            panelCount={panelCount}
            totalArrayWatts={totalArrayWatts}
            bom={bom}
            setBom={setBom}
              />

            <BOMBattery
            batteryAh={batteryAh}
            systemVoltage={config.systemVoltage}
            bom={bom}
            setBom={setBom}
            />

             <BOMInverterController
              inverterKw={inverterKw}
              inverterSize={inverterSize}
              chargeControllerAmps={chargeControllerAmps}
              systemVoltage={config.systemVoltage}
              bom={bom}
              setBom={setBom}
              />
            </div>{/* end BOM wrapper */}

            

          {/* Cable & Breaker Sizing */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <h3 className="font-bold text-gray-800 mb-4">Cable & Breaker Sizing</h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">

              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-xs font-semibold text-gray-500 mb-2">PV Array → Controller</p>
                <p className="text-sm font-bold text-gray-800">Cable: <span className="text-amber-600">{pvCableSize} mm²</span></p>
                <p className="text-sm font-bold text-gray-800">DC Breaker: <span className="text-amber-600">{pvBreaker} A</span></p>
                <p className="text-xs text-gray-400 mt-1">Current: {pvCurrent.toFixed(1)} A</p>
              </div>

              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-xs font-semibold text-gray-500 mb-2">Battery → Inverter</p>
                <p className="text-sm font-bold text-gray-800">Cable: <span className="text-amber-600">{batteryCableSize} mm²</span></p>
                <p className="text-sm font-bold text-gray-800">DC Breaker: <span className="text-amber-600">{batteryBreaker} A</span></p>
                <p className="text-xs text-gray-400 mt-1">Current: {batteryCurrent.toFixed(1)} A</p>
              </div>

              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-xs font-semibold text-gray-500 mb-2">Inverter AC Output</p>
                <p className="text-sm font-bold text-gray-800">Cable: <span className="text-amber-600">{pvCableSize} mm²</span></p>
                <p className="text-sm font-bold text-gray-800">AC Breaker: <span className="text-amber-600">{acBreaker} A</span></p>
                <p className="text-xs text-gray-400 mt-1">@ 230V output</p>
              </div>

            </div>
          </div>

        </div>
      )}
    </div>
  );
}