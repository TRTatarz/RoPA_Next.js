import { useState } from 'react';
import { Search, Filter, Plus, Edit2, Trash2, X } from 'lucide-react';

const USERS = [
  { id: 1, name: 'Username name', email: 'xxxx@xxxxx.com', phone: '012-345-6789', dept: '-', role: 'Admin', status: 'กำลังใช้งาน' },
  { id: 2, name: 'Username name', email: 'xxxx@xxxxx.com', phone: '012-345-6789', dept: 'xxxx', role: 'Supervisor', status: 'กำลังใช้งาน' },
  { id: 3, name: 'Username name', email: 'xxxx@xxxxx.com', phone: '012-345-6789', dept: '-', role: 'Viewer', status: '10 นาทีที่แล้ว' },
  { id: 4, name: 'Username name', email: 'xxxx@xxxxx.com', phone: '012-345-6789', dept: 'xxxx', role: 'User', status: '10 ชั่วโมงที่แล้ว' },
  { id: 5, name: 'Username name', email: 'xxxx@xxxxx.com', phone: '012-345-6789', dept: 'xxxx', role: 'User', status: '10 วันที่แล้ว' },
];

export function UsersTab() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add'|'edit'>('add');

  const openModal = (mode: 'add'|'edit') => {
    setModalMode(mode);
    setIsModalOpen(true);
  };
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col h-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight mb-2">User Management</h2>
          <p className="text-white/60 text-sm">Text</p>
        </div>
        <button onClick={() => openModal('add')} className="flex items-center gap-2 bg-gradient-to-r from-blue-500/80 to-indigo-500/80 hover:from-blue-500 hover:to-indigo-500 border border-blue-400/50 text-white px-5 py-2.5 rounded-xl transition-all font-medium text-sm shadow-[0_0_20px_rgba(59,130,246,0.3)] shrink-0">
          <Plus size={16} /> Add New User
        </button>
      </div>

      {/* Main Panel */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl flex flex-col shadow-2xl flex-1">
        
        {/* Toolbar */}
        <div className="p-6 border-b border-white/10 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={18} />
            <input 
              type="text" 
              placeholder="ค้นหา..." 
              className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent transition-all"
            />
          </div>
          <button className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 px-6 py-2.5 rounded-xl transition-colors text-sm w-full sm:w-auto text-white/80 shrink-0">
            <Filter size={16} /> All
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto p-0 flex-1">
          <table className="w-full text-left text-sm border-collapse min-w-[800px]">
            <thead className="bg-white/5">
              <tr>
                <th className="py-4 px-6 font-semibold text-white/50 border-b border-white/10">User</th>
                <th className="py-4 px-6 font-semibold text-white/50 border-b border-white/10">Contact</th>
                <th className="py-4 px-6 font-semibold text-white/50 border-b border-white/10">Department</th>
                <th className="py-4 px-6 font-semibold text-white/50 border-b border-white/10">Role</th>
                <th className="py-4 px-6 font-semibold text-white/50 border-b border-white/10">Status</th>
                <th className="py-4 px-6 font-semibold text-white/50 border-b border-white/10 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {USERS.map((u) => (
                <tr key={u.id} className="hover:bg-white/5 transition-colors group">
                  <td className="py-4 px-6">
                    <p className="font-semibold text-white/90">{u.name}</p>
                    <p className="text-xs text-white/50 mt-1">name</p>
                  </td>
                  <td className="py-4 px-6">
                    <p className="text-white/80">{u.email}</p>
                    <p className="text-xs text-white/50 mt-1">{u.phone}</p>
                  </td>
                  <td className="py-4 px-6 text-white/70">{u.dept}</td>
                  <td className="py-4 px-6 text-white/90 font-medium">{u.role}</td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1.5 rounded-full text-xs font-medium border ${u.status === 'กำลังใช้งาน' ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400' : 'border-white/10 bg-white/5 text-white/60'}`}>
                      {u.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right space-x-2 whitespace-nowrap">
                    <button onClick={() => openModal('edit')} className="text-white/40 hover:text-white bg-white/5 hover:bg-white/20 p-2 rounded-lg transition-colors border border-white/5">
                      <Edit2 size={16} />
                    </button>
                    <button className="text-white/40 hover:text-red-400 bg-white/5 hover:bg-red-500/20 p-2 rounded-lg transition-colors border border-white/5 text-center">
                      <Trash2 size={16} />
                    </button>
                  </td>
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

      {/* Adding/Editing User Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-[#091833] border border-white/20 rounded-[2rem] w-full max-w-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="p-8">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-bold text-white tracking-tight">
                  {modalMode === 'add' ? 'Add New User' : 'Edit User'}
                </h3>
                <button onClick={() => setIsModalOpen(false)} className="text-white/50 hover:text-white transition-colors bg-white/5 hover:bg-white/10 p-2 rounded-full">
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-sm text-white/80 font-medium pl-1">Username</label>
                    <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 text-white transition-all" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm text-white/80 font-medium pl-1">Password</label>
                    <input type="password" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 text-white transition-all" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm text-white/80 font-medium pl-1">Name</label>
                  <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 text-white transition-all" />
                </div>

                <div className="grid grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-sm text-white/80 font-medium pl-1">Email</label>
                    <input type="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 text-white transition-all" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm text-white/80 font-medium pl-1">Tel</label>
                    <input type="tel" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 text-white transition-all" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-sm text-white/80 font-medium pl-1">Role</label>
                    <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 text-white appearance-none transition-all">
                      <option value="admin" className="text-black">Admin</option>
                      <option value="supervisor" className="text-black">Supervisor</option>
                      <option value="user" className="text-black">User</option>
                      <option value="viewer" className="text-black">Viewer</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm text-white/80 font-medium pl-1">Department</label>
                    <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 text-white appearance-none transition-all">
                      <option value="it" className="text-black">IT</option>
                      <option value="hr" className="text-black">HR</option>
                      <option value="marketing" className="text-black">Marketing</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 mt-10 justify-center">
                <button onClick={() => setIsModalOpen(false)} className="px-10 py-3 rounded-full border border-white/20 text-white/80 hover:bg-white/5 transition-colors font-medium">
                  Cancel
                </button>
                <button onClick={() => setIsModalOpen(false)} className="px-10 py-3 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors font-medium">
                  {modalMode === 'add' ? 'Add User' : 'Save'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
