'use client';

import { useState, useEffect } from 'react';
import { 
  UserPlus, Trash2, Loader2, X, Building2, Search, MoreVertical, Mail, Lock 
} from 'lucide-react';

export function UsersTab() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const [formData, setFormData] = useState({
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    role: 'USER',
    department: 'IT'
  });

  const getToken = () => {
    if (typeof document === 'undefined') return null;
    return document.cookie
      .split('; ')
      .find(row => row.startsWith('auth-token='))
      ?.split('=')[1];
  };

  const fetchUsers = async () => {
    const token = getToken();
    if (!token) return;
    setIsLoading(true);
    try {
      const response = await fetch('/api/users', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = getToken();
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify(formData)
    });

    if (response.ok) {
      setIsModalOpen(false);
      setFormData({ username: '', first_name: '', last_name: '', email: '', password: '', role: 'USER', department: 'IT' });
      fetchUsers();
    }
  };

  return (
    <div className="text-slate-300 selection:bg-blue-500/30 h-full flex flex-col">
      
      {/* RESTORED: Background Decorative Glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-blue-600/10 blur-[120px]" />
        <div className="absolute top-[20%] -right-[10%] w-[30%] h-[30%] rounded-full bg-indigo-600/10 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto w-full pt-4">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-bold text-white tracking-tight">User Management</h1>
            <p className="text-slate-500 mt-2 text-sm font-medium">Manage organization identities and permission levels.</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors" size={16} />
              <input 
                type="text"
                placeholder="Search users..."
                className="bg-slate-900/50 border border-slate-800 rounded-full py-2.5 pl-12 pr-4 text-sm outline-none focus:ring-1 ring-blue-500/50 w-72 transition-all"
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 transition-all active:scale-95 shadow-lg shadow-blue-600/20"
            >
              <UserPlus size={18} /> Create Account
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-[#0b1429]/30 border border-slate-800/60 rounded-[24px] overflow-hidden shadow-2xl backdrop-blur-xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900/30 border-b border-slate-800/60">
                <th className="px-8 py-5 text-[11px] font-black uppercase text-slate-600 tracking-[0.15em]">Identity</th>
                <th className="px-8 py-5 text-[11px] font-black uppercase text-slate-600 tracking-[0.15em]">Permissions</th>
                <th className="px-8 py-5 text-[11px] font-black uppercase text-slate-600 tracking-[0.15em] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/40">
              {isLoading ? (
                <tr><td colSpan={3} className="py-20 text-center"><Loader2 className="animate-spin inline text-blue-500" /></td></tr>
              ) : users.length === 0 ? (
                <tr><td colSpan={3} className="py-20 text-center text-slate-500">No users found.</td></tr>
              ) : users.map((u: any) => (
                <tr key={u.id} className="group hover:bg-slate-800/20 transition-colors">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className="w-12 h-12 rounded-full bg-[#1e293b] border border-slate-700/50 flex items-center justify-center font-bold text-white text-lg shadow-inner">
                          {u.username[0].toUpperCase()}
                        </div>
                        <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-[#22c55e] border-[3px] border-[#0b1429] rounded-full shadow-lg"></div>
                      </div>
                      <div>
                        <div className="text-base font-bold text-white leading-tight">{u.username}</div>
                        <div className="text-xs text-slate-500 font-medium mt-0.5">{u.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex flex-col gap-2">
                      <span className="w-fit px-2.5 py-1 rounded-md text-[10px] font-black bg-[#1e293b] text-[#3b82f6] border border-blue-500/20 uppercase tracking-wider">{u.role}</span>
                      <span className="text-[11px] text-slate-500 font-bold flex items-center gap-1.5 uppercase tracking-wide">
                        <Building2 size={12} className="text-slate-600" /> {u.department || 'General'}
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-3 text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 hover:text-white transition-colors"><MoreVertical size={20} /></button>
                      <button className="p-2 hover:text-red-400 transition-colors"><Trash2 size={20} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setIsModalOpen(false)} />
            <div className="relative bg-[#0f172a] border border-slate-800 w-full max-w-lg rounded-[32px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
              <div className="p-8 border-b border-slate-800 bg-slate-900/20">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold text-white tracking-tight">New Account</h3>
                  <button onClick={() => setIsModalOpen(false)} className="text-slate-500 hover:text-white transition-colors"><X size={24} /></button>
                </div>
              </div>

              <form onSubmit={handleAddUser} className="p-8 space-y-5">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em] ml-1">Username</label>
                  <input 
                    type="text" required value={formData.username}
                    className="w-full bg-slate-800/50 border border-slate-700/50 rounded-xl px-4 py-3 text-sm text-white focus:ring-2 ring-blue-500/20 outline-none transition-all"
                    onChange={e => setFormData({ ...formData, username: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em] ml-1">First Name</label>
                    <input 
                      type="text" required value={formData.first_name}
                      className="w-full bg-slate-800/50 border border-slate-700/50 rounded-xl px-4 py-3 text-sm text-white focus:ring-2 ring-blue-500/20 outline-none transition-all"
                      onChange={e => setFormData({ ...formData, first_name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em] ml-1">Last Name</label>
                    <input 
                      type="text" required value={formData.last_name}
                      className="w-full bg-slate-800/50 border border-slate-700/50 rounded-xl px-4 py-3 text-sm text-white focus:ring-2 ring-blue-500/20 outline-none transition-all"
                      onChange={e => setFormData({ ...formData, last_name: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em] ml-1">Email Address</label>
                  <input 
                    type="email" required value={formData.email}
                    className="w-full bg-slate-800/50 border border-slate-700/50 rounded-xl px-4 py-3 text-sm text-white focus:ring-2 ring-blue-500/20 outline-none transition-all"
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em] ml-1">Temporary Password</label>
                  <input 
                    type="password" required value={formData.password}
                    className="w-full bg-slate-800/50 border border-slate-700/50 rounded-xl px-4 py-3 text-sm text-white focus:ring-2 ring-blue-500/20 outline-none transition-all"
                    onChange={e => setFormData({ ...formData, password: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em] ml-1">Access Role</label>
                    <select 
                      className="w-full bg-slate-800/50 border border-slate-700/50 rounded-xl px-4 py-3 text-sm text-white focus:ring-2 ring-blue-500/20 outline-none appearance-none cursor-pointer"
                      value={formData.role}
                      onChange={e => setFormData({ ...formData, role: e.target.value })}
                    >
                      <option value="USER">USER</option>
                      <option value="ADMIN">ADMIN</option>
                      <option value="VIEWER">VIEWER</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em] ml-1">Department</label>
                    <select 
                      className="w-full bg-slate-800/50 border border-slate-700/50 rounded-xl px-4 py-3 text-sm text-white focus:ring-2 ring-blue-500/20 outline-none appearance-none cursor-pointer"
                      value={formData.department}
                      onChange={e => setFormData({ ...formData, department: e.target.value })}
                    >
                      <option value="IT">Engineering</option>
                      <option value="HR">Human Resources</option>
                      <option value="FINANCE">Finance</option>
                    </select>
                  </div>
                </div>

                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-2xl font-bold text-sm tracking-wide shadow-lg shadow-blue-900/40 active:scale-95 transition-all mt-4">
                  Create Account
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}