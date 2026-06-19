import { useState } from "react";

const inverterDatabase = [
  { brand: "Growatt",  model: "SPF 3000TL LVM",  kw: 3,   type: "hybrid",    voltage: 24, price: 280000  },
  { brand: "Growatt",  model: "SPF 5000TL LVM",  kw: 5,   type: "hybrid",    voltage: 48, price: 420000  },
  { brand: "Growatt",  model: "SPF 10000TL LVM", kw: 10,  type: "hybrid",    voltage: 48, price: 750000  },
  { brand: "Deye",     model: "SUN-3.6K-SG03LP", kw: 3.6, type: "hybrid",    voltage: 48, price: 350000  },
  { brand: "Deye",     model: "SUN-5K-SG03LP",   kw: 5,   type: "hybrid",    voltage: 48, price: 480000  },
  { brand: "Deye",     model: "SUN-8K-SG01LP",   kw: 8,   type: "hybrid",    voltage: 48, price: 680000  },
  { brand: "Victron",  model: "MultiPlus-II 3kW", kw: 3,  type: "hybrid",    voltage: 24, price: 520000  },
  { brand: "Victron",  model: "MultiPlus-II 5kW", kw: 5,  type: "hybrid",    voltage: 48, price: 780000  },
  { brand: "Felicity", model: "FL-3KVA-24V",      kw: 3,  type: "hybrid",    voltage: 24, price: 260000  },
  { brand: "Felicity", model: "FL-5KVA-48V",      kw: 5,  type: "hybrid",    voltage: 48, price: 390000  },
  { brand: "Luminous", model: "Cruze+ 10KVA",     kw: 10, type: "offgrid",   voltage: 48, price: 580000  },
  { brand: "Solax",    model: "X1-Hybrid 3.7kW",  kw: 3.7, type: "hybrid",   voltage: 48, price: 410000  },
  { brand: "Solax",    model: "X3-Hybrid 10kW",   kw: 10,  type: "hybrid",   voltage: 48, price: 890000  },
];

