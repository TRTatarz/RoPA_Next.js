'use client';

import { MoreHorizontal, Shield, Users, Activity, UserPlus, Key, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';

export function DashboardTab() {
  const [stats, setStats] = useState({ total_users: 0, total_roles: 0, active_permissions: 18 });
  const [recentUsers, setRecentUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      const token = document.cookie.split('; ').find(row => row.startsWith('auth-token='))?.split('=')[1];
      
      try {
        const usersRes = await fetch('/api/users', { 
          headers: { 'Authorization': `Bearer ${token}` } 
        });

        if (usersRes.ok) {
          const usersData = await usersRes.json();
          setRecentUsers(usersData.slice(0, 5)); 
        
          setStats({
            total_users: usersData.length,
            total_roles: new Set(usersData.map((u: any) => u.role)).size,
            active_permissions: 18 
          });
        }
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // 1. Define these INSIDE the component so they can see the 'stats' and 'recentUsers' variables
  const summaryItems = [
    { title: 'ผู้ใช้งานทั้งหมด', value: stats.total_users.toLocaleString(), icon: <Users size={20} className="text-blue-400" /> },
    { title: 'Roles ทั้งหมด', value: stats.total_roles.toString(), icon: <Shield size={20} className="text-indigo-400" /> },
    { title: 'สิทธิ์เปิดใช้งาน', value: stats.active_permissions.toString(), icon: <Key size={20} className="text-emerald-400" /> }
  ];

  const roleDistribution = Array.from(new Set(recentUsers.map((u: any) => u.role))).map(roleName => {
    const count = recentUsers.filter((u: any) => u.role === roleName).length;
    const pct = recentUsers.length > 0 ? (count / recentUsers.length) * 100 : 0;
    return {
      role: roleName,
      count: count,
      pct: pct,
      color: roleName === 'ADMIN' ? 'bg-blue-500' : 'bg-emerald-500'
    };
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-40">
        <Loader2 className="animate-spin text-blue-500" size={48} />
      </div>
    );
  }

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-blue-600/10 blur-[120px]" />
        <div className="absolute top-[20%] -right-[10%] w-[30%] h-[30%] rounded-full bg-indigo-600/10 blur-[120px]" />
      </div>

      <div className="flex flex-col gap-1">
        <h2 className="text-4xl font-bold text-white tracking-tight">Dashboard</h2>
        <p className="text-slate-500 text-base font-medium">OVERVIEW OF ORGANIZATION AND SYSTEM ACTIVITY</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {summaryItems.map((s, i) => (
          <div key={i} className="bg-[#0b1429]/40 backdrop-blur-xl border border-slate-800/60 rounded-3xl p-8 shadow-2xl group hover:border-blue-500/30 transition-all">
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Recent Users Table */}
          <div className="bg-[#0b1429]/40 backdrop-blur-xl border border-slate-800/60 rounded-4xl p-8 shadow-2xl">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-bold text-white tracking-tight">Recent Active Users</h3>
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
                  {recentUsers.map((u: any) => (
                    <tr key={u.id} className="hover:bg-white/5 transition-colors group">
                      <td className="py-5 px-1">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center font-bold text-white text-xs border border-slate-700">
                            {u.username[0].toUpperCase()}
                          </div>
                          <div>
                            <p className="text-white font-bold">{u.username}</p>
                            <p className="text-[11px] text-slate-500 font-medium">{u.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-5 text-slate-400 font-bold">{u.role}</td>
                      <td className="py-5">
                        <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
                          Online
                        </span>
                      </td>
                      <td className="py-5 text-right">
                        <button className="text-slate-600 hover:text-white p-2">
                          <MoreHorizontal size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Role Distribution Chart */}
          <div className="bg-[#0b1429]/40 backdrop-blur-xl border border-slate-800/60 rounded-4xl p-8 shadow-2xl">
            <h3 className="text-xl font-bold text-white tracking-tight mb-8">Role Distribution</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
              {roleDistribution.map((r, i) => (
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

        {/* Right Column (Audit - Hardcoded for now until you have a backend endpoint) */}
        <div className="space-y-8">
          <div className="bg-[#0b1429]/40 backdrop-blur-xl border border-slate-800/60 rounded-4xl p-8 shadow-2xl">
            <h3 className="text-xl font-bold text-white tracking-tight mb-8">System Audit</h3>
            <div className="space-y-6">
              <div className="relative pl-6 border-l-2 border-slate-800 pb-6">
                <div className="absolute -left-2.25 top-0 w-4 h-4 bg-[#0b1429] border-2 border-blue-500 rounded-full" />
                <p className="text-sm font-bold text-white leading-tight">Syncing Database</p>
                <p className="text-[11px] text-slate-500 font-bold mt-1 uppercase tracking-tight">System</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}