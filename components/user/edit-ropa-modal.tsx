'use client';

import { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Save, Send, ShieldCheck, Database, Globe, UserCheck, FileText, Lock, Loader2 } from 'lucide-react';

interface EditRopaModalProps {
    onClose: () => void;
    ropaId: string;
}

// กำหนด Interface เพื่อลด Error ตัวแดง
interface Measure {
    label: string;
    active: boolean;
    detail: string;
}

export function EditRopaModal({ onClose, ropaId }: EditRopaModalProps) {
    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://ropa-backend-production-aaf0.up.railway.app";

    const [measures, setMeasures] = useState<Measure[]>([
        { label: 'มาตรการเชิงองค์กร', active: false, detail: '' },
        { label: 'มาตรการเชิงเทคนิค', active: false, detail: '' },
        { label: 'มาตรการทางกายภาพ', active: false, detail: '' },
        { label: 'การควบคุมการเข้าถึงข้อมูล', active: false, detail: '' },
        { label: 'การกำหนดหน้าที่ความรับผิดชอบของผู้ใช้งาน', active: false, detail: '' },
        { label: 'มาตรการตรวจสอบย้อนหลัง', active: false, detail: '' },
    ]);

    const [formData, setFormData] = useState<any>({
        controller_name: '',
        processing_activity: '',
        purpose: '',
        personal_data: '',
        data_category: 'ลูกค้า',
        data_type: 'ข้อมูลทั่วไป',
        acquisition_method: 'soft file',
        data_source: 'จากเจ้าของข้อมูลส่วนบุคคลโดยตรง',
        legal_basis: '',
        child_consent: 'ไม่มี',
        recipients: '',
        international_transfer: false,
        transfer_country: '',
        company_name: '',
        transfer_method: '',
        protection_standard: '',
        storage_method: '',
        retention_period: '',
        access_rights: '',
        deletion_method: '',
        refusal_record: '',
        risk_level: 'Low',
    });

    // ดึงข้อมูลเดิม
    useEffect(() => {
        const fetchOldData = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(`${API_URL}/api/ropa/`);
                const data = await response.json();

                // หาตัวที่ ID ตรงกัน
                const target = data.find((item: any) => String(item.id) === String(ropaId));

                if (target) {
                    // 1. แยก measures ออกมา แล้วเซตค่าอื่นลง formData
                    const { measures: incomingMeasures, ...rest } = target;
                    setFormData(rest);

                    // 2. Mapping Measures: สำคัญมากเพื่อให้ติ๊กถูกค้างไว้
                    if (incomingMeasures && Array.isArray(incomingMeasures)) {
                        setMeasures(prevMeasures =>
                            prevMeasures.map(template => {
                                const match = incomingMeasures.find(
                                    (m: any) => m.label === template.label
                                );
                                if (match) {
                                    return {
                                        ...template,
                                        active: true,
                                        detail: match.detail || ''
                                    };
                                }
                                return template;
                            })
                        );
                    }
                }
            } catch (error) {
                console.error("Fetch error:", error);
            } finally {
                setIsLoading(false);
            }
        };
        if (ropaId) fetchOldData();
    }, [ropaId]);

    // แก้ไข Logic การอัปเดต (PUT)
    const handleUpdate = async (newStatus: 'Draft' | 'Pending') => {
        try {
            // 1. ตรวจสอบและทำความสะอาดข้อมูลก่อนส่ง
            // Backend (RopaCreate) ต้องการฟิลด์เหล่านี้ครบถ้วน
            const payload = {
                controller_name: formData.controller_name || "",
                processing_activity: formData.processing_activity || "",
                purpose: formData.purpose || "",
                personal_data: formData.personal_data || "",
                data_category: formData.data_category || "ลูกค้า",
                data_type: formData.data_type || "ข้อมูลทั่วไป",
                acquisition_method: formData.acquisition_method || "soft file",
                data_source: formData.data_source || "จากเจ้าของข้อมูลส่วนบุคคลโดยตรง",
                legal_basis: formData.legal_basis || "",
                child_consent: formData.child_consent || "ไม่มี",
                recipients: formData.recipients || "",
                international_transfer: Boolean(formData.international_transfer),
                transfer_country: formData.transfer_country || null,
                company_name: formData.company_name || null,
                transfer_method: formData.transfer_method || null,
                protection_standard: formData.protection_standard || null,
                storage_method: formData.storage_method || "",
                retention_period: formData.retention_period || "",
                access_rights: formData.access_rights || "",
                deletion_method: formData.deletion_method || "",
                refusal_record: formData.refusal_record || "",
                risk_level: formData.risk_level || "Low",
                status: newStatus,
                measures: measures
                    .filter(m => m.active)
                    .map(m => ({
                        label: m.label,
                        detail: m.detail || ""
                    }))
            };

            // 2. ยิง API (ตรวจสอบ URL ให้แน่ใจว่าไม่มี /api/ropa ซ้ำซ้อน)
            const response = await fetch(`${API_URL}/api/ropa/${ropaId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                alert(newStatus === 'Draft' ? "อัปเดตร่างสำเร็จ" : "แก้ไขและส่งตรวจสอบสำเร็จ");
                onClose();
                window.location.reload();
            } else {
                const errorData = await response.json();
                // ถ้าพัง ให้ดูที่นี่ว่าฟิลด์ไหนผิด
                console.log("Error Detail:", errorData);
                alert(`บันทึกไม่สำเร็จ: ${JSON.stringify(errorData.detail)}`);
            }
        } catch (error) {
            console.error("Error:", error);
            alert("การเชื่อมต่อล้มเหลว");
        }
    };

    const handleChange = (e: any) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev: any) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    const toggleMeasure = (index: number) => {
        setMeasures((prev: Measure[]) => prev.map((m, i) =>
            i === index ? { ...m, active: !m.active, detail: !m.active ? '' : m.detail } : m
        ));
    };

    const handleMeasureDetail = (index: number, val: string) => {
        setMeasures((prev: Measure[]) => prev.map((m, i) => i === index ? { ...m, detail: val } : m));
    };

    const canGoNext = formData.controller_name && formData.processing_activity && formData.purpose;

    if (isLoading) return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
            <Loader2 className="animate-spin text-indigo-500" size={48} />
        </div>
    );

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-[#091833] border border-white/20 rounded-[2rem] w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">

                {/* Header */}
                <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
                    <h3 className="text-xl font-bold text-white flex items-center gap-3">
                        <Database className="text-indigo-400" size={24} />
                        Update ROPA Record
                        <span className="text-[10px] bg-indigo-500/20 text-indigo-400 px-3 py-1 rounded-full border border-indigo-500/30 uppercase font-black">STEP {step}/3</span>
                    </h3>
                    <button onClick={onClose} className="text-white/50 hover:text-white bg-white/5 p-2 rounded-xl transition-all"><X size={20} /></button>
                </div>

                {/* Content Area */}
                <div className="flex-1 overflow-y-auto p-8 custom-scrollbar space-y-8 text-white">

                    {/* STEP 1 */}
                    {step === 1 && (
                        <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                            <h4 className="text-indigo-400 font-bold flex items-center gap-2 text-sm uppercase tracking-wider"><FileText size={18} /> 1. ข้อมูลพื้นฐานกิจกรรมประมวลผล</h4>
                            <div className="space-y-5 bg-white/5 p-6 rounded-2xl border border-white/10">
                                <div className="space-y-1.5">
                                    <label className="text-[13px] text-white/60 font-medium pl-1">ข้อมูลผู้ควบคุมข้อมูลส่วนบุคคล <span className="text-red-500">*</span></label>
                                    <input required name="controller_name" value={formData.controller_name} onChange={handleChange} type="text" placeholder="ชื่อบริษัท หรือหน่วยงานของคุณ" className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-indigo-500 transition-all" />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-[13px] text-white/60 font-medium pl-1">ชื่อกิจกรรมประมวลผล <span className="text-red-500">*</span></label>
                                        <input required name="processing_activity" value={formData.processing_activity} onChange={handleChange} placeholder="เช่น การรับสมัครพนักงาน" className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-indigo-500" />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[13px] text-white/60 font-medium pl-1">วัตถุประสงค์ <span className="text-red-500">*</span></label>
                                        <input required name="purpose" value={formData.purpose} onChange={handleChange} placeholder="เช่น เพื่อการพิจารณารับเข้าทำงาน" className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-indigo-500" />
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[13px] text-white/60 font-medium pl-1">ข้อมูลส่วนบุคคลที่จัดเก็บ <span className="text-red-500">*</span></label>
                                    <input required name="personal_data" value={formData.personal_data} onChange={handleChange} placeholder="เช่น ชื่อ-นามสกุล, เบอร์โทรศัพท์, ที่อยู่" className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-indigo-500" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-[13px] text-white/60 font-medium pl-1">หมวดหมู่เจ้าของข้อมูล</label>
                                        <select required name="data_category" value={formData.data_category} onChange={handleChange} className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-indigo-500">
                                            <option value="ลูกค้า">ลูกค้า</option><option value="พนักงาน">พนักงาน</option><option value="คู่ค้า">คู่ค้า</option>
                                        </select>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[13px] text-white/60 font-medium pl-1">ประเภทข้อมูล</label>
                                        <select required name="data_type" value={formData.data_type} onChange={handleChange} className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-indigo-500">
                                            <option value="ข้อมูลทั่วไป">ข้อมูลทั่วไป</option><option value="ข้อมูลอ่อนไหว">ข้อมูลอ่อนไหว (Sensitive Data)</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-[13px] text-white/60 font-medium pl-1">แหล่งที่มาของข้อมูล</label>
                                        <select required name="data_source" value={formData.data_source} onChange={handleChange} className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-indigo-500">
                                            <option value="จากเจ้าของข้อมูลส่วนบุคคลโดยตรง">ได้มาจากเจ้าของโดยตรง</option>
                                            <option value="จากแหล่งอื่น">ได้มาจากแหล่งอื่น</option>
                                        </select>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[13px] text-white/60 font-medium pl-1">รูปแบบเอกสารที่ได้รับ</label>
                                        <select required name="acquisition_method" value={formData.acquisition_method} onChange={handleChange} className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-indigo-500">
                                            <option value="soft file">Digital (Soft File)</option><option value="hard copy">เอกสาร (Hard Copy)</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[13px] text-white/60 font-medium pl-1 flex items-center gap-2"><UserCheck size={14} /> ฐานในการประมวลผล <span className="text-red-500">*</span></label>
                                    <textarea required name="legal_basis" value={formData.legal_basis} onChange={handleChange} placeholder="ระบุฐานกฎหมาย" className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 outline-none h-20 resize-none focus:border-indigo-500" />
                                </div>
                                <div className="p-4 bg-indigo-500/5 rounded-xl border border-indigo-500/10 space-y-3">
                                    <span className="text-[13px] text-indigo-400 font-bold block">การขอความยินยอมกรณีผู้เยาว์</span>
                                    <div className="flex gap-6">
                                        {['อายุไม่เกิน 10 ปี', 'อายุ 10 - 20 ปี', 'ไม่มี'].map(opt => (
                                            <label key={opt} className="flex items-center gap-2 text-sm cursor-pointer">
                                                <input required type="radio" name="child_consent" value={opt} checked={formData.child_consent === opt} onChange={handleChange} className="accent-indigo-500 w-4 h-4" />{opt}
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* STEP 2 */}
                    {step === 2 && (
                        <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                            <h4 className="text-indigo-400 font-bold flex items-center gap-2 text-sm uppercase tracking-wider"><Globe size={18} /> 2. การเก็บรักษาและการโอนข้อมูลส่วนบุคคล</h4>
                            <div className="bg-white/5 p-6 rounded-2xl border border-white/10 space-y-5">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-[13px] text-white/60 font-medium pl-1">วิธีการเก็บรักษา <span className="text-red-500">*</span></label>
                                        <input required name="storage_method" value={formData.storage_method} onChange={handleChange} placeholder="เช่น Google Drive" className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-indigo-500" />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[13px] text-white/60 font-medium pl-1">ระยะเวลาจัดเก็บ <span className="text-red-500">*</span></label>
                                        <input required name="retention_period" value={formData.retention_period} onChange={handleChange} placeholder="เช่น 10 ปี" className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-indigo-500" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-[13px] text-white/60 font-medium pl-1">วิธีการลบหรือทำลาย <span className="text-red-500">*</span></label>
                                        <input required name="deletion_method" value={formData.deletion_method} onChange={handleChange} placeholder="เช่น ลบถาวร" className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-indigo-500" />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[13px] text-white/60 font-medium pl-1">การใช้สิทธิเข้าถึง <span className="text-red-500">*</span></label>
                                        <input required name="access_rights" value={formData.access_rights} onChange={handleChange} placeholder="เช่น ผ่าน DPO" className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-indigo-500" />
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[13px] text-white/60 font-medium pl-1">รายชื่อผู้รับข้อมูล <span className="text-red-500">*</span></label>
                                    <input required name="recipients" value={formData.recipients} onChange={handleChange} className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-indigo-500" />
                                </div>

                                <div className="border-t border-white/10 pt-5 space-y-4">
                                    <div className="flex gap-6 items-center">
                                        <span className="text-sm font-bold text-indigo-400">โอนข้อมูลไปต่างประเทศหรือไม่?</span>
                                        <label className="flex items-center gap-2 cursor-pointer"><input type="radio" checked={formData.international_transfer} onChange={() => setFormData((p: any) => ({ ...p, international_transfer: true }))} className="accent-indigo-500 w-4 h-4" /> มี</label>
                                        <label className="flex items-center gap-2 cursor-pointer"><input type="radio" checked={!formData.international_transfer} onChange={() => setFormData((p: any) => ({ ...p, international_transfer: false }))} className="accent-indigo-500 w-4 h-4" /> ไม่มี</label>
                                    </div>
                                    {formData.international_transfer && (
                                        <div className="grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
                                            <input required name="transfer_country" value={formData.transfer_country} onChange={handleChange} placeholder="ประเทศปลายทาง" className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-2 text-sm outline-none focus:border-indigo-500" />
                                            <input required name="company_name" value={formData.company_name} onChange={handleChange} placeholder="ชื่อบริษัทปลายทาง" className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-2 text-sm outline-none focus:border-indigo-500" />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* STEP 3 */}
                    {step === 3 && (
                        <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                            <h4 className="text-emerald-400 font-bold flex items-center gap-2 text-sm uppercase tracking-wider"><Lock size={18} /> 3. มาตรการรักษาความมั่นคงปลอดภัย</h4>
                            <div className="grid grid-cols-1 gap-4">
                                {measures.map((m, i) => (
                                    <div key={m.label} className={`rounded-2xl border transition-all ${m.active ? 'bg-emerald-500/5 border-emerald-500/30' : 'bg-white/5 border-white/10 opacity-50'}`}>
                                        <div className="px-5 py-3 border-b border-white/5 flex justify-between items-center">
                                            <label className="flex items-center gap-3 cursor-pointer group">
                                                <input type="checkbox" checked={m.active} onChange={() => toggleMeasure(i)} className="w-4 h-4 rounded accent-emerald-500" />
                                                <span className={`text-[13px] font-bold group-hover:text-emerald-400 transition-colors ${m.active ? 'text-white' : 'text-slate-400'}`}>{m.label}</span>
                                            </label>
                                        </div>
                                        {m.active && (
                                            <div className="p-4 animate-in fade-in zoom-in-95 duration-200">
                                                <textarea value={m.detail} onChange={(e) => handleMeasureDetail(i, e.target.value)} placeholder={`รายละเอียด ${m.label}...`} className="w-full h-24 bg-black/20 rounded-xl px-4 py-3 text-sm outline-none resize-none border border-white/5 focus:border-emerald-500/50 text-white" />
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <div className="bg-white/5 p-8 rounded-2xl border border-white/10 space-y-6">
                                <h5 className="text-center text-xs uppercase tracking-[0.2em] text-slate-500 font-black">Final Risk Assessment</h5>
                                <div className="flex justify-center gap-6">
                                    {['Low', 'Medium', 'High'].map(lvl => (
                                        <button
                                            key={lvl}
                                            type="button"
                                            onClick={() => setFormData((p: any) => ({ ...p, risk_level: lvl }))}
                                            className={`px-10 py-3.5 rounded-2xl border font-bold transition-all shadow-xl ${formData.risk_level === lvl
                                                ? 'bg-indigo-600 border-indigo-400 text-white scale-110'
                                                : 'bg-white/5 border-white/10 text-slate-500 hover:text-white'
                                                }`}
                                        >
                                            {lvl}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-white/10 bg-slate-900/50 flex justify-between items-center">
                    <button onClick={() => step > 1 ? setStep(step - 1) : onClose()} className="px-6 py-2.5 rounded-xl border border-white/20 text-white/70 hover:bg-white/5 flex items-center gap-2 text-xs font-black uppercase transition-all">
                        {step === 1 ? <><X size={18} /> Cancel</> : <><ChevronLeft size={18} /> Back</>}
                    </button>
                    <div className="flex gap-3">
                        <button
                            onClick={() => handleUpdate('Draft')}
                            className="px-4 py-2.5 rounded-xl border border-white/10 text-white/70 hover:bg-white/5 flex items-center gap-2 text-xs font-black uppercase transition-all"
                        >
                            <Save size={16} /> Save Draft
                        </button>
                        {step < 3 ? (
                            <button
                                disabled={!canGoNext}
                                onClick={() => setStep(step + 1)}
                                className={`px-8 py-2.5 rounded-xl shadow-lg font-black text-xs uppercase flex items-center gap-2 transition-all active:scale-95 ${canGoNext ? 'bg-indigo-600 hover:bg-indigo-500' : 'bg-white/5 text-white/20 cursor-not-allowed'}`}
                            >
                                Next <ChevronRight size={18} />
                            </button>
                        ) : (
                            <button
                                disabled={!canGoNext}
                                onClick={() => handleUpdate('Pending')}
                                className={`px-8 py-2.5 rounded-xl shadow-lg font-black text-xs uppercase flex items-center gap-2 transition-all active:scale-95 ${canGoNext ? 'bg-gradient-to-r from-indigo-600 to-blue-600' : 'bg-white/5 text-white/20 cursor-not-allowed'}`}
                            >
                                Submit Update <Send size={16} />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}