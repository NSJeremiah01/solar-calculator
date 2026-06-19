import { useState } from "react";

const inverterDatabase = [
  { brand: "Growatt",  model: "SPF 3000TL LVM",  kw: 3,   type: "hybrid",  voltage: 24, price: 280000 },
  { brand: "Growatt",  model: "SPF 5000TL LVM",  kw: 5,   type: "hybrid",  voltage: 48, price: 420000 },
  { brand: "Growatt",  model: "SPF 10000TL LVM", kw: 10,  type: "hybrid",  voltage: 48, price: 750000 },
  { brand: "Deye",     model: "SUN-3.6K-SG03LP", kw: 3.6, type: "hybrid",  voltage: 48, price: 350000 },
  { brand: "Deye",     model: "SUN-5K-SG03LP",   kw: 5,   type: "hybrid",  voltage: 48, price: 480000 },
  { brand: "Deye",     model: "SUN-8K-SG01LP",   kw: 8,   type: "hybrid",  voltage: 48, price: 680000 },
  { brand: "Victron",  model: "MultiPlus-II 3kW", kw: 3,  type: "hybrid",  voltage: 24, price: 520000 },
  { brand: "Victron",  model: "MultiPlus-II 5kW", kw: 5,  type: "hybrid",  voltage: 48, price: 780000 },
  { brand: "Felicity", model: "FL-3KVA-24V",      kw: 3,  type: "hybrid",  voltage: 24, price: 260000 },
  { brand: "Felicity", model: "FL-5KVA-48V",      kw: 5,  type: "hybrid",  voltage: 48, price: 390000 },
  { brand: "Solax",    model: "X1-Hybrid 3.7kW",  kw: 3.7, type: "hybrid", voltage: 48, price: 410000 },
  { brand: "Solax",    model: "X3-Hybrid 10kW",   kw: 10,  type: "hybrid", voltage: 48, price: 890000 },
];

const chargeControllerDatabase = [
  { brand: "Epever",  model: "Tracer 4210AN",     amps: 40,  voltage: 24, type: "mppt", price: 45000  },
  { brand: "Epever",  model: "Tracer 6415AN",     amps: 60,  voltage: 24, type: "mppt", price: 65000  },
  { brand: "Epever",  model: "Tracer 10415AN",    amps: 100, voltage: 48, type: "mppt", price: 110000 },
  { brand: "Victron", model: "SmartSolar 75/15",  amps: 15,  voltage: 12, type: "mppt", price: 55000  },
  { brand: "Victron", model: "SmartSolar 100/30", amps: 30,  voltage: 24, type: "mppt", price: 85000  },
  { brand: "Victron", model: "SmartSolar 150/60", amps: 60,  voltage: 48, type: "mppt", price: 145000 },
  { brand: "Renogy",  model: "RCC40MPPT",         amps: 40,  voltage: 24, type: "mppt", price: 38000  },
  { brand: "Renogy",  model: "RCC60MPPT",         amps: 60,  voltage: 48, type: "mppt", price: 58000  },
  { brand: "Phocos",  model: "CML40",             amps: 40,  voltage: 24, type: "pwm",  price: 18000  },
  { brand: "Phocos",  model: "CML60",             amps: 60,  voltage: 24, type: "pwm",  price: 25000  },
];

