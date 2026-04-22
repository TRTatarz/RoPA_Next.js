'use client';

import { 
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip,
  BarChart, Bar, XAxis, YAxis, CartesianGrid 
} from 'recharts';

const SUMMARY = [
  { title: 'Total ROPA', value: '150' },
  { title: 'High Risk', value: '12' },
  { title: 'Medium Risk', value: '45' },
  { title: 'Low Risk', value: '93' },
  { title: 'Pending Review', value: '28' }
];

const pieData = [
  { name: 'High Risk', value: 12 },
  { name: 'Medium Risk', value: 45 },
  { name: 'Low Risk', value: 93 },
];
const PIE_COLORS = ['#fb923c', '#fbbf24', '#34d399']; // Using lighter/softer colors for the dark theme

const barData = [
  { name: 'Dept A', value: 40 },
  { name: 'Dept B', value: 30 },
  { name: 'Dept C', value: 55 },
  { name: 'Dept D', value: 20 },
  { name: 'Dept E', value: 45 },
];

export function ExecutiveDashboardContent() {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-6xl mx-auto relative h-full flex flex-col">
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-blue-600/10 blur-[120px]" />
        <div className="absolute top-[20%] -right-[10%] w-[30%] h-[30%] rounded-full bg-indigo-600/10 blur-[120px]" />
      </div>

      {/* Header Info */}
      <div className="flex flex-col gap-1 relative z-10">
        <h2 className="text-4xl font-bold text-white tracking-tight">Hello, CEO!</h2>
        <p className="text-slate-500 text-base font-medium">Organize overview</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 relative z-10">
        {SUMMARY.map((s, i) => (
          <div key={i} className="bg-[#0b1429]/40 backdrop-blur-xl border border-slate-800/60 rounded-[24px] p-6 shadow-2xl group hover:border-blue-500/30 transition-all flex flex-col justify-between">
            <h3 className="text-slate-500 text-[11px] font-bold uppercase tracking-widest mb-2 leading-tight">{s.title}</h3>
            <p className="text-3xl font-black text-white tracking-tighter">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Main Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10 flex-1">
        
        {/* Left Column */}
        <div className="space-y-8 flex flex-col">
          
          {/* Compliance Score */}
          <div className="bg-[#0b1429]/30 backdrop-blur-xl border border-slate-800/60 rounded-[32px] p-8 shadow-2xl">
            <h3 className="font-bold text-white text-[15px] tracking-wide mb-8">Compliance Score</h3>
            <div className="relative pt-1">
              <div className="flex mb-3 items-center justify-between">
                <div>
                  <span className="text-[10px] font-black inline-block py-1.5 px-3 uppercase rounded-full text-slate-300 bg-slate-800 tracking-wider w-16 text-center">
                    XXXX
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-black inline-block text-white">
                    85%
                  </span>
                </div>
              </div>
              <div className="overflow-hidden h-4 mb-4 text-xs flex rounded-full bg-slate-800/50 border border-slate-700/50">
                <div style={{ width: "85%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600"></div>
              </div>
            </div>
          </div>

          {/* Sensitive Data Mapping */}
          <div className="bg-[#0b1429]/30 backdrop-blur-xl border border-slate-800/60 rounded-[32px] p-8 shadow-2xl min-h-[350px] flex flex-col flex-1">
            <h3 className="font-bold text-white text-[15px] tracking-wide mb-8">Sensitive Data Mapping</h3>
            <div className="flex-1 w-full relative min-h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="rgba(255,255,255,0.5)" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                    contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
        </div>

        {/* Right Column */}
        <div className="space-y-8 flex flex-col">
          
          {/* Risk Level Distribution */}
          <div className="bg-[#0b1429]/30 backdrop-blur-xl border border-slate-800/60 rounded-[32px] p-8 shadow-2xl min-h-[300px] flex flex-col items-center flex-1">
            <div className="w-full">
               <h3 className="font-bold text-white text-[15px] tracking-wide pb-6 mb-2 border-b border-slate-800/60">Risk Level Distribution</h3>
            </div>
            <div className="flex-1 w-full relative min-h-[250px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={0}
                    outerRadius={100}
                    dataKey="value"
                    stroke="rgba(15, 23, 42, 0.5)"
                    strokeWidth={2}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }}
                    itemStyle={{ color: '#fff' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Status Overview */}
          <div className="bg-[#0b1429]/30 backdrop-blur-xl border border-slate-800/60 rounded-[32px] p-8 shadow-2xl flex items-center justify-between">
            <div>
              <h3 className="font-bold text-white text-[15px] tracking-wide mb-2">Status Overview</h3>
              <p className="text-slate-500 text-[11px] font-bold mt-4 uppercase tracking-widest">Pending Review</p>
            </div>
            <div className="text-right">
              <p className="text-5xl font-black text-white mt-2 tracking-tighter">28</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}