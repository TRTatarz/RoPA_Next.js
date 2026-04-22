'use client';

import { useState, useEffect } from 'react';
import { LayoutDashboard, ShieldAlert, Building2, Layers } from 'lucide-react';

export function DpoDashboardTab({ onNavigateToRopa }: { onNavigateToRopa: (item: any) => void }) {
  const [ropaData, setRopaData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://ropa-backend-production-aaf0.up.railway.app";
  // 1. ดึงข้อมูลจริงจาก Backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}/api/ropa/`);
        const data = await response.json();
        setRopaData(data);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // 2. คำนวณตัวเลข Summary
  const totalRopa = ropaData.length;
  const highRiskCount = ropaData.filter(item => item.risk_level === 'High').length;
  // ดึงหมวดหมู่ข้อมูลที่ไม่ซ้ำกันมานับเป็นจำนวน Department เบื้องต้น
  const departmentCount = new Set(ropaData.map(item => item.data_category)).size;

  const SUMMARY = [
    { title: 'Total ROPA', value: totalRopa, icon: LayoutDashboard },
    { title: 'High Risk', value: highRiskCount, icon: ShieldAlert },
    { title: 'Categories', value: departmentCount, icon: Building2 },
    { title: 'Active Units', value: '1', icon: Layers }, // ปรับตาม Business Logic ของคุณ
  ];

  // 3. สรุปข้อมูลแยกตาม Category (Department Overview)
  const getDeptOverview = () => {
    const counts: any = {};
    ropaData.forEach(item => {
      const cat = item.data_category || 'Other';
      if (!counts[cat]) counts[cat] = { count: 0, highRisk: 0 };
      counts[cat].count++;
      if (item.risk_level === 'High') counts[cat].highRisk++;
    });
    return Object.keys(counts).map(key => ({
      name: key,
      count: counts[key].count,
      risk: counts[key].highRisk
    }));
  };

  const departments = getDeptOverview();

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-6xl mx-auto relative h-full flex flex-col">
      {/* Background Glow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-blue-600/10 blur-[120px]" />
        <div className="absolute top-[20%] -right-[10%] w-[30%] h-[30%] rounded-full bg-indigo-600/10 blur-[120px]" />
      </div>

      {/* Header Info */}
      <div className="flex flex-col gap-1 relative z-10">
        <h2 className="text-4xl font-bold text-white tracking-tight">Dashboard</h2>
        <p className="text-slate-500 text-base font-medium uppercase tracking-widest">Compliance Overview</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 xl:gap-8 relative z-10">
        {SUMMARY.map((s, i) => (
          <div key={i} className="bg-[#0b1429]/40 backdrop-blur-xl border border-slate-800/60 rounded-3xl p-8 shadow-2xl group hover:border-blue-500/30 transition-all">
            <h3 className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1 flex items-center gap-2">
               <s.icon size={14} className="text-blue-500" /> {s.title}
            </h3>
            <p className="text-4xl font-black text-white tracking-tighter">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start relative z-10 flex-1">
        
        {/* Left Column - Category Overview */}
        <div className="bg-[#0b1429]/30 backdrop-blur-xl border border-slate-800/60 rounded-4xl flex flex-col shadow-2xl overflow-hidden h-full">
          <div className="px-8 py-6 bg-slate-900/20 border-b border-slate-800/60">
            <h3 className="font-bold text-white text-[15px] tracking-wide">Data Category Overview</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-900/40 border-b border-slate-800/60">
                <tr>
                  <th className="py-5 px-8 text-[11px] font-black uppercase text-slate-600 tracking-[0.15em] border-r border-slate-800/60">Category</th>
                  <th className="py-5 px-8 text-[11px] font-black uppercase text-slate-600 tracking-[0.15em] border-r border-slate-800/60 text-center">Count</th>
                  <th className="py-5 px-8 text-[11px] font-black uppercase text-slate-600 tracking-[0.15em] text-center text-rose-500">High Risk</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/40">
                {departments.length > 0 ? departments.map((dept, i) => (
                  <tr key={i} className="hover:bg-slate-800/20 transition-colors">
                    <td className="px-8 py-5 border-r border-slate-800/60 font-bold text-white">{dept.name}</td>
                    <td className="px-8 py-5 border-r border-slate-800/60 text-center font-mono text-slate-400">{dept.count}</td>
                    <td className={`px-8 py-5 text-center font-mono ${dept.risk > 0 ? 'text-rose-400 font-bold' : 'text-slate-400'}`}>{dept.risk}</td>
                  </tr>
                )) : (
                   <tr><td colSpan={3} className="px-8 py-10 text-center text-slate-600">No data available</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column - Recent Activities */}
        <div className="bg-[#0b1429]/30 backdrop-blur-xl border border-slate-800/60 rounded-4xl flex flex-col shadow-2xl overflow-hidden h-full">
          <div className="px-8 py-6 bg-slate-900/20 border-b border-slate-800/60 flex justify-between items-center">
            <h3 className="font-bold text-white text-[15px] tracking-wide">Recent ROPA Records</h3>
            <button 
              onClick={onNavigateToRopa}
              className="bg-blue-600/10 hover:bg-blue-600/20 border border-blue-500/20 text-blue-400 px-4 py-2 rounded-xl transition-all text-[11px] font-bold uppercase tracking-widest"
            >
              View All
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-900/40 border-b border-slate-800/60">
                <tr>
                  <th className="py-5 px-6 text-[11px] font-black uppercase text-slate-600 tracking-[0.15em] border-r border-slate-800/60">Activity</th>
                  <th className="py-5 px-6 text-[11px] font-black uppercase text-slate-600 tracking-[0.15em] border-r border-slate-800/60 text-center">Risk</th>
                  <th className="py-5 px-6 text-[11px] font-black uppercase text-slate-600 tracking-[0.15em] text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/40">
                {ropaData.slice(0, 6).map((p, i) => (
                  <tr key={i} className="hover:bg-slate-800/20 transition-colors group">
                    <td className="px-6 py-5 border-r border-slate-800/60">
                       <p className="font-bold text-white leading-none mb-1">{p.processing_activity}</p>
                       <p className="text-[10px] text-slate-500 truncate max-w-[200px]">{p.controller_name}</p>
                    </td>
                    <td className="px-6 py-5 border-r border-slate-800/60 text-center">
                      <span className={`text-[10px] font-black px-2 py-1 rounded-md border ${
                        p.risk_level === 'High' ? 'bg-rose-500/10 border-rose-500/20 text-rose-500' : 
                        p.risk_level === 'Medium' ? 'bg-amber-500/10 border-amber-500/20 text-amber-500' : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500'
                      }`}>
                        {p.risk_level}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-center">
                       <button 
                         className="px-4 py-2 w-full bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-bold uppercase tracking-widest rounded-lg transition-all shadow-lg shadow-blue-900/20 active:scale-95 opacity-0 group-hover:opacity-100"
                         onClick={onNavigateToRopa}
                       >
                         Review
                       </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}