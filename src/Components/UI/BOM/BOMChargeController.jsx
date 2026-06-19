import { useState } from "react";

const chargeControllerDatabase = [
  { brand: "Epever",   model: "Tracer 4210AN",   amps: 40,  voltage: 12, type: "mppt", price: 45000  },
  { brand: "Epever",   model: "Tracer 6415AN",   amps: 60,  voltage: 24, type: "mppt", price: 65000  },
  { brand: "Epever",   model: "Tracer 10415AN",  amps: 100, voltage: 48, type: "mppt", price: 110000 },
  { brand: "Victron",  model: "SmartSolar 75/15",amps: 15,  voltage: 12, type: "mppt", price: 55000  },
  { brand: "Victron",  model: "SmartSolar 100/30",amps: 30, voltage: 24, type: "mppt", price: 85000  },
  { brand: "Victron",  model: "SmartSolar 150/60",amps: 60, voltage: 48, type: "mppt", price: 145000 },
  { brand: "Victron",  model: "SmartSolar 250/100",amps: 100,voltage: 48,type: "mppt", price: 220000 },
  { brand: "Renogy",   model: "RCC40MPPT",        amps: 40, voltage: 24, type: "mppt", price: 38000  },
  { brand: "Renogy",   model: "RCC60MPPT",        amps: 60, voltage: 48, type: "mppt", price: 58000  },
  { brand: "Phocos",   model: "CML40",            amps: 40, voltage: 24, type: "pwm",  price: 18000  },
  { brand: "Phocos",   model: "CML60",            amps: 60, voltage: 24, type: "pwm",  price: 25000  },
];

