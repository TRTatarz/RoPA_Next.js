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
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 h-full flex flex-col">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-extrabold tracking-tight mb-2">Audit Logs</h2>
        <p className="text-white/60 text-sm">ตรวจสอบย้อนหลังระดับองค์กรสำหรับการเปลี่ยนแปลงสิทธิ์ และการจัดการผู้ใช้</p>
      </div>

      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl flex flex-col shadow-2xl flex-1">
        {/* Filters Row */}
        <div className="p-6 border-b border-white/10 flex flex-wrap gap-4 items-center justify-between">
          
          <div className="flex flex-wrap gap-3">
            <button className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-xl transition-colors text-sm text-white/80">
              <Calendar size={16} /> Select Date <span className="opacity-50 ml-2">▼</span>
            </button>
            <button className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-xl transition-colors text-sm text-white/80">
              <UserCog size={16} /> Action <span className="opacity-50 ml-2">▼</span>
            </button>
            <button className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-xl transition-colors text-sm text-white/80">
              <Filter size={16} /> All
            </button>
          </div>

          <button className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/20 px-4 py-2 rounded-xl transition-colors text-sm text-white font-medium shrink-0">
            <Download size={16} /> Export Audit Log
          </button>
        </div>

        {/* Search Bar */}
        <div className="px-6 pt-6 pb-2">
           <div className="relative w-full max-w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={18} />
            <input 
              type="text" 
              placeholder="ค้นหา..." 
              className="w-full bg-white/10 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:bg-white/15 transition-all"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto p-0 flex-1 mt-4">
          <table className="w-full text-left text-sm border-collapse min-w-[800px]">
            <thead className="bg-white/5">
              <tr>
                <th className="py-4 px-6 font-semibold text-white/50 border-b border-white/10 w-16">No.</th>
                <th className="py-4 px-6 font-semibold text-white/50 border-b border-white/10">User</th>
                <th className="py-4 px-6 font-semibold text-white/50 border-b border-white/10">Action</th>
                <th className="py-4 px-6 font-semibold text-white/50 border-b border-white/10">Target</th>
                <th className="py-4 px-6 font-semibold text-white/50 border-b border-white/10">เหตุผล</th>
                <th className="py-4 px-6 font-semibold text-white/50 border-b border-white/10 text-right">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {LOGS.map((log) => (
                <tr key={log.id} className="hover:bg-white/5 transition-colors group">
                  <td className="py-4 px-6 text-white/50">{log.id}</td>
                  <td className="py-4 px-6 font-medium text-white/90">{log.user}</td>
                  <td className="py-4 px-6 text-indigo-300 font-medium">{log.action}</td>
                  <td className="py-4 px-6 text-white/70">{log.target}</td>
                  <td className="py-4 px-6 text-white/50 text-xs">{log.reason}</td>
                  <td className="py-4 px-6 text-right text-white/60 font-mono text-xs">{log.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Toolbar */}
        <div className="p-4 border-t border-white/10 flex items-center justify-between text-xs text-white/50 mt-auto bg-white/5 rounded-b-2xl">
          <p>แสดง 5 จาก 1,250</p>
          <div className="flex items-center gap-1">
            <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-white/10 transition-colors">&lt;</button>
            <button className="w-8 h-8 flex items-center justify-center rounded bg-indigo-500 text-white font-medium shadow-md">1</button>
            <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-white/10 transition-colors">2</button>
            <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-white/10 transition-colors">3</button>
            <span className="w-8 h-8 flex items-center justify-center">...</span>
            <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-white/10 transition-colors">250</button>
            <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-white/10 transition-colors">&gt;</button>
          </div>
        </div>

      </div>
    </div>
  );
}
