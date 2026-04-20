'use client';

import { MoreHorizontal, Shield, Users, Activity, UserPlus, Key } from 'lucide-react';

const SUMMARY = [
  { title: 'ผู้ใช้งานทั้งหมด', value: '1,256', icon: <Users size={20} className="text-blue-400" /> },
  { title: 'Roles ทั้งหมด', value: '4', icon: <Shield size={20} className="text-indigo-400" /> },
  { title: 'สิทธิ์เปิดใช้งาน', value: '18', icon: <Key size={20} className="text-emerald-400" /> }
];

const RECENT_USERS = [
  { id: 1, name: 'admin', email: 'admin@example.com', role: 'Admin', status: 'กำลังใช้งาน', initial: 'A' },
  { id: 2, name: 'John Doe', email: 'john@example.com', role: 'Supervisor', status: 'กำลังใช้งาน', initial: 'J' },
  { id: 3, name: 'Sarah Smith', email: 'sarah@example.com', role: 'Viewer', status: 'กำลังใช้งาน', initial: 'S' },
  { id: 4, name: 'Username 4', email: 'user4@gmail.com', role: 'User', status: '10 นาทีที่แล้ว', initial: 'U' },
];

const ROLE_DIST = [
  { role: 'Admin', count: 12, pct: 10, color: 'bg-blue-500' },
  { role: 'Supervisor', count: 48, pct: 30, color: 'bg-indigo-500' },
  { role: 'User', count: 1024, pct: 85, color: 'bg-emerald-500' },
  { role: 'Viewer', count: 170, pct: 15, color: 'bg-slate-500' },
];

const RECENT_AUDITS = [
  { id: 1, action: 'เพิ่มข้อมูลผู้ใช้', by: 'By admin', time: '10 นาทีที่แล้ว' },
  { id: 2, action: 'แก้ไขสิทธิ์', by: 'By supervisor_1', time: '1 ชั่วโมงที่แล้ว' },
  { id: 3, action: 'ลบผู้ใช้', by: 'By admin', time: '3 ชั่วโมงที่แล้ว' },
  { id: 4, action: 'การเข้าสู่ระบบ', by: 'By user_04', time: '5 ชั่วโมงที่แล้ว' },
];

export function DashboardTab() {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-blue-600/10 blur-[120px]" />
        <div className="absolute top-[20%] -right-[10%] w-[30%] h-[30%] rounded-full bg-indigo-600/10 blur-[120px]" />
      </div>
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h2 className="text-4xl font-bold text-white tracking-tight">Dashboard</h2>
        <p className="text-slate-500 text-base font-medium">Overview of your organization and system activity.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {SUMMARY.map((s, i) => (
          <div key={i} className="bg-[#0b1429]/40 backdrop-blur-xl border border-slate-800/60 rounded-[24px] p-8 shadow-2xl group hover:border-blue-500/30 transition-all">
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-slate-800/50 rounded-2xl group-hover:bg-blue-500/10 transition-colors">
                {s.icon}
              </div>
              <Activity size={16} className="text-slate-700 group-hover:text-blue-500/50 transition-colors" />
            </div>
            <h3 className="text-slate-500 text-sm font-bold uppercase tracking-widest mb-1">{s.title}</h3>
            <p className="text-4xl font-black text-white tracking-tighter">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Recent Users Section */}
          <div className="bg-[#0b1429]/40 backdrop-blur-xl border border-slate-800/60 rounded-[32px] p-8 shadow-2xl">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-bold text-white tracking-tight">Recent Active Users</h3>
              <button className="text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors tracking-widest uppercase">View Directory</button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="text-slate-600 border-b border-slate-800/50">
                    <th className="pb-4 font-black uppercase tracking-widest text-[10px]">Identity</th>
                    <th className="pb-4 font-black uppercase tracking-widest text-[10px]">Role</th>
                    <th className="pb-4 font-black uppercase tracking-widest text-[10px]">Status</th>
                    <th className="pb-4 font-black uppercase tracking-widest text-[10px] text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/30">
                  {RECENT_USERS.map((u) => (
                    <tr key={u.id} className="hover:bg-white/5 transition-colors group">
                      <td className="py-5 px-1">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center font-bold text-white text-xs border border-slate-700">
                            {u.initial}
                          </div>
                          <div>
                            <p className="text-white font-bold">{u.name}</p>
                            <p className="text-[11px] text-slate-500 font-medium">{u.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-5 text-slate-400 font-bold">{u.role}</td>
                      <td className="py-5">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${u.status === 'กำลังใช้งาน' ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400' : 'border-slate-800 bg-slate-900 text-slate-500'}`}>
                          {u.status}
                        </span>
                      </td>
                      <td className="py-5 text-right">
                        <button className="text-slate-600 hover:text-white transition-colors p-2">
                          <MoreHorizontal size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Role Distribution Chart (Minimalist) */}
          <div className="bg-[#0b1429]/40 backdrop-blur-xl border border-slate-800/60 rounded-[32px] p-8 shadow-2xl">
            <h3 className="text-xl font-bold text-white tracking-tight mb-8">Role Distribution</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
              {ROLE_DIST.map((r, i) => (
                <div key={i} className="space-y-3">
                  <div className="flex justify-between items-end">
                    <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">{r.role}</span>
                    <span className="text-lg font-black text-white">{r.count}</span>
                  </div>
                  <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden border border-slate-700/50">
                    <div className={`h-full ${r.color} rounded-full`} style={{ width: `${r.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Recent Audit Logs */}
          <div className="bg-[#0b1429]/40 backdrop-blur-xl border border-slate-800/60 rounded-[32px] p-8 shadow-2xl">
            <h3 className="text-xl font-bold text-white tracking-tight mb-8">System Audit</h3>
            <div className="space-y-6">
              {RECENT_AUDITS.map((log) => (
                <div key={log.id} className="relative pl-6 border-l-2 border-slate-800 last:border-0 pb-6 last:pb-0">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 bg-[#0b1429] border-2 border-blue-500 rounded-full" />
                  <p className="text-sm font-bold text-white leading-tight">{log.action}</p>
                  <p className="text-[11px] text-slate-500 font-bold mt-1 uppercase tracking-tight">{log.by}</p>
                  <p className="text-[10px] text-slate-600 mt-2 font-medium">{log.time}</p>
                </div>
              ))}
            </div>
            <button className="w-full mt-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-slate-500 hover:text-white border border-slate-800 rounded-2xl hover:bg-white/5 transition-all">
              Full Activity Log
            </button>
          </div>

          {/* Quick Actions */}
          <div className="bg-[#2563eb] rounded-[32px] p-8 shadow-[0_20px_50px_rgba(37,99,235,0.3)] text-white relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 w-32 h-32 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all" />
            <h3 className="text-xl font-bold tracking-tight mb-6 relative z-10">Administrative Actions</h3>
            <div className="space-y-3 relative z-10">
              <button className="w-full flex items-center gap-3 bg-white text-blue-600 px-5 py-4 rounded-2xl transition-all font-bold text-sm shadow-xl active:scale-95">
                <UserPlus size={18} /> Add New Identity
              </button>
              <button className="w-full flex items-center gap-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-5 py-4 rounded-2xl transition-all font-bold text-sm active:scale-95">
                <Shield size={18} /> Manage Permissions
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}