import { PieChart, Pie, Label } from 'recharts';
import { RechartsDevtools } from '@recharts/devtools';

// #region Sample data
const data = [
  { name: 'Group A', value: 300, fill: '#0088FE' },
  { name: 'Group B', value: 400, fill: '#00C49F' },
  { name: 'Group C', value: 220, fill: '#FFBB28' },
  { name: 'Group D', value: 80, fill: '#FF8042' },
];

// #endregion
const MyPie = () => (
  <Pie data={data} dataKey="value" nameKey="name" outerRadius="40%" innerRadius="20%" isAnimationActive={false} />
);

export default function PieChartInGrid() {
  return (
    <div className="w-150 h-80 mt-4 mx-4 max-w-5xl p-6 bg-white rounded-2xl shadow-sm" >
      
       <h2 className="text-xl font-bold text-gray-800">Project Status</h2>


       {/* For The Full Contents */}

      <div className='flex justify-between'>

        <PieChart width={200} height={200} className="justify-center items-center my-6">
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={100}
            innerRadius={50}
            isAnimationActive={false}
          >
            <Label
              position="center"
              content={(props) => {
                const { cx = 100, cy = 100 } = props;

                return (
                  <text
                    x={cx}
                    y={cy}
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    <tspan
                      x={cx}
                      dy="-10"
                      fontSize="20"
                      fontWeight="500"
                      fill="#111"
                    >
                      24
                    </tspan>

                    <tspan
                      x={cx}
                      dy="24"
                      fontSize="12"
                      fill="#666"
                    >
                      Total Projects
                    </tspan>
                  </text>
                );
              }}
            />
          </Pie>
        </PieChart>
        
        <div className='flex flex-col gap-8 py-10'>


         <div className='flex items-center gap-2'>
          <div className='h-2.5 w-2.5 bg-emerald-500 shrink-0'></div>
           <p className='font-semibold text-xs leading-none -translate-y-px'>Completed</p>
         </div>
         

          <div className='flex items-center gap-2'>
          <div className='h-2.5 w-2.5 bg-blue-500 shrink-0'></div>
           <p className='font-semibold text-xs leading-none -translate-y-px'>In Progress</p>
         </div>

         <div className='flex items-center gap-2'>
          <div className='h-2.5 w-2.5 bg-amber-500 shrink-0'></div>
           <p className='font-semibold text-xs leading-none -translate-y-px'>Proposal</p>
         </div>

         <div className='flex items-center gap-2'>
          <div className='h-2.5 w-2.5 bg-purple-500 shrink-0'></div>
           <p className='font-semibold text-xs leading-none -translate-y-px'>On Hold</p>
         </div>

        </div>
         
         <div className='flex flex-col gap-4 py-10'>
          
          <div className='flex items-center gap-2'>
            <p>10</p>
            <p>(41.7%)</p>
          </div>
          
          <div className='flex items-center gap-2'>
            <p>8</p>
            <p>(33.3%)</p>
          </div>
          
          <div className='flex items-center gap-2'>
            <p>4</p>
            <p>(16.7%)</p>
          </div>
          
          <div className='flex items-center gap-2'>
            <p>2</p>
            <p>(8.3%)</p>
          </div>
          
         </div>


      </div>


    </div>
  
  );
}