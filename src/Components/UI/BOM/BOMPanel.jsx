import {useState} from "react";

const panelDatabase = [
  { brand: "Jinko Solar",    model: "Tiger Neo 400W", watts: 400, price: 95000  },
  { brand: "Jinko Solar",    model: "Tiger Neo 550W", watts: 550, price: 125000 },
  { brand: "Canadian Solar", model: "HiKu6 400W",     watts: 400, price: 90000  },
  { brand: "Canadian Solar", model: "HiKu6 550W",     watts: 550, price: 118000 },
  { brand: "Astronergy",     model: "CHSM400W Mono",  watts: 400, price: 85000  },
  { brand: "Astronergy",     model: "CHSM550W Mono",  watts: 550, price: 110000 },
  { brand: "BOVIET",         model: "BVM6610M 400W",  watts: 400, price: 82000  },
  { brand: "BOVIET",         model: "BVM6610M 550W",  watts: 550, price: 105000 },
  { brand: "Solarpro",       model: "300W Poly",       watts: 300, price: 65000  },
  { brand: "Solarpro",       model: "200W Poly",       watts: 200, price: 45000  },
];

export default function BOMPanel({ panelCount, totalArrayWatts, bom, setBom }) {
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

  const qty = bom.panel.qty || panelCount;
  const total = qty * (bom.panel.unitPrice || 0);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
      <div className="flex items-center gap-2 mb-4">
        <span className="bg-amber-50 p-2 rounded-lg">☀️</span>
        <div>
          <h4 className="font-bold text-gray-800">Solar Panels</h4>
          <p className="text-xs text-gray-400">
            System requires {panelCount} × {bom.panel.watts}W = {totalArrayWatts}W array
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

        {/* Search */}
        <div className="flex flex-col gap-1 relative">
          <label className="text-xs font-medium text-gray-500">Search Panel</label>
          <input
            type="text"
            className="text-sm bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-amber-400"
            placeholder="e.g. Jinko 400W or Canadian Solar..."
            value={bom.panel.search}
            onChange={(e) => searchPanels(e.target.value)}
          />
          {showPanelResults && panelResults.length > 0 && (
            <div className="absolute top-16 left-0 right-0 bg-white border border-gray-200 rounded-xl shadow-lg z-10 max-h-48 overflow-y-auto">
              {panelResults.map((p, i) => (
                <div
                  key={i}
                  onClick={() => selectPanel(p)}
                  className="flex items-center justify-between px-4 py-2.5 hover:bg-amber-50 cursor-pointer border-b border-gray-50 last:border-0"
                >
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{p.brand}</p>
                    <p className="text-xs text-gray-400">{p.model}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-amber-600">{p.watts}W</p>
                    <p className="text-xs text-gray-400">₦{p.price.toLocaleString()}</p>
                  </div>
                </div>
              ))}
              <div
                onClick={() => {
                  setBom((prev) => ({ ...prev, panel: { ...prev.panel, isCustom: true } }));
                  setShowPanelResults(false);
                }}
                className="flex items-center gap-2 px-4 py-2.5 hover:bg-gray-50 cursor-pointer text-blue-600"
              >
                <span className="text-xs">+ Enter custom panel not in database</span>
              </div>
            </div>
          )}
          {showPanelResults && panelResults.length === 0 && bom.panel.search.length >= 2 && (
            <div className="absolute top-16 left-0 right-0 bg-white border border-gray-200 rounded-xl shadow-lg z-10 p-3">
              <p className="text-xs text-gray-400 mb-2">No panels found in database.</p>
              <div
                onClick={() => {
                  setBom((prev) => ({ ...prev, panel: { ...prev.panel, isCustom: true } }));
                  setShowPanelResults(false);
                }}
                className="text-xs text-blue-600 cursor-pointer hover:underline"
              >
                + Add custom panel manually
              </div>
            </div>
          )}
        </div>

        {/* Custom brand/model */}
        {bom.panel.isCustom && (
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-500">Brand & Model</label>
            <input
              type="text"
              className="text-sm bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-amber-400"
              placeholder="e.g. Solarpro 400W Mono"
              value={bom.panel.model}
              onChange={(e) =>
                setBom((prev) => ({ ...prev, panel: { ...prev.panel, model: e.target.value } }))
              }
            />
          </div>
        )}

        {/* Wattage */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-gray-500">Panel Wattage (W)</label>
          <input
            type="number"
            className="text-sm bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-amber-400"
            value={bom.panel.watts}
            onChange={(e) =>
              setBom((prev) => ({ ...prev, panel: { ...prev.panel, watts: Number(e.target.value) } }))
            }
          />
        </div>

        {/* Quantity */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-gray-500">
            Quantity
            <span className="text-gray-400 font-normal ml-1">(auto from sizing)</span>
          </label>
          <input
            type="number"
            className="text-sm bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-amber-400"
            value={qty}
            onChange={(e) =>
              setBom((prev) => ({ ...prev, panel: { ...prev.panel, qty: Number(e.target.value) } }))
            }
          />
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
              value={bom.panel.unitPrice || ""}
              onChange={(e) =>
                setBom((prev) => ({ ...prev, panel: { ...prev.panel, unitPrice: Number(e.target.value) } }))
              }
            />
          </div>
        </div>

      </div>

      {/* Total */}
      <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
        <div>
          <p className="text-xs text-gray-400">
            {qty} panels × ₦{(bom.panel.unitPrice || 0).toLocaleString()}
          </p>
          {bom.panel.search && (
            <p className="text-xs text-gray-500 font-medium mt-0.5">{bom.panel.search}</p>
          )}
        </div>
        <span className={`text-lg font-bold ${total > 0 ? "text-amber-600" : "text-gray-300"}`}>
          ₦{total.toLocaleString()}
        </span>
      </div>

    </div>
  );
}