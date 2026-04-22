'use client';

import { useState, useEffect } from 'react';
import { Eye, Search, FileSpreadsheet } from 'lucide-react';

interface RopaListProps {
  onReview: (item: any) => void;
}

export function RopaList({ onReview }: RopaListProps) {
  const [records, setRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/ropa/');
        const data = await response.json();
        setRecords(data);
      } catch (error) {
        console.error("Failed to fetch ROPA records:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRecords();
  }, []);

  const filteredRecords = records.filter(record => 
    record.processing_activity?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.controller_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-6xl mx-auto relative z-10">
      
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-4xl font-bold text-white tracking-tight flex items-center gap-3">
            <FileSpreadsheet className="text-blue-500" size={32} />
            ROPA Inventory
          </h2>
          <p className="text-slate-500 text-base font-medium uppercase tracking-widest">
            Record of Processing Activities
          </p>
        </div>

        <div className="relative w-full md:w-72">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
          <input 
            type="text"
            placeholder="Search activities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#0b1429]/60 border border-slate-800/60 rounded-2xl py-3 pl-12 pr-4 text-sm text-white focus:ring-2 focus:ring-blue-500/50 outline-none transition-all"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#0b1429]/30 backdrop-blur-xl border border-slate-800/60 rounded-4xl shadow-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-900/40 border-b border-slate-800/60">
              <tr>
                <th className="py-5 px-8 text-[11px] font-black uppercase text-slate-600 tracking-[0.15em] border-r border-slate-800/60">Activity</th>
                <th className="py-5 px-8 text-[11px] font-black uppercase text-slate-600 tracking-[0.15em] border-r border-slate-800/60">Controller</th>
                <th className="py-5 px-8 text-[11px] font-black uppercase text-slate-600 tracking-[0.15em] text-center border-r border-slate-800/60">Risk</th>
                <th className="py-5 px-8 text-[11px] font-black uppercase text-slate-600 tracking-[0.15em] text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/40">
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-8 py-20 text-center text-slate-500 animate-pulse font-bold uppercase tracking-widest">
                    Loading Records...
                  </td>
                </tr>
              ) : filteredRecords.length > 0 ? (
                filteredRecords.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-800/20 transition-colors group">
                    <td className="px-8 py-5 border-r border-slate-800/60 font-bold text-white">
                      {item.processing_activity}
                    </td>
                    <td className="px-8 py-5 border-r border-slate-800/60 text-slate-400">
                      {item.controller_name}
                    </td>
                    <td className="px-8 py-5 border-r border-slate-800/60 text-center">
                      <span className={`px-3 py-1 rounded-lg text-[10px] font-black border ${
                        item.risk_level === 'High' 
                        ? 'bg-rose-500/10 border-rose-500/20 text-rose-500' 
                        : item.risk_level === 'Medium'
                        ? 'bg-amber-500/10 border-amber-500/20 text-amber-500'
                        : 'bg-blue-500/10 border-blue-500/20 text-blue-400'
                      }`}>
                        {item.risk_level || 'Low'}
                      </span>
                    </td>
                    <td className="px-8 py-3 text-center">
                      <button
                        onClick={() => onReview(item)}
                        className="inline-flex items-center justify-center p-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-all shadow-lg shadow-blue-900/20 active:scale-95"
                        title="Review details"
                      >
                        <Eye size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-8 py-20 text-center text-slate-600 font-bold uppercase tracking-widest">
                    No matching records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}