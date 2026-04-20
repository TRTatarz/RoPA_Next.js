'use client';

import { Search, Download, Calendar, Filter, UserCog } from 'lucide-react';

const LOGS = [
  { id: 1, user: 'Username', action: 'Assign Role', target: 'User 1', reason: '-', time: '2026-01-01 10:00 AM' },
  { id: 2, user: 'Username', action: 'Edit Role', target: 'User 2', reason: '-', time: '2026-01-01 10:00 AM' },
  { id: 3, user: 'Username', action: 'Delete xxx', target: 'xxx', reason: 'xxxxxxxxx', time: '2026-01-01 10:00 AM' },
  { id: 4, user: 'Username', action: 'Delete User', target: 'xxx', reason: 'xxxxxx', time: '2026-01-01 10:00 AM' },
  { id: 5, user: 'Username', action: 'Add New User', target: 'xxx', reason: '-', time: '2026-01-01 10:00 AM' },
];

export function AuditTab() {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 h-full flex flex-col max-w-6xl mx-auto">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-blue-600/10 blur-[120px]" />
        <div className="absolute top-[20%] -right-[10%] w-[30%] h-[30%] rounded-full bg-indigo-600/10 blur-[120px]" />
      </div>
      {/* Header */}
      <div>
        <h2 className="text-4xl font-bold text-white tracking-tight">Audit Logs</h2>
        <p className="text-slate-500 mt-2 text-base font-medium">ตรวจสอบย้อนหลังระดับองค์กรสำหรับการเปลี่ยนแปลงสิทธิ์ และการจัดการผู้ใช้</p>
      </div>

      <div className="bg-[#0b1429]/30 backdrop-blur-xl border border-slate-800/60 rounded-[32px] flex flex-col shadow-2xl flex-1 overflow-hidden">
        {/* Filters Row */}
        <div className="p-8 border-b border-slate-800/60 flex flex-wrap gap-4 items-center justify-between bg-slate-900/20">

          <div className="flex flex-wrap gap-3">
            <button className="flex items-center gap-2 bg-slate-800/50 hover:bg-slate-700 border border-slate-700/50 px-5 py-2.5 rounded-xl transition-all text-xs font-bold text-slate-300 uppercase tracking-widest">
              <Calendar size={14} className="text-blue-400" /> Select Date <span className="opacity-30 ml-2">▼</span>
            </button>
            <button className="flex items-center gap-2 bg-slate-800/50 hover:bg-slate-700 border border-slate-700/50 px-5 py-2.5 rounded-xl transition-all text-xs font-bold text-slate-300 uppercase tracking-widest">
              <UserCog size={14} className="text-indigo-400" /> Action <span className="opacity-30 ml-2">▼</span>
            </button>
            <button className="flex items-center gap-2 bg-slate-800/50 hover:bg-slate-700 border border-slate-700/50 px-5 py-2.5 rounded-xl transition-all text-xs font-bold text-slate-300 uppercase tracking-widest">
              <Filter size={14} className="text-emerald-400" /> All
            </button>
          </div>

          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 px-6 py-2.5 rounded-full transition-all text-xs text-white font-bold shadow-lg shadow-blue-900/20 active:scale-95">
            <Download size={16} /> Export Audit Log
          </button>
        </div>

        {/* Search Bar */}
        <div className="px-8 pt-8 pb-2">
          <div className="relative w-full max-w-full group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors" size={18} />
            <input
              type="text"
              placeholder="ค้นหา..."
              className="w-full bg-slate-900/40 border border-slate-800 rounded-xl py-3.5 pl-12 pr-4 text-sm text-slate-200 placeholder:text-slate-600 outline-none focus:ring-1 ring-blue-500/50 transition-all"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto p-0 flex-1 mt-4">
          <table className="w-full text-left text-sm border-collapse min-w-[800px]">
            <thead className="bg-slate-900/40 border-b border-slate-800/60">
              <tr>
                <th className="py-5 px-8 text-[11px] font-black uppercase text-slate-600 tracking-[0.15em] w-20">No.</th>
                <th className="py-5 px-8 text-[11px] font-black uppercase text-slate-600 tracking-[0.15em]">User</th>
                <th className="py-5 px-8 text-[11px] font-black uppercase text-slate-600 tracking-[0.15em]">Action</th>
                <th className="py-5 px-8 text-[11px] font-black uppercase text-slate-600 tracking-[0.15em]">Target</th>
                <th className="py-5 px-8 text-[11px] font-black uppercase text-slate-600 tracking-[0.15em]">เหตุผล</th>
                <th className="py-5 px-8 text-[11px] font-black uppercase text-slate-600 tracking-[0.15em] text-right">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/40">
              {LOGS.map((log) => (
                <tr key={log.id} className="hover:bg-slate-800/20 transition-colors group">
                  <td className="py-5 px-8 text-slate-600 font-bold">{log.id}</td>
                  <td className="py-5 px-8 font-bold text-white">{log.user}</td>
                  <td className="py-5 px-8">
                    <span className="text-blue-400 font-bold px-2 py-1 rounded bg-blue-500/5 border border-blue-500/10 text-[13px]">
                      {log.action}
                    </span>
                  </td>
                  <td className="py-5 px-8 text-slate-300 font-medium">{log.target}</td>
                  <td className="py-5 px-8 text-slate-500 italic text-xs">{log.reason}</td>
                  <td className="py-5 px-8 text-right text-slate-400 font-mono text-[11px] tracking-tighter">{log.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Toolbar */}
        <div className="p-6 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-500 mt-auto bg-slate-900/30 rounded-b-[32px] font-bold uppercase tracking-widest">
          <p>แสดง 5 จาก 1,250</p>
          <div className="flex items-center gap-2">
            <button className="w-9 h-9 flex items-center justify-center rounded-xl border border-slate-800 hover:bg-slate-800 transition-all text-slate-400">&lt;</button>
            <button className="w-9 h-9 flex items-center justify-center rounded-xl bg-blue-600 text-white font-black shadow-lg shadow-blue-900/20">1</button>
            <button className="w-9 h-9 flex items-center justify-center rounded-xl border border-slate-800 hover:bg-slate-800 transition-all">2</button>
            <button className="w-9 h-9 flex items-center justify-center rounded-xl border border-slate-800 hover:bg-slate-800 transition-all">3</button>
            <span className="px-1 opacity-30 text-lg">...</span>
            <button className="w-9 h-9 flex items-center justify-center rounded-xl border border-slate-800 hover:bg-slate-800 transition-all">250</button>
            <button className="w-9 h-9 flex items-center justify-center rounded-xl border border-slate-800 hover:bg-slate-800 transition-all text-slate-400">&gt;</button>
          </div>
        </div>

      </div>
    </div>
  );
}