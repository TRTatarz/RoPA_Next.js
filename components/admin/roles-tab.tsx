'use client';

import { useState } from 'react';
import { Plus, Edit2, Users, FileText, X, ShieldCheck, Fingerprint } from 'lucide-react';

const STATS = [
  { title: 'บทบาททั้งหมด', value: '4', icon: <ShieldCheck size={20} className="text-blue-400" /> },
  { title: 'ผู้ใช้ทั้งหมด', value: '1,256', icon: <Users size={20} className="text-indigo-400" /> },
  { title: 'สิทธิ์ทั้งหมด', value: '18', icon: <Fingerprint size={20} className="text-emerald-400" /> }
];

const ROLES = [
  { title: 'Admin', desc: 'มีสิทธิ์จัดการระบบทั้งหมดและเข้าถึงข้อมูลความปลอดภัยสูงสุด', users: '12' },
  { title: 'Supervisor', desc: 'จัดการ Users ตรวจสอบ Log และดูแลความเรียบร้อยของแผนก', users: '48' },
  { title: 'User', desc: 'ใช้งานแพลตฟอร์มตามสิทธิ์ที่ได้รับมอบหมายทั่วไป', users: '1,024' },
  { title: 'Viewer', desc: 'ดูข้อมูลและรายงานต่าง ๆ เท่านั้น ไม่สามารถแก้ไขข้อมูลได้', users: '170' },
];

function ToggleSwitch({ defaultChecked = false }: { defaultChecked?: boolean }) {
  const [checked, setChecked] = useState(defaultChecked);
  return (
    <button
      type="button"
      onClick={() => setChecked(!checked)}
      className={`w-12 h-6 rounded-full transition-all duration-300 relative flex items-center shrink-0 ${checked ? 'bg-blue-600' : 'bg-slate-700'}`}
    >
      <div className={`w-4 h-4 rounded-full bg-white absolute transition-all duration-300 shadow-md ${checked ? 'left-7' : 'left-1'}`} />
    </button>
  );
}

