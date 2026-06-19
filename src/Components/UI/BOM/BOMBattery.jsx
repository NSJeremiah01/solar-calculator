import { useState } from "react";

const batteryDatabase = [
  { brand: "Felicity",  model: "LP12-200Ah",       voltage: 12, ah: 200, type: "lithium",  price: 185000 },
  { brand: "Felicity",  model: "LP24-100Ah",        voltage: 24, ah: 100, type: "lithium",  price: 175000 },
  { brand: "Felicity",  model: "LP48-50Ah",         voltage: 48, ah: 50,  type: "lithium",  price: 165000 },
  { brand: "Luminous",  model: "LPTT12200H 200Ah",  voltage: 12, ah: 200, type: "leadacid", price: 120000 },
  { brand: "Luminous",  model: "RC 25000 200Ah",    voltage: 12, ah: 200, type: "leadacid", price: 110000 },
  { brand: "Leoch",     model: "LP12-200 200Ah",    voltage: 12, ah: 200, type: "agm",      price: 140000 },
  { brand: "Leoch",     model: "LP12-150 150Ah",    voltage: 12, ah: 150, type: "agm",      price: 115000 },
  { brand: "BRC",       model: "BRC-12V-200Ah",     voltage: 12, ah: 200, type: "gel",      price: 130000 },
  { brand: "Ritar",     model: "RA12-200 200Ah",    voltage: 12, ah: 200, type: "agm",      price: 125000 },
  { brand: "Ritar",     model: "RA12-150 150Ah",    voltage: 12, ah: 150, type: "agm",      price: 98000  },
  { brand: "Narada",    model: "48NPFC100 100Ah",   voltage: 48, ah: 100, type: "lithium",  price: 320000 },
  { brand: "CATL",      model: "LFP 100Ah 48V",     voltage: 48, ah: 100, type: "lithium",  price: 350000 },
];

