import { useState } from 'react';
import { Plus, Edit2, Users, FileText, X } from 'lucide-react';

const STATS = [
  { title: 'บทบาททั้งหมด', value: '0' },
  { title: 'ผู้ใช้ทั้งหมด', value: '0' },
  { title: 'สิทธิ์ทั้งหมด', value: '0' }
];

const ROLES = [
  { title: 'Admin', desc: 'มีสิทธิ์จัดการระบบทั้งหมด', users: '12' },
  { title: 'Supervisor', desc: 'จัดการ Users และตรวจสอบ', users: '48' },
  { title: 'User', desc: 'ใช้งานแพลตฟอร์ม', users: '1,024' },
  { title: 'Viewer', desc: 'ดูข้อมูลเท่านั้น', users: '170' },
];

function ToggleSwitch({ defaultChecked = false }: { defaultChecked?: boolean }) {
  const [checked, setChecked] = useState(defaultChecked);
  return (
    <button 
      type="button"
      onClick={() => setChecked(!checked)}
      className={`w-11 h-6 rounded-full transition-colors relative flex items-center shrink-0 ${checked ? 'bg-indigo-500' : 'bg-white/20'}`}
    >
      <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-all ${checked ? 'left-6' : 'left-1'}`} />
    </button>
  );
}

export function RolesTab() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add'|'edit'>('add');

  const openModal = (mode: 'add'|'edit') => {
    setModalMode(mode);
    setIsModalOpen(true);
  };
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-8">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight mb-2">Roles & Permission</h2>
          <p className="text-white/60 text-sm">จัดการบทบาทและสิทธิ์การเข้าถึงระบบ</p>
        </div>
        <button onClick={() => openModal('add')} className="flex items-center gap-2 bg-gradient-to-r from-blue-500/80 to-indigo-500/80 hover:from-blue-500 hover:to-indigo-500 border border-blue-400/50 text-white px-5 py-2.5 rounded-xl transition-all font-medium text-sm shadow-[0_0_20px_rgba(59,130,246,0.3)] shrink-0">
          <Plus size={16} /> กำหนดบทบาทใหม่
        </button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {STATS.map((s, i) => (
          <div key={i} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl flex items-center justify-between">
            <h3 className="text-white/70 text-sm font-medium">{s.title}</h3>
            <p className="text-3xl font-black">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Role Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
        {ROLES.map((role, i) => (
          <div key={i} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-xl flex flex-col justify-between group hover:bg-white/10 transition-colors relative h-48">
            <button onClick={() => openModal('edit')} className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors bg-white/5 hover:bg-white/20 p-2 rounded-lg border border-white/5">
              <Edit2 size={16} />
            </button>
            
            <div>
              <h3 className="text-2xl font-bold tracking-tight mb-2">{role.title}</h3>
              <p className="text-white/60 text-sm">{role.desc}</p>
            </div>
            
            <div className="flex items-center gap-2 text-white/70 font-medium text-sm pt-6 border-t border-white/10 mt-auto">
              <Users size={16} />
              <span>{role.users} ผู้ใช้</span>
            </div>
          </div>
        ))}
      </div>

      {/* Adding/Editing Roles Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-[#091833] border border-white/20 rounded-[2rem] w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-white/10 flex justify-between items-center shrink-0">
              <h3 className="text-2xl font-bold text-white tracking-tight">
                {modalMode === 'add' ? 'เพิ่มบทบาทใหม่' : 'แก้บทบาท'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-white/50 hover:text-white transition-colors bg-white/5 hover:bg-white/10 p-2 rounded-full">
                <X size={20} />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-6">
              <div className="space-y-1.5">
                <label className="text-sm text-white/80 font-medium pl-1">ชื่อบทบาท</label>
                <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 text-white transition-all" />
              </div>
              
              <div className="space-y-1.5">
                <label className="text-sm text-white/80 font-medium pl-1">คำอธิบาย</label>
                <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 text-white transition-all" />
              </div>

              <div className="space-y-4">
                <label className="text-sm text-white/80 font-medium block pl-1">สิทธิ์การเข้าถึง</label>
                
                {/* Permission Card 1 */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-5 shadow-inner">
                  <div className="flex items-center gap-2 mb-5 text-white font-medium border-b border-white/5 pb-3">
                    <Users size={18} className="text-indigo-400" />
                    <span>การจัดการผู้ใช้</span>
                  </div>
                  <div className="space-y-4">
                    {[
                      { title: 'ผู้เพิ่มผู้ใช้', desc: 'สามารถเพิ่มผู้ใช้งาน' },
                      { title: 'แก้ไขข้อมูลผู้ใช้', desc: 'แก้ไขข้อมูลผู้ใช้งาน' },
                      { title: 'ลบข้อมูลผู้ใช้', desc: 'สามารถลบผู้ใช้งาน' },
                      { title: 'สร้างข้อมูลผู้ใช้', desc: 'สร้างข้อมูลผู้ใช้งาน' }
                    ].map((perm, idx) => (
                      <div key={idx} className="flex justify-between items-center group">
                        <div>
                          <div className="text-sm text-white/90 font-medium">{perm.title}</div>
                          <div className="text-xs text-white/40">{perm.desc}</div>
                        </div>
                        <ToggleSwitch defaultChecked={idx < 2} />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Permission Card 2 */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-5 shadow-inner">
                  <div className="flex items-center gap-2 mb-5 text-white font-medium border-b border-white/5 pb-3">
                    <FileText size={18} className="text-indigo-400" />
                    <span>PDPA Records</span>
                  </div>
                  <div className="space-y-4">
                    {[
                      { title: 'ดู PDPA', desc: 'สามารถดูข้อมูล PDPA ได้' },
                      { title: 'สร้าง PDPA', desc: 'สามารถสร้าง PDPA Records ใหม่' },
                      { title: 'แก้ไข PDPA', desc: 'สามารถแก้ไขข้อมูล PDPA Records' },
                      { title: 'ลบ PDPA', desc: 'สามารถลบข้อมูล PDPA Records' },
                      { title: 'อนุมัติ PDPA', desc: 'สามารถอนุมัติสิทธิ์ PDPA Records' },
                    ].map((perm, idx) => (
                      <div key={idx} className="flex justify-between items-center group">
                        <div>
                          <div className="text-sm text-white/90 font-medium">{perm.title}</div>
                          <div className="text-xs text-white/40">{perm.desc}</div>
                        </div>
                        <ToggleSwitch defaultChecked={idx === 0 || idx === 1} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-white/10 flex gap-4 justify-center shrink-0">
              <button onClick={() => setIsModalOpen(false)} className="px-10 py-3 rounded-full border border-white/20 text-white/80 hover:bg-white/5 transition-colors font-medium">
                ยกเลิก
              </button>
              <button onClick={() => setIsModalOpen(false)} className="px-10 py-3 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors font-medium">
                ยืนยัน
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