export function RolesTab() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');

  const openModal = (mode: 'add' | 'edit') => {
    setModalMode(mode);
    setIsModalOpen(true);
  };

  return (

    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-blue-600/10 blur-[120px]" />
        <div className="absolute top-[20%] -right-[10%] w-[30%] h-[30%] rounded-full bg-indigo-600/10 blur-[120px]" />
      </div>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-4xl font-bold text-white tracking-tight">Roles & Permission</h2>
          <p className="text-slate-500 mt-2 text-base font-medium">DEFINE ACCESS LEVELS AND SYSTEM SECURITY POLICIES</p>
        </div>
        <button
          onClick={() => openModal('add')}
          className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-full text-sm font-bold flex items-center gap-2 shadow-[0_0_20px_rgba(37,99,235,0.2)] transition-all active:scale-95 shrink-0"
        >
          <Plus size={18} /> Create New Role
        </button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {STATS.map((s, i) => (
          <div key={i} className="bg-[#0b1429]/40 backdrop-blur-xl border border-slate-800/60 rounded-[24px] p-8 flex items-center justify-between group hover:border-blue-500/30 transition-all shadow-2xl">
            <div className="flex flex-col gap-1">
              <h3 className="text-slate-500 text-xs font-black uppercase tracking-[0.15em]">{s.title}</h3>
              <p className="text-4xl font-black text-white tracking-tighter">{s.value}</p>
            </div>
            <div className="p-4 bg-slate-800/50 rounded-2xl group-hover:bg-blue-500/10 transition-colors">
              {s.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Role Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
        {ROLES.map((role, i) => (
          <div key={i} className="bg-[#0b1429]/40 backdrop-blur-xl border border-slate-800/60 rounded-[32px] p-8 shadow-2xl flex flex-col group hover:border-slate-700 transition-all relative min-h-[220px]">
            <button
              onClick={() => openModal('edit')}
              className="absolute top-8 right-8 text-slate-500 hover:text-white transition-colors bg-slate-800/50 hover:bg-slate-700 p-2.5 rounded-xl border border-slate-700/50"
            >
              <Edit2 size={18} />
            </button>

            <div className="flex-1">
              <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-400 mb-6 border border-blue-500/20">
                <ShieldCheck size={24} />
              </div>
              <h3 className="text-2xl font-bold text-white tracking-tight mb-2 uppercase">{role.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed max-w-[80%] font-medium">{role.desc}</p>
            </div>

            <div className="flex items-center gap-2 text-slate-400 font-bold text-xs pt-6 border-t border-slate-800/50 mt-8 tracking-widest uppercase">
              <Users size={16} className="text-slate-600" />
              <span>{role.users} active users</span>
            </div>
          </div>
        ))}
      </div>

      {/* Adding/Editing Roles Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setIsModalOpen(false)} />
          <div className="relative bg-[#0f172a] border border-slate-800 w-full max-w-3xl max-h-[90vh] flex flex-col rounded-[40px] shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] overflow-hidden animate-in fade-in zoom-in-95 duration-300">

            <div className="p-10 border-b border-slate-800 flex justify-between items-center bg-slate-900/20">
              <div>
                <h3 className="text-2xl font-bold text-white tracking-tight">
                  {modalMode === 'add' ? 'Configure New Identity Role' : 'Modify Role Permissions'}
                </h3>
                <p className="text-slate-500 text-sm mt-1">Set granular access controls for this role.</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-500 hover:text-white transition-colors p-2 hover:bg-slate-800 rounded-full">
                <X size={24} />
              </button>
            </div>

            <div className="p-10 overflow-y-auto space-y-8 bg-[#0f172a]">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em] ml-1">Role Identifier</label>
                  <input type="text" placeholder="e.g. DATA_PROTECTION_OFFICER" className="w-full bg-slate-800/50 border border-slate-700/50 rounded-2xl px-5 py-4 text-sm text-white outline-none focus:ring-2 ring-blue-500/20 transition-all placeholder:text-slate-600" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em] ml-1">Description</label>
                  <input type="text" placeholder="Briefly define role purpose..." className="w-full bg-slate-800/50 border border-slate-700/50 rounded-2xl px-5 py-4 text-sm text-white outline-none focus:ring-2 ring-blue-500/20 transition-all placeholder:text-slate-600" />
                </div>
              </div>

              <div className="space-y-6">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] block ml-1">Permission Matrix</label>

                {/* Permission Category */}
                {[
                  { icon: <Users size={18} />, title: 'User Management', perms: ['Create Users', 'Edit Identity', 'Revoke Access', 'Export Audit Data'] },
                  { icon: <FileText size={18} />, title: 'Record Governance', perms: ['Read PDPA', 'Archive Records', 'Modify Policies', 'Approve Requests'] }
                ].map((category, cIdx) => (
                  <div key={cIdx} className="bg-slate-900/40 border border-slate-800/60 rounded-3xl p-8 space-y-6">
                    <div className="flex items-center gap-3 text-white font-bold border-b border-slate-800/60 pb-5">
                      <span className="text-blue-500">{category.icon}</span>
                      <span className="text-lg tracking-tight">{category.title}</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                      {category.perms.map((p, pIdx) => (
                        <div key={pIdx} className="flex justify-between items-center group">
                          <div>
                            <div className="text-sm text-slate-200 font-bold">{p}</div>
                            <div className="text-[11px] text-slate-500 font-medium">Standard system privilege</div>
                          </div>
                          <ToggleSwitch defaultChecked={pIdx === 0} />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-10 border-t border-slate-800 flex gap-4 justify-end bg-slate-900/20">
              <button onClick={() => setIsModalOpen(false)} className="px-8 py-3 rounded-full border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-800 transition-all font-bold text-sm">
                Cancel
              </button>
              <button onClick={() => setIsModalOpen(false)} className="px-10 py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white transition-all font-bold text-sm shadow-lg shadow-blue-900/40">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}