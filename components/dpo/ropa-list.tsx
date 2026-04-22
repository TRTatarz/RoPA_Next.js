'use client';

import { useState, useEffect, useMemo } from 'react';
import { Eye, Search, Inbox, CheckCircle2, Clock, Trash2 } from 'lucide-react';

interface RopaListProps {
  onReview: (item: any) => void;
}

export function RopaList({ onReview }: RopaListProps) {
  const [records, setRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'ongoing' | 'completed'>('ongoing');

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://ropa-backend-production-aaf0.up.railway.app";

  const fetchRecords = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/ropa/`);
      const data = await response.json();
      setRecords(data);
    } catch (error) {
      console.error("Failed to fetch ROPA records:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm("Are you sure you want to delete this ROPA record? This action cannot be undone.");
    
    if (confirmed) {
      try {
        const response = await fetch(`${API_URL}/api/ropa/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          fetchRecords();
        } else {
          alert("Failed to delete the record.");
        }
      } catch (error) {
        console.error("Delete error:", error);
        alert("An error occurred while trying to delete.");
      }
    }
  };

  const displayedRecords = useMemo(() => {
    return records.filter(record => {
      const matchesSearch = 
        record.processing_activity?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.controller_name?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const isCompleted = record.status?.toLowerCase() === 'completed';
      
      if (activeTab === 'ongoing') {
        return matchesSearch && !isCompleted;
      }
      return matchesSearch && isCompleted;
    });
  }, [records, searchTerm, activeTab]);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-6xl mx-auto relative z-10">
      {/* Background Glow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-blue-600/10 blur-[120px]" />
        <div className="absolute top-[20%] -right-[10%] w-[30%] h-[30%] rounded-full bg-indigo-600/10 blur-[120px]" />
      </div>
      
      {/* Header & Tabs */}
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex flex-col gap-1">
            <h2 className="text-4xl font-bold text-white tracking-tight">ROPA Inventory</h2>
            <p className="text-slate-500 text-base font-medium uppercase tracking-widest">
              {activeTab === 'ongoing' ? 'Active Records' : 'Archived Records'}
            </p>
          </div>

          <div className="relative w-full md:w-72">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input 
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#0b1429]/60 border border-slate-800/60 rounded-2xl py-3 pl-12 pr-4 text-sm text-white focus:ring-2 focus:ring-blue-500/50 outline-none transition-all"
            />
          </div>
        </div>

        <div className="flex p-1 bg-slate-900/50 border border-slate-800/60 rounded-2xl w-fit">
          <button
            onClick={() => setActiveTab('ongoing')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
              activeTab === 'ongoing' 
              ? 'bg-blue-600 text-white shadow-lg' 
              : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Clock size={16} />
            Ongoing
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
              activeTab === 'completed' 
              ? 'bg-emerald-600 text-white shadow-lg' 
              : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <CheckCircle2 size={16} />
            Completed
          </button>
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
                <th className="py-5 px-8 text-[11px] font-black uppercase text-slate-600 tracking-[0.15em] text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/40">
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-8 py-20 text-center text-slate-500 animate-pulse font-bold uppercase tracking-widest">
                    Loading Records...
                  </td>
                </tr>
              ) : displayedRecords.length > 0 ? (
                displayedRecords.map((item) => (
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
                      <div className="flex items-center justify-center gap-2">
                        {/* Review Button */}
                        <button
                          onClick={() => onReview(item)}
                          className={`inline-flex items-center justify-center p-2.5 rounded-xl transition-all shadow-lg active:scale-95 text-white ${
                              activeTab === 'completed' ? 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-900/20' : 'bg-blue-600 hover:bg-blue-500 shadow-blue-900/20'
                          }`}
                          title="Review Record"
                        >
                          <Eye size={18} />
                        </button>
                        
                        {/* Delete Button */}
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="inline-flex items-center justify-center p-2.5 bg-rose-600/10 hover:bg-rose-600 text-rose-500 hover:text-white border border-rose-500/20 rounded-xl transition-all shadow-lg active:scale-95"
                          title="Delete Record"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-8 py-20 text-center text-slate-600 font-bold uppercase tracking-widest">
                    <div className="flex flex-col items-center gap-3">
                        <Inbox size={40} className="opacity-20" />
                        <span>No {activeTab} records found</span>
                    </div>
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