export default function BOMInverterController({
  inverterKw, inverterSize, chargeControllerAmps, systemVoltage, bom, setBom
}) {
  // which component is currently selected
  const [selected, setSelected] = useState("inverter");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  // ── Search ────────────────────────────────────────────
  const handleSearch = (query) => {
    const db = selected === "inverter" ? inverterDatabase : chargeControllerDatabase;

    // update the right bom section search field
    setBom((prev) => ({
      ...prev,
      [selected === "inverter" ? "inverter" : "chargeController"]: {
        ...prev[selected === "inverter" ? "inverter" : "chargeController"],
        search: query,
        isCustom: true,
      }
    }));

    if (query.length < 2) { setSearchResults([]); setShowResults(false); return; }

    const results = db.filter((item) =>
      item.brand.toLowerCase().includes(query.toLowerCase()) ||
      item.model.toLowerCase().includes(query.toLowerCase()) ||
      (item.kw?.toString() || item.amps?.toString() || "").includes(query)
    );
    setSearchResults(results);
    setShowResults(true);
  };

  // ── Select from dropdown ──────────────────────────────
  const handleSelect = (item) => {
    if (selected === "inverter") {
      setBom((prev) => ({
        ...prev,
        inverter: {
          ...prev.inverter,
          search: `${item.brand} ${item.model}`,
          brand: item.brand, model: item.model,
          kw: item.kw, type: item.type,
          voltage: item.voltage, unitPrice: item.price,
          isCustom: false,
        }
      }));
    } else {
      setBom((prev) => ({
        ...prev,
        chargeController: {
          ...prev.chargeController,
          search: `${item.brand} ${item.model}`,
          brand: item.brand, model: item.model,
          amps: item.amps, type: item.type,
          voltage: item.voltage, unitPrice: item.price,
          isCustom: false,
        }
      }));
    }
    setSearchResults([]);
    setShowResults(false);
  };

  // ── Current values based on selected ─────────────────
  const isInverter = selected === "inverter";
  const current = isInverter ? bom.inverter : bom.chargeController;
  const updateCurrent = (field, value) => {
    const key = isInverter ? "inverter" : "chargeController";
    setBom((prev) => ({ ...prev, [key]: { ...prev[key], [field]: value } }));
  };

  // ── Validation ────────────────────────────────────────
  const invUndersized  = bom.inverter.kw > 0 && bom.inverter.kw < parseFloat(inverterKw);
  const invVoltMismatch = bom.inverter.voltage && bom.inverter.voltage !== systemVoltage;
  const ccUndersized   = bom.chargeController.amps > 0 && bom.chargeController.amps < chargeControllerAmps;
  const isPWM          = bom.chargeController.type === "pwm";

  // ── Totals ────────────────────────────────────────────
  const invTotal = bom.inverter.unitPrice || 0;
  const ccTotal  = (bom.chargeController.qty || 1) * (bom.chargeController.unitPrice || 0);
  const grandTotal = invTotal + ccTotal;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">

      {/* Header */}
      <div className="flex items-center gap-2 mb-5">
        <span className="bg-blue-50 p-2 rounded-lg">⚡</span>
        <div>
          <h4 className="font-bold text-gray-800">Inverter & Charge Controller</h4>
          <p className="text-xs text-gray-400">
            Min inverter: {inverterKw}kW · Min controller: {chargeControllerAmps}A
          </p>
        </div>
      </div>

      {/* Selector dropdown */}
      <div className="flex flex-col gap-1 mb-4">
        <label className="text-xs font-medium text-gray-500">Select Component</label>
        <select
          className="text-sm bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-amber-400"
          value={selected}
          onChange={(e) => {
            setSelected(e.target.value);
            setSearchResults([]);
            setShowResults(false);
          }}
        >
          <option value="inverter">Inverter</option>
          <option value="chargeController">Charge Controller</option>
        </select>
      </div>

      {/* ── Warnings ─────────────────────────────────── */}
      {isInverter && invUndersized && (
        <div className="text-xs bg-red-50 text-red-700 px-3 py-2 rounded-lg mb-3">
          🔴 Selected inverter ({bom.inverter.kw}kW) is undersized. Minimum is {inverterKw}kW.
        </div>
      )}
      {isInverter && invVoltMismatch && (
        <div className="text-xs bg-red-50 text-red-700 px-3 py-2 rounded-lg mb-3">
          🔴 Inverter voltage ({bom.inverter.voltage}V) doesn't match system voltage ({systemVoltage}V).
        </div>
      )}
      {!isInverter && ccUndersized && (
        <div className="text-xs bg-red-50 text-red-700 px-3 py-2 rounded-lg mb-3">
          🔴 Controller ({bom.chargeController.amps}A) is undersized. Minimum is {chargeControllerAmps}A.
        </div>
      )}
      {!isInverter && isPWM && (
        <div className="text-xs bg-amber-50 text-amber-700 px-3 py-2 rounded-lg mb-3">
          🟡 PWM is less efficient than MPPT. MPPT improves harvest by up to 30%.
        </div>
      )}

      {/* ── Fields ───────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

        {/* Search */}
        <div className="flex flex-col gap-1 relative">
          <label className="text-xs font-medium text-gray-500">
            Search {isInverter ? "Inverter" : "Charge Controller"}
          </label>
          <input
            type="text"
            className="text-sm bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-amber-400"
            placeholder={isInverter ? "e.g. Growatt 5kW or Deye..." : "e.g. Epever 60A or Victron MPPT..."}
            value={current.search}
            onChange={(e) => handleSearch(e.target.value)}
          />

          {/* Dropdown results */}
          {showResults && searchResults.length > 0 && (
            <div className="absolute top-16 left-0 right-0 bg-white border border-gray-200 rounded-xl shadow-lg z-20 max-h-44 overflow-y-auto">
              {searchResults.map((item, i) => (
                <div
                  key={i}
                  onClick={() => handleSelect(item)}
                  className="flex justify-between px-4 py-2.5 hover:bg-amber-50 cursor-pointer border-b border-gray-50 last:border-0"
                >
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{item.brand}</p>
                    <p className="text-xs text-gray-400">{item.model}</p>
                    <p className="text-xs text-gray-400 uppercase">{item.type}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs font-bold text-amber-600">
                      {isInverter ? `${item.kw}kW` : `${item.amps}A`}
                    </p>
                    <p className="text-xs text-gray-400">₦{item.price.toLocaleString()}</p>
                  </div>
                </div>
              ))}
              <div
                onClick={() => { updateCurrent("isCustom", true); setShowResults(false); }}
                className="px-4 py-2.5 text-xs text-blue-600 cursor-pointer hover:bg-gray-50"
              >
                + Enter custom {isInverter ? "inverter" : "controller"}
              </div>
            </div>
          )}

          {/* No results */}
          {showResults && searchResults.length === 0 && current.search.length >= 2 && (
            <div className="absolute top-16 left-0 right-0 bg-white border border-gray-200 rounded-xl shadow-lg z-20 p-3">
              <p className="text-xs text-gray-400 mb-1">Not found in database.</p>
              <div
                onClick={() => { updateCurrent("isCustom", true); setShowResults(false); }}
                className="text-xs text-blue-600 cursor-pointer hover:underline"
              >
                + Add manually
              </div>
            </div>
          )}
        </div>

        {/* Custom brand/model */}
        {current.isCustom && (
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-500">Brand & Model</label>
            <input
              type="text"
              className="text-sm bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-amber-400"
              placeholder={isInverter ? "e.g. Victron MultiPlus 5kW" : "e.g. Epever Tracer 60A"}
              value={current.model}
              onChange={(e) => updateCurrent("model", e.target.value)}
            />
          </div>
        )}

        {/* INVERTER specific fields */}
        {isInverter && (<>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-500">Type</label>
            <select
              className="text-sm bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-amber-400"
              value={bom.inverter.type}
              onChange={(e) => updateCurrent("type", e.target.value)}
            >
              <option value="hybrid">Hybrid (Solar + Grid + Battery)</option>
              <option value="offgrid">Off-Grid (Solar + Battery only)</option>
              <option value="gridtied">Grid-Tied (Solar + Grid)</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-500">Capacity (kW) — min {inverterKw}kW</label>
            <input
              type="number" step="0.1"
              className={`text-sm bg-gray-50 border rounded-lg px-3 py-2 focus:outline-none focus:border-amber-400 ${invUndersized ? "border-red-300" : "border-gray-200"}`}
              placeholder={inverterKw}
              value={bom.inverter.kw || ""}
              onChange={(e) => updateCurrent("kw", Number(e.target.value))}
            />
            {invUndersized && <p className="text-xs text-red-500">Must be at least {inverterKw}kW</p>}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-500">DC Input Voltage (V)</label>
            <input
              type="number"
              className={`text-sm bg-gray-50 border rounded-lg px-3 py-2 focus:outline-none focus:border-amber-400 ${invVoltMismatch ? "border-red-300" : "border-gray-200"}`}
              value={bom.inverter.voltage || systemVoltage}
              onChange={(e) => updateCurrent("voltage", Number(e.target.value))}
            />
          </div>
        </>)}

        {/* CHARGE CONTROLLER specific fields */}
        {!isInverter && (<>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-500">Type</label>
            <select
              className="text-sm bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-amber-400"
              value={bom.chargeController.type}
              onChange={(e) => updateCurrent("type", e.target.value)}
            >
              <option value="mppt">MPPT (Recommended)</option>
              <option value="pwm">PWM (Basic)</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-500">Current (A) — min {chargeControllerAmps}A</label>
            <input
              type="number"
              className={`text-sm bg-gray-50 border rounded-lg px-3 py-2 focus:outline-none focus:border-amber-400 ${ccUndersized ? "border-red-300" : "border-gray-200"}`}
              placeholder={chargeControllerAmps}
              value={bom.chargeController.amps || ""}
              onChange={(e) => updateCurrent("amps", Number(e.target.value))}
            />
            {ccUndersized && <p className="text-xs text-red-500">Must be at least {chargeControllerAmps}A</p>}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-500">Quantity</label>
            <input
              type="number" min={1}
              className="text-sm bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-amber-400"
              value={bom.chargeController.qty || 1}
              onChange={(e) => updateCurrent("qty", Number(e.target.value))}
            />
            <p className="text-xs text-gray-400">Use multiple for large arrays</p>
          </div>
        </>)}

        {/* Price — shared */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-gray-500">
            {isInverter ? "Price (₦)" : "Unit Price (₦)"}
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">₦</span>
            <input
              type="number"
              className="text-sm bg-gray-50 border border-gray-200 rounded-lg pl-6 pr-3 py-2 focus:outline-none focus:border-amber-400 w-full"
              placeholder="0"
              value={current.unitPrice || ""}
              onChange={(e) => updateCurrent("unitPrice", Number(e.target.value))}
            />
          </div>
        </div>

      </div>

      {/* Summary of both components */}
      <div className="mt-4 pt-3 border-t border-gray-100 flex flex-col gap-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">
            Inverter: {bom.inverter.search || "Not selected"}
            {!invUndersized && bom.inverter.kw > 0 && <span className="text-green-600 ml-1">✓</span>}
          </span>
          <span className={`font-semibold ${invTotal > 0 ? "text-gray-800" : "text-gray-300"}`}>
            ₦{invTotal.toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">
            Controller: {bom.chargeController.search || "Not selected"}
            {!ccUndersized && bom.chargeController.amps > 0 && <span className="text-green-600 ml-1">✓</span>}
          </span>
          <span className={`font-semibold ${ccTotal > 0 ? "text-gray-800" : "text-gray-300"}`}>
            ₦{ccTotal.toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between items-center pt-2 border-t border-gray-100">
          <span className="text-sm font-bold text-gray-700">Total</span>
          <span className={`text-lg font-bold ${grandTotal > 0 ? "text-amber-600" : "text-gray-300"}`}>
            ₦{grandTotal.toLocaleString()}
          </span>
        </div>
      </div>

    </div>
  );
}