export default function BOMBattery({ batteryAh, systemVoltage, bom, setBom }) {

  const [batteryResults, setBatteryResults] = useState([]);
  const [showBatteryResults, setShowBatteryResults] = useState(false);

  const searchBatteries = (query) => {
    setBom((prev) => ({
      ...prev,
      battery: { ...prev.battery, search: query, isCustom: true }
    }));
    if (query.length < 2) {
      setBatteryResults([]);
      setShowBatteryResults(false);
      return;
    }
    const results = batteryDatabase.filter(
      (b) =>
        b.brand.toLowerCase().includes(query.toLowerCase()) ||
        b.model.toLowerCase().includes(query.toLowerCase()) ||
        b.ah.toString().includes(query) ||
        b.voltage.toString().includes(query) ||
        b.type.toLowerCase().includes(query.toLowerCase())
    );
    setBatteryResults(results);
    setShowBatteryResults(true);
  };

  const selectBattery = (battery) => {
    setBom((prev) => ({
      ...prev,
      battery: {
        ...prev.battery,
        search:    `${battery.brand} ${battery.model}`,
        brand:     battery.brand,
        model:     battery.model,
        voltage:   battery.voltage,
        ah:        battery.ah,
        type:      battery.type,
        unitPrice: battery.price,
        isCustom:  false,
      },
    }));
    setBatteryResults([]);
    setShowBatteryResults(false);
  };

  // Auto calculate quantity needed
  const unitsNeeded = Math.ceil(batteryAh / (bom.battery.ah || 200));
  const qty = bom.battery.qty || unitsNeeded;
  const totalAh = qty * (bom.battery.ah || 200);
  const total = qty * (bom.battery.unitPrice || 0);

  // Check if selected battery voltage matches system voltage
  const voltageMismatch = bom.battery.voltage && bom.battery.voltage !== systemVoltage;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
      <div className="flex items-center gap-2 mb-4">
        <span className="bg-green-50 p-2 rounded-lg">🔋</span>
        <div>
          <h4 className="font-bold text-gray-800">Battery Bank</h4>
          <p className="text-xs text-gray-400">
            System requires {batteryAh}Ah @ {systemVoltage}V
          </p>
        </div>
      </div>

      {/* Voltage mismatch warning */}
      {voltageMismatch && (
        <div className="flex items-center gap-2 bg-red-50 text-red-700 px-3 py-2 rounded-lg text-xs mb-4">
          🔴 Selected battery is {bom.battery.voltage}V but system voltage is {systemVoltage}V. 
          Please select a matching battery or adjust system voltage in configuration.
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

        {/* Search */}
        <div className="flex flex-col gap-1 relative">
          <label className="text-xs font-medium text-gray-500">Search Battery</label>
          <input
            type="text"
            className="text-sm bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-amber-400"
            placeholder="e.g. Felicity 200Ah or Leoch AGM..."
            value={bom.battery.search}
            onChange={(e) => searchBatteries(e.target.value)}
          />

          {/* Dropdown results */}
          {showBatteryResults && batteryResults.length > 0 && (
            <div className="absolute top-16 left-0 right-0 bg-white border border-gray-200 rounded-xl shadow-lg z-10 max-h-48 overflow-y-auto">
              {batteryResults.map((b, i) => (
                <div
                  key={i}
                  onClick={() => selectBattery(b)}
                  className="flex items-center justify-between px-4 py-2.5 hover:bg-amber-50 cursor-pointer border-b border-gray-50 last:border-0"
                >
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{b.brand}</p>
                    <p className="text-xs text-gray-400">{b.model}</p>
                    <p className="text-xs text-gray-400 capitalize">{b.type}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-amber-600">{b.voltage}V / {b.ah}Ah</p>
                    <p className="text-xs text-gray-400">₦{b.price.toLocaleString()}</p>
                  </div>
                </div>
              ))}
              <div
                onClick={() => {
                  setBom((prev) => ({ ...prev, battery: { ...prev.battery, isCustom: true } }));
                  setShowBatteryResults(false);
                }}
                className="flex items-center gap-2 px-4 py-2.5 hover:bg-gray-50 cursor-pointer text-blue-600"
              >
                <span className="text-xs">+ Enter custom battery not in database</span>
              </div>
            </div>
          )}

          {/* No results */}
          {showBatteryResults && batteryResults.length === 0 && bom.battery.search.length >= 2 && (
            <div className="absolute top-16 left-0 right-0 bg-white border border-gray-200 rounded-xl shadow-lg z-10 p-3">
              <p className="text-xs text-gray-400 mb-2">No batteries found in database.</p>
              <div
                onClick={() => {
                  setBom((prev) => ({ ...prev, battery: { ...prev.battery, isCustom: true } }));
                  setShowBatteryResults(false);
                }}
                className="text-xs text-blue-600 cursor-pointer hover:underline"
              >
                + Add custom battery manually
              </div>
            </div>
          )}
        </div>

        {/* Custom brand/model */}
        {bom.battery.isCustom && (
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-500">Brand & Model</label>
            <input
              type="text"
              className="text-sm bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-amber-400"
              placeholder="e.g. Ritar 12V 200Ah AGM"
              value={bom.battery.model}
              onChange={(e) =>
                setBom((prev) => ({ ...prev, battery: { ...prev.battery, model: e.target.value } }))
              }
            />
          </div>
        )}

        {/* Battery Voltage */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-gray-500">Battery Voltage (V)</label>
          <input
            type="number"
            className={`text-sm bg-gray-50 border rounded-lg px-3 py-2 focus:outline-none focus:border-amber-400 ${
              voltageMismatch ? "border-red-300" : "border-gray-200"
            }`}
            value={bom.battery.voltage}
            onChange={(e) =>
              setBom((prev) => ({ ...prev, battery: { ...prev.battery, voltage: Number(e.target.value) } }))
            }
          />
        </div>

        {/* Battery Ah */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-gray-500">Battery Capacity (Ah)</label>
          <input
            type="number"
            className="text-sm bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-amber-400"
            value={bom.battery.ah}
            onChange={(e) =>
              setBom((prev) => ({ ...prev, battery: { ...prev.battery, ah: Number(e.target.value) } }))
            }
          />
        </div>

        {/* Quantity */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-gray-500">
            Quantity
            <span className="text-gray-400 font-normal ml-1">(auto-calculated)</span>
          </label>
          <input
            type="number"
            className="text-sm bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-amber-400"
            value={qty}
            onChange={(e) =>
              setBom((prev) => ({ ...prev, battery: { ...prev.battery, qty: Number(e.target.value) } }))
            }
          />
          <p className="text-xs text-gray-400">
            {batteryAh}Ah needed ÷ {bom.battery.ah}Ah per unit = {unitsNeeded} units
          </p>
        </div>

        {/* Unit Price */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-gray-500">Unit Price (₦)</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">₦</span>
            <input
              type="number"
              className="text-sm bg-gray-50 border border-gray-200 rounded-lg pl-6 pr-3 py-2 focus:outline-none focus:border-amber-400 w-full"
              placeholder="0"
              value={bom.battery.unitPrice || ""}
              onChange={(e) =>
                setBom((prev) => ({ ...prev, battery: { ...prev.battery, unitPrice: Number(e.target.value) } }))
              }
            />
          </div>
        </div>

      </div>

      {/* Total */}
      <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
        <div>
          <p className="text-xs text-gray-400">
            {qty} units × ₦{(bom.battery.unitPrice || 0).toLocaleString()}
          </p>
          {bom.battery.search && (
            <p className="text-xs text-gray-500 font-medium mt-0.5">{bom.battery.search}</p>
          )}
          <p className="text-xs text-gray-400 mt-0.5">
            Total capacity: {totalAh}Ah @ {bom.battery.voltage}V
            {totalAh >= batteryAh
              ? <span className="text-green-600 ml-1">✓ Meets requirement</span>
              : <span className="text-red-500 ml-1">✗ Below {batteryAh}Ah requirement</span>
            }
          </p>
        </div>
        <span className={`text-lg font-bold ${total > 0 ? "text-amber-600" : "text-gray-300"}`}>
          ₦{total.toLocaleString()}
        </span>
      </div>

    </div>
  );
}