'use client';

import { useState } from 'react';
import {
  X, CheckCircle2, AlertCircle, MessageSquare,
  ShieldCheck, Database, Globe, Clock,
  UserCheck, HardDrive, ShieldAlert
} from 'lucide-react';

export function DpoReviewModal({ onClose, data }: { onClose: () => void; data: any }) {
  const [comment, setComment] = useState('');
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://ropa-backend-production-aaf0.up.railway.app";

  if (!data) return null;

  const handleAction = async (type: 'approve' | 'reject') => {
    if (type === 'reject' && !comment) {
      alert("กรุณาระบุเหตุผลในช่องความเห็นก่อนส่งกลับ");
      return;
    }

    const updatedStatus = type === 'approve' ? 'Completed' : 'Reject';

    try {
      const response = await fetch(`${API_URL}/api/ropa/${data.id}`, {
        method: 'PATCH', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: updatedStatus,
          dpo_comment: comment,
        }),
      });

      if (response.ok) {
        alert(type === 'approve' ? "อนุมัติเรียบร้อย" : "ส่งกลับไปแก้ไขเรียบร้อย");
        onClose();
        window.location.reload();
      } else {
        const errData = await response.json();
        alert(`Error: ${errData.detail || 'อัปเดตไม่สำเร็จ'}`);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      alert("ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้");
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-[#091833] border border-white/20 rounded-[2rem] w-full max-w-4xl max-h-[95vh] flex flex-col shadow-2xl animate-in fade-in zoom-in-95 duration-200 overflow-hidden">
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-blue-600/10 blur-[120px]" />
          <div className="absolute top-[20%] -right-[10%] w-[30%] h-[30%] rounded-full bg-indigo-600/10 blur-[120px]" />
        </div>
        {/* Header - จุดที่เคยเกิด Error */}
        <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5 rounded-t-[2rem]">
          <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-3">
            <ShieldCheck className="text-emerald-400" size={24} />
            DPO Compliance Review
            <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/30 font-black uppercase tracking-widest">
              {/* ใช้ Optional Chaining และ Fallback text */}
              Reviewing: {data?.id ? data.id.substring(0, 8) : 'ไม่มีรหัสรายงาน'}
            </span>
          </h3>
          <button onClick={onClose} className="text-white/50 hover:text-white transition-colors bg-white/5 hover:bg-white/10 p-2 rounded-xl">
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-8 overflow-y-auto space-y-8 text-white custom-scrollbar bg-[#091833]">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="text-[11px] font-black text-indigo-400 uppercase tracking-[0.2em] flex items-center gap-2">
                <Database size={14} /> 1. ข้อมูลทั่วไป (Data Controller)
              </h4>
              <div className="bg-white/5 p-5 rounded-2xl border border-white/10 space-y-3">
                <div>
                  <p className="text-[10px] text-white/40 font-bold uppercase mb-1">ผู้ควบคุมข้อมูลส่วนบุคคล</p>
                  <p className="text-sm font-semibold">{data?.controller_name || 'ไม่มีรายงาน'}</p>
                </div>
                <div>
                  <p className="text-[10px] text-white/40 font-bold uppercase mb-1">กิจกรรม / วัตถุประสงค์</p>
                  <p className="text-sm">{data?.processing_activity || 'ไม่มีรายงาน'}</p>
                  <p className="text-xs text-white/60 mt-1 italic">{data?.purpose || 'ไม่ได้ระบุวัตถุประสงค์'}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-[11px] font-black text-indigo-400 uppercase tracking-[0.2em] flex items-center gap-2">
                <UserCheck size={14} /> 2. หมวดหมู่ & ฐานกฎหมาย
              </h4>
              <div className="bg-white/5 p-5 rounded-2xl border border-white/10 space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-[10px] text-white/40 font-bold uppercase">หมวดหมู่/ประเภท</p>
                    <p className="text-xs font-bold text-indigo-300">
                      {data?.data_category || 'ไม่ระบุ'} / {data?.data_type || 'ไม่ระบุ'}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] text-white/40 font-bold uppercase">ความยินยอมผู้เยาว์</p>
                    <p className="text-xs">{data?.child_consent || 'ไม่มี'}</p>
                  </div>
                </div>
                <div className="pt-2 border-t border-white/5">
                  <p className="text-[10px] text-white/40 font-bold uppercase mb-1">ฐานในการประมวลผล (Legal Basis)</p>
                  <p className="text-xs leading-relaxed text-white/80">{data?.legal_basis || 'ไม่ได้ระบุฐานกฎหมาย'}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-[11px] font-black text-indigo-400 uppercase tracking-[0.2em] flex items-center gap-2">
              <HardDrive size={14} /> 3. การจัดเก็บและโอนข้อมูล
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                <p className="text-[9px] text-white/40 font-bold uppercase mb-1 flex items-center gap-1"><Clock size={10} /> ระยะเวลาจัดเก็บ</p>
                <p className="text-xs font-bold">{data?.retention_period || 'ไม่ได้ระบุ'}</p>
              </div>
              <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                <p className="text-[9px] text-white/40 font-bold uppercase mb-1 flex items-center gap-1"><Database size={10} /> วิธีการเก็บ</p>
                <p className="text-xs font-bold">{data?.storage_method || 'ไม่ได้ระบุ'}</p>
              </div>
              <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                <p className="text-[9px] text-white/40 font-bold uppercase mb-1 flex items-center gap-1"><Globe size={10} /> โอนต่างประเทศ</p>
                <p className="text-xs font-bold text-blue-400">
                  {data?.international_transfer ? (data?.transfer_country || 'ระบุมีแต่ไม่ใส่ชื่อประเทศ') : 'ไม่มี'}
                </p>
              </div>
              <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                <p className="text-[9px] text-white/40 font-bold uppercase mb-1 flex items-center gap-1"><UserCheck size={10} /> ผู้รับข้อมูล</p>
                <p className="text-xs font-bold truncate">{data?.recipients || 'ไม่มีการเปิดเผยข้อมูล'}</p>
              </div>
            </div>
          </div>

          {/* ส่วนมาตรการความปลอดภัย */}
          <div className="space-y-4">
            <h4 className="text-[11px] font-black text-emerald-400 uppercase tracking-[0.2em] flex items-center gap-2">
              <ShieldCheck size={14} /> 4. มาตรการรักษาความมั่นคงปลอดภัย
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {data?.measures && data.measures.length > 0 ? (
                data.measures.map((m: any, idx: number) => (
                  <div key={idx} className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-2xl">
                    <div className="flex items-center gap-3 mb-2">
                      <CheckCircle2 size={14} className="text-emerald-500" />
                      <p className="text-xs font-bold text-emerald-400 uppercase tracking-tight">{m.label}</p>
                    </div>
                    <p className="text-xs text-white/60 pl-6 leading-relaxed italic">
                      {m.detail || 'ไม่มีรายละเอียดมาตรการ'}
                    </p>
                  </div>
                ))
              ) : (
                <div className="col-span-full py-6 text-center border border-dashed border-white/10 rounded-2xl text-white/20 text-xs font-bold uppercase tracking-widest">
                  ไม่มีข้อมูลมาตรการความปลอดภัยในรายงานนี้
                </div>
              )}
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 flex items-center justify-center gap-8">
            <p className="text-[11px] font-black text-white/40 uppercase tracking-widest flex items-center gap-2">
              <ShieldAlert size={14} /> Risk Level:
            </p>
            <span className={`px-8 py-2 rounded-xl border font-black text-sm uppercase tracking-tighter ${data?.risk_level === 'High' ? 'bg-rose-500/20 border-rose-500/40 text-rose-400' :
              data?.risk_level === 'Medium' ? 'bg-amber-500/20 border-amber-500/40 text-amber-400' :
                'bg-blue-500/20 border-blue-500/40 text-blue-400'
              }`}>
              {data?.risk_level || 'ไม่ได้ระบุ'}
            </span>
          </div>

          <div className="pt-6 space-y-3">
            <label className="text-[11px] font-black text-indigo-400 uppercase tracking-widest flex items-center gap-2 font-sans">
              <MessageSquare size={14} /> DPO Review Comments
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="ระบุความเห็นที่นี่..."
              className="w-full h-24 bg-black/40 border border-white/10 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm placeholder:text-white/20"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-white/10 flex justify-between items-center bg-slate-900 rounded-b-[2rem]">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl border border-white/20 text-white/70 hover:bg-white/5 transition-all text-[11px] font-black uppercase"
          >
            Close
          </button>

          <div className="flex gap-3">
            <button
              onClick={() => handleAction('reject')}
              className="px-6 py-2.5 rounded-xl border border-rose-500/30 bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 transition-all text-[11px] font-black uppercase flex items-center gap-2"
            >
              Reject
            </button>
            <button
              onClick={() => handleAction('approve')}
              className="px-8 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-black text-[11px] uppercase shadow-lg transition-all active:scale-95"
            >
              Approve
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}