export default function BOMChargeController({ chargeControllerAmps, systemVoltage, bom, setBom }) {

  const [ccResults, setCcResults] = useState([]);
  const [showCcResults, setShowCcResults] = useState(false);

  const searchControllers = (query) => {
    setBom((prev) => ({
      ...prev,
      chargeController: { ...prev.chargeController, search: query, isCustom: true }
    }));
    if (query.length < 2) {
      setCcResults([]);
      setShowCcResults(false);
      return;
    }
    const results = chargeControllerDatabase.filter(
      (cc) =>
        cc.brand.toLowerCase().includes(query.toLowerCase()) ||
        cc.model.toLowerCase().includes(query.toLowerCase()) ||
        cc.amps.toString().includes(query) ||
        cc.type.toLowerCase().includes(query.toLowerCase())
    );
    setCcResults(results);
    setShowCcResults(true);
  };

  const selectController = (cc) => {
    setBom((prev) => ({
      ...prev,
      chargeController: {
        ...prev.chargeController,
        search:    `${cc.brand} ${cc.model}`,
        brand:     cc.brand,
        model:     cc.model,
        amps:      cc.amps,
        type:      cc.type,
        voltage:   cc.voltage,
        unitPrice: cc.price,
        isCustom:  false,
      },
    }));
    setCcResults([]);
    setShowCcResults(false);
  };

  const selectedAmps = bom.chargeController.amps || 0;
  const isUndersized = selectedAmps > 0 && selectedAmps < chargeControllerAmps;
  const isPWM = bom.chargeController.type === "pwm";
  const total = bom.chargeController.unitPrice || 0;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
      <div className="flex items-center gap-2 mb-4">
        <span className="bg-purple-50 p-2 rounded-lg">🔌</span>
        <div>
          <h4 className="font-bold text-gray-800">Charge Controller</h4>
          <p className="text-xs text-gray-400">
            Minimum required: {chargeControllerAmps}A · MPPT recommended
          </p>
        </div>
      </div>

      {/* Warnings */}
      {isUndersized && (
        <div className="flex items-start gap-2 bg-red-50 text-red-700 px-3 py-2 rounded-lg text-xs mb-3">
          🔴 Selected controller ({selectedAmps}A) is undersized.
          Minimum required is {chargeControllerAmps}A.
        </div>
      )}
      {isPWM && (
        <div className="flex items-start gap-2 bg-amber-50 text-amber-700 px-3 py-2 rounded-lg text-xs mb-3">
          🟡 PWM controllers are less efficient than MPPT.
          MPPT can improve energy harvest by up to 30%, especially in partial shading.
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

        {/* Search */}
        <div className="flex flex-col gap-1 relative">
          <label className="text-xs font-medium text-gray-500">Search Charge Controller</label>
          <input
            type="text"
            className="text-sm bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-amber-400"
            placeholder="e.g. Epever 60A or Victron MPPT..."
            value={bom.chargeController.search}
            onChange={(e) => searchControllers(e.target.value)}
          />

          {/* Dropdown */}
          {showCcResults && ccResults.length > 0 && (
            <div className="absolute top-16 left-0 right-0 bg-white border border-gray-200 rounded-xl shadow-lg z-10 max-h-48 overflow-y-auto">
              {ccResults.map((cc, i) => (
                <div
                  key={i}
                  onClick={() => selectController(cc)}
                  className={`flex items-center justify-between px-4 py-2.5 hover:bg-amber-50 cursor-pointer border-b border-gray-50 last:border-0 ${
                    cc.amps < chargeControllerAmps ? "opacity-50" : ""
                  }`}
                >
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{cc.brand}</p>
                    <p className="text-xs text-gray-400">{cc.model}</p>
                    <p className="text-xs text-gray-400 uppercase">{cc.type} · {cc.voltage}V</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-xs font-bold ${cc.amps < chargeControllerAmps ? "text-red-400" : "text-amber-600"}`}>
                      {cc.amps}A {cc.amps < chargeControllerAmps && "⚠️"}
                    </p>
                    <p className="text-xs text-gray-400">₦{cc.price.toLocaleString()}</p>
                  </div>
                </div>
              ))}
              <div
                onClick={() => {
                  setBom((prev) => ({ ...prev, chargeController: { ...prev.chargeController, isCustom: true } }));
                  setShowCcResults(false);
                }}
                className="flex items-center gap-2 px-4 py-2.5 hover:bg-gray-50 cursor-pointer text-blue-600"
              >
                <span className="text-xs">+ Enter custom controller not in database</span>
              </div>
            </div>
          )}

          {/* No results */}
          {showCcResults && ccResults.length === 0 && bom.chargeController.search.length >= 2 && (
            <div className="absolute top-16 left-0 right-0 bg-white border border-gray-200 rounded-xl shadow-lg z-10 p-3">
              <p className="text-xs text-gray-400 mb-2">No controllers found in database.</p>
              <div
                onClick={() => {
                  setBom((prev) => ({ ...prev, chargeController: { ...prev.chargeController, isCustom: true } }));
                  setShowCcResults(false);
                }}
                className="text-xs text-blue-600 cursor-pointer hover:underline"
              >
                + Add custom controller manually
              </div>
            </div>
          )}
        </div>

        {/* Custom brand/model */}
        {bom.chargeController.isCustom && (
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-500">Brand & Model</label>
            <input
              type="text"
              className="text-sm bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-amber-400"
              placeholder="e.g. Epever Tracer 60A MPPT"
              value={bom.chargeController.model}
              onChange={(e) =>
                setBom((prev) => ({ ...prev, chargeController: { ...prev.chargeController, model: e.target.value } }))
              }
            />
          </div>
        )}

        {/* Controller Type */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-gray-500">Controller Type</label>
          <select
            className="text-sm bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-amber-400"
            value={bom.chargeController.type}
            onChange={(e) =>
              setBom((prev) => ({ ...prev, chargeController: { ...prev.chargeController, type: e.target.value } }))
            }
          >
            <option value="mppt">MPPT (Recommended)</option>
            <option value="pwm">PWM (Basic)</option>
          </select>
        </div>

        {/* Amps */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-gray-500">
            Current Rating (A)
            <span className="text-gray-400 font-normal ml-1">min {chargeControllerAmps}A</span>
          </label>
          <input
            type="number"
            className={`text-sm bg-gray-50 border rounded-lg px-3 py-2 focus:outline-none focus:border-amber-400 ${
              isUndersized ? "border-red-300" : "border-gray-200"
            }`}
            value={bom.chargeController.amps || ""}
            placeholder={chargeControllerAmps}
            onChange={(e) =>
              setBom((prev) => ({ ...prev, chargeController: { ...prev.chargeController, amps: Number(e.target.value) } }))
            }
          />
          {isUndersized && (
            <p className="text-xs text-red-500">Must be at least {chargeControllerAmps}A</p>
          )}
        </div>

        {/* Quantity */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-gray-500">Quantity</label>
          <input
            type="number"
            min={1}
            className="text-sm bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-amber-400"
            value={bom.chargeController.qty || 1}
            onChange={(e) =>
              setBom((prev) => ({ ...prev, chargeController: { ...prev.chargeController, qty: Number(e.target.value) } }))
            }
          />
          <p className="text-xs text-gray-400">
            Use multiple controllers if array current exceeds single unit rating
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
              value={bom.chargeController.unitPrice || ""}
              onChange={(e) =>
                setBom((prev) => ({ ...prev, chargeController: { ...prev.chargeController, unitPrice: Number(e.target.value) } }))
              }
            />
          </div>
        </div>

      </div>

      {/* Total */}
      <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
        <div>
          {bom.chargeController.search && (
            <p className="text-xs text-gray-500 font-medium">{bom.chargeController.search}</p>
          )}
          <p className="text-xs text-gray-400 mt-0.5 uppercase">
            {bom.chargeController.type} · {bom.chargeController.amps || chargeControllerAmps}A
            · {bom.chargeController.qty || 1} unit(s)
          </p>
          {!isUndersized && bom.chargeController.amps > 0 && (
            <p className="text-xs text-green-600 mt-0.5">✓ Meets {chargeControllerAmps}A requirement</p>
          )}
        </div>
        <span className={`text-lg font-bold ${total > 0 ? "text-amber-600" : "text-gray-300"}`}>
          ₦{((bom.chargeController.qty || 1) * total).toLocaleString()}
        </span>
      </div>

    </div>
  );
}