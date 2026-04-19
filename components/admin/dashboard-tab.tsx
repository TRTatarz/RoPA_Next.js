import { MoreHorizontal, Shield, Users } from 'lucide-react';

const SUMMARY = [
  { title: 'ผู้ใช้งานทั้งหมด', value: '0' },
  { title: 'Roles ทั้งหมด', value: '0' },
  { title: 'สิทธิ์เปิดใช้งาน', value: '0' }
];

const RECENT_USERS = [
  { id: 1, name: 'Username 1', role: 'Admin', status: 'กำลังใช้งาน' },
  { id: 2, name: 'Username 2', role: 'Supervisor', status: 'กำลังใช้งาน' },
  { id: 3, name: 'Username 3', role: 'Viewer', status: 'กำลังใช้งาน' },
  { id: 4, name: 'Username 4', role: 'User', status: '10 นาทีที่แล้ว' },
];

const ROLE_DIST = [
  { role: 'Admin', count: 12, pct: 10 },
  { role: 'Supervisor', count: 48, pct: 30 },
  { role: 'User', count: 1024, pct: 85 },
  { role: 'Viewer', count: 170, pct: 15 },
];

const RECENT_AUDITS = [
  { id: 1, action: 'เพิ่มข้อมูลผู้ใช้', by: 'By xxxx.xxx', time: '10 นาทีที่แล้ว' },
  { id: 2, action: 'แก้ไขสิทธิ์', by: 'By xxxx.xxx', time: '1 ชั่วโมงที่แล้ว' },
  { id: 3, action: 'ลบผู้ใช้', by: 'By xxxx.xxx', time: '3 ชั่วโมงที่แล้ว' },
  { id: 4, action: 'การเข้าสู่ระบบ', by: 'By xxxx.xxx', time: '5 ชั่วโมงที่แล้ว' },
];

export function DashboardTab() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-extrabold tracking-tight mb-2">Hello,</h2>
        <p className="text-white/60 text-sm">Text</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {SUMMARY.map((s, i) => (
          <div key={i} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl">
            <h3 className="text-white/60 text-sm font-medium mb-4">{s.title}</h3>
            <p className="text-4xl font-black">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* User Management Preview */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold tracking-tight">User Management</h3>
              <button className="text-xs bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition-colors border border-white/10">View All</button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr>
                    <th className="pb-4 font-semibold text-white/50 border-b border-white/10">User</th>
                    <th className="pb-4 font-semibold text-white/50 border-b border-white/10">Role</th>
                    <th className="pb-4 font-semibold text-white/50 border-b border-white/10">Status</th>
                    <th className="pb-4 font-semibold text-white/50 border-b border-white/10 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {RECENT_USERS.map((u) => (
                    <tr key={u.id} className="hover:bg-white/5 transition-colors group">
                      <td className="py-4 text-white/90 font-medium">{u.name}</td>
                      <td className="py-4 text-white/70">{u.role}</td>
                      <td className="py-4">
                        <span className={`px-3 py-1 rounded-full text-[11px] font-medium border ${u.status === 'กำลังใช้งาน' ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400' : 'border-white/10 bg-white/5 text-white/60'}`}>
                          {u.status}
                        </span>
                      </td>
                      <td className="py-4 text-right">
                        <button className="text-white/40 hover:text-white transition-colors p-2">
                          <MoreHorizontal size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Role Distribution */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl">
            <h3 className="text-xl font-bold tracking-tight mb-6">Role Distribution</h3>
            <div className="space-y-5">
              {ROLE_DIST.map((r, i) => (
                <div key={i}>
                  <div className="flex justify-between text-xs mb-2 text-white/80 font-medium">
                    <span>{r.role}</span>
                    <span>{r.count}</span>
                  </div>
                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                    <div className="h-full bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full" style={{ width: `${r.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Recent Audit Logs */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold tracking-tight">Recent Audit Logs</h3>
              <button className="text-xs bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition-colors border border-white/10">View All</button>
            </div>
            <div className="space-y-4">
              {RECENT_AUDITS.map((log) => (
                <div key={log.id} className="flex justify-between items-start pb-4 border-b border-white/5 last:border-0 last:pb-0">
                  <div>
                    <p className="text-sm font-medium text-white/90">{log.action}</p>
                    <p className="text-xs text-white/50 mt-1">{log.by}</p>
                  </div>
                  <span className="text-[10px] text-white/40 whitespace-nowrap">{log.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl">
            <h3 className="text-xl font-bold tracking-tight mb-6">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 hover:from-blue-500/30 hover:to-indigo-500/30 border border-blue-500/30 text-white px-4 py-3 rounded-xl transition-all font-medium text-sm">
                <Users size={16} /> Add New User
              </button>
              <button className="w-full flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white px-4 py-3 rounded-xl transition-all font-medium text-sm">
                <Shield size={16} /> Assign Role
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