export default function BOMInverter({ inverterKw, inverterSize, systemVoltage, bom, setBom }) {

  const [inverterResults, setInverterResults] = useState([]);
  const [showInverterResults, setShowInverterResults] = useState(false);

  const searchInverters = (query) => {
    setBom((prev) => ({
      ...prev,
      inverter: { ...prev.inverter, search: query, isCustom: true }
    }));
    if (query.length < 2) {
      setInverterResults([]);
      setShowInverterResults(false);
      return;
    }
    const results = inverterDatabase.filter(
      (inv) =>
        inv.brand.toLowerCase().includes(query.toLowerCase()) ||
        inv.model.toLowerCase().includes(query.toLowerCase()) ||
        inv.kw.toString().includes(query) ||
        inv.type.toLowerCase().includes(query.toLowerCase())
    );
    setInverterResults(results);
    setShowInverterResults(true);
  };

  const selectInverter = (inv) => {
    setBom((prev) => ({
      ...prev,
      inverter: {
        ...prev.inverter,
        search:    `${inv.brand} ${inv.model}`,
        brand:     inv.brand,
        model:     inv.model,
        kw:        inv.kw,
        type:      inv.type,
        voltage:   inv.voltage,
        unitPrice: inv.price,
        isCustom:  false,
      },
    }));
    setInverterResults([]);
    setShowInverterResults(false);
  };

  const minKw = parseFloat(inverterKw);
  const selectedKw = bom.inverter.kw || 0;
  const isUndersized = selectedKw > 0 && selectedKw < minKw;
  const voltageMismatch = bom.inverter.voltage && bom.inverter.voltage !== systemVoltage;
  const total = bom.inverter.unitPrice || 0;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
      <div className="flex items-center gap-2 mb-4">
        <span className="bg-blue-50 p-2 rounded-lg">⚡</span>
        <div>
          <h4 className="font-bold text-gray-800">Inverter</h4>
          <p className="text-xs text-gray-400">
            Minimum size required: {inverterKw}kW ({inverterSize}W)
          </p>
        </div>
      </div>

      {/* Warnings */}
      {isUndersized && (
        <div className="flex items-start gap-2 bg-red-50 text-red-700 px-3 py-2 rounded-lg text-xs mb-4">
          🔴 Selected inverter ({selectedKw}kW) is undersized. 
          Minimum required is {inverterKw}kW. Risk of overload and shutdown.
        </div>
      )}
      {voltageMismatch && (
        <div className="flex items-start gap-2 bg-red-50 text-red-700 px-3 py-2 rounded-lg text-xs mb-4">
          🔴 Inverter voltage ({bom.inverter.voltage}V) does not match 
          system voltage ({systemVoltage}V).
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

        {/* Search */}
        <div className="flex flex-col gap-1 relative">
          <label className="text-xs font-medium text-gray-500">Search Inverter</label>
          <input
            type="text"
            className="text-sm bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-amber-400"
            placeholder="e.g. Growatt 5kW or Deye hybrid..."
            value={bom.inverter.search}
            onChange={(e) => searchInverters(e.target.value)}
          />

          {/* Dropdown */}
          {showInverterResults && inverterResults.length > 0 && (
            <div className="absolute top-16 left-0 right-0 bg-white border border-gray-200 rounded-xl shadow-lg z-10 max-h-48 overflow-y-auto">
              {inverterResults.map((inv, i) => (
                <div
                  key={i}
                  onClick={() => selectInverter(inv)}
                  className={`flex items-center justify-between px-4 py-2.5 hover:bg-amber-50 cursor-pointer border-b border-gray-50 last:border-0 ${
                    inv.kw < minKw ? "opacity-50" : ""
                  }`}
                >
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{inv.brand}</p>
                    <p className="text-xs text-gray-400">{inv.model}</p>
                    <p className="text-xs text-gray-400 capitalize">{inv.type} · {inv.voltage}V</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-xs font-bold ${inv.kw < minKw ? "text-red-400" : "text-amber-600"}`}>
                      {inv.kw}kW
                      {inv.kw < minKw && " ⚠️"}
                    </p>
                    <p className="text-xs text-gray-400">₦{inv.price.toLocaleString()}</p>
                  </div>
                </div>
              ))}
              <div
                onClick={() => {
                  setBom((prev) => ({ ...prev, inverter: { ...prev.inverter, isCustom: true } }));
                  setShowInverterResults(false);
                }}
                className="flex items-center gap-2 px-4 py-2.5 hover:bg-gray-50 cursor-pointer text-blue-600"
              >
                <span className="text-xs">+ Enter custom inverter not in database</span>
              </div>
            </div>
          )}

          {/* No results */}
          {showInverterResults && inverterResults.length === 0 && bom.inverter.search.length >= 2 && (
            <div className="absolute top-16 left-0 right-0 bg-white border border-gray-200 rounded-xl shadow-lg z-10 p-3">
              <p className="text-xs text-gray-400 mb-2">No inverters found in database.</p>
              <div
                onClick={() => {
                  setBom((prev) => ({ ...prev, inverter: { ...prev.inverter, isCustom: true } }));
                  setShowInverterResults(false);
                }}
                className="text-xs text-blue-600 cursor-pointer hover:underline"
              >
                + Add custom inverter manually
              </div>
            </div>
          )}
        </div>

        {/* Custom brand/model */}
        {bom.inverter.isCustom && (
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-500">Brand & Model</label>
            <input
              type="text"
              className="text-sm bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-amber-400"
              placeholder="e.g. Victron MultiPlus 5kW"
              value={bom.inverter.model}
              onChange={(e) =>
                setBom((prev) => ({ ...prev, inverter: { ...prev.inverter, model: e.target.value } }))
              }
            />
          </div>
        )}

        {/* Inverter Type */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-gray-500">Inverter Type</label>
          <select
            className="text-sm bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-amber-400"
            value={bom.inverter.type}
            onChange={(e) =>
              setBom((prev) => ({ ...prev, inverter: { ...prev.inverter, type: e.target.value } }))
            }
          >
            <option value="hybrid">Hybrid (Solar + Grid + Battery)</option>
            <option value="offgrid">Off-Grid (Solar + Battery only)</option>
            <option value="gridtied">Grid-Tied (Solar + Grid, no battery)</option>
          </select>
        </div>

        {/* Capacity kW */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-gray-500">
            Capacity (kW)
            <span className="text-gray-400 font-normal ml-1">min {inverterKw}kW</span>
          </label>
          <input
            type="number"
            step="0.1"
            className={`text-sm bg-gray-50 border rounded-lg px-3 py-2 focus:outline-none focus:border-amber-400 ${
              isUndersized ? "border-red-300" : "border-gray-200"
            }`}
            value={bom.inverter.kw || ""}
            placeholder={inverterKw}
            onChange={(e) =>
              setBom((prev) => ({ ...prev, inverter: { ...prev.inverter, kw: Number(e.target.value) } }))
            }
          />
          {isUndersized && (
            <p className="text-xs text-red-500">Must be at least {inverterKw}kW</p>
          )}
        </div>

        {/* Input Voltage */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-gray-500">DC Input Voltage (V)</label>
          <input
            type="number"
            className={`text-sm bg-gray-50 border rounded-lg px-3 py-2 focus:outline-none focus:border-amber-400 ${
              voltageMismatch ? "border-red-300" : "border-gray-200"
            }`}
            value={bom.inverter.voltage || systemVoltage}
            onChange={(e) =>
              setBom((prev) => ({ ...prev, inverter: { ...prev.inverter, voltage: Number(e.target.value) } }))
            }
          />
        </div>

        {/* Unit Price */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-gray-500">Price (₦)</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">₦</span>
            <input
              type="number"
              className="text-sm bg-gray-50 border border-gray-200 rounded-lg pl-6 pr-3 py-2 focus:outline-none focus:border-amber-400 w-full"
              placeholder="0"
              value={bom.inverter.unitPrice || ""}
              onChange={(e) =>
                setBom((prev) => ({ ...prev, inverter: { ...prev.inverter, unitPrice: Number(e.target.value) } }))
              }
            />
          </div>
        </div>

      </div>

      {/* Total */}
      <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
        <div>
          {bom.inverter.search && (
            <p className="text-xs text-gray-500 font-medium">{bom.inverter.search}</p>
          )}
          <p className="text-xs text-gray-400 mt-0.5 capitalize">
            {bom.inverter.type} · {bom.inverter.kw || inverterKw}kW · {bom.inverter.voltage || systemVoltage}V
          </p>
          {!isUndersized && bom.inverter.kw > 0 && (
            <p className="text-xs text-green-600 mt-0.5">✓ Meets {inverterKw}kW requirement</p>
          )}
        </div>
        <span className={`text-lg font-bold ${total > 0 ? "text-amber-600" : "text-gray-300"}`}>
          ₦{total.toLocaleString()}
        </span>
      </div>

    </div>
  );
}