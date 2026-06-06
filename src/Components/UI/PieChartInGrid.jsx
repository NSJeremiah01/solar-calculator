import { PieChart, Pie, Cell, Label } from 'recharts';

const data = [
  { name: 'Completed',   value: 10, color: '#10b981' },
  { name: 'In Progress', value: 8,  color: '#3b82f6' },
  { name: 'Proposal',    value: 4,  color: '#f59e0b' },
  { name: 'On Hold',     value: 2,  color: '#a855f7' },
];

const total = data.reduce((sum, d) => sum + d.value, 0);

export default function PieChartInGrid() {
  return (
    <div className="w-full p-5 mt-4 bg-white rounded-2xl shadow-sm">
      
      <h2 className="text-xl font-bold text-gray-800 mb-4">Project Status</h2>

      {/* Chart and Legend side by side */}
      <div className="flex flex-row items-center gap-4 ">

        {/* LEFT — Pie Chart */}
        <PieChart width={160} height={160} style={{outline:"none"}} accessibilityLayer={false}>
          <Pie
            data={data}
            dataKey="value"
            outerRadius={75}
            innerRadius={45}
            isAnimationActive={false}
          className="focus:outline-none"
          >
            {data.map((entry) => (
              <Cell key={entry.name} fill={entry.color} />
            ))}
            <Label
              position="center"
              content={(props) => {
                const { cx = 80, cy = 80 } = props;
                return (
                  <text x={cx} y={cy} textAnchor="middle" dominantBaseline="middle">
                    <tspan x={cx} dy="-8" fontSize="18" fontWeight="700" fill="#111">24</tspan>
                    <tspan x={cx} dy="18" fontSize="10" fill="#999">Total Projects</tspan>
                  </text>
                );
              }}
            />
          </Pie>
        </PieChart>

        {/* RIGHT — Legend */}
        <div className="flex flex-col gap-3 flex-1">
          {data.map((entry) => (
            <div key={entry.name} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-2.5 w-2.5 rounded-sm shrink-0" style={{ backgroundColor: entry.color }}></div>
                <p className="text-xs text-gray-600">{entry.name}</p>
              </div>
              <div className="flex items-center gap-1 text-xs">
                <span className="font-semibold text-gray-800">{entry.value}</span>
                <span className="text-gray-400">({Math.round(entry.value / total * 100)}%)</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}