'use client';

import { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Save, Send, ShieldCheck, Database, Globe, UserCheck, FileText, Lock } from 'lucide-react';

export function RopaModal({ onClose }: { onClose: () => void }) {
    const [step, setStep] = useState(1);
    
    const [measures, setMeasures] = useState([
        { label: 'มาตรการเชิงองค์กร', active: false, detail: '' },
        { label: 'มาตรการเชิงเทคนิค', active: false, detail: '' },
        { label: 'มาตรการทางกายภาพ', active: false, detail: '' },
        { label: 'การควบคุมการเข้าถึงข้อมูล', active: false, detail: '' },
        { label: 'การกำหนดหน้าที่ความรับผิดชอบของผู้ใช้งาน', active: false, detail: '' },
        { label: 'มาตรการตรวจสอบย้อนหลัง', active: false, detail: '' },
    ]);

    const [formData, setFormData] = useState({
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
        is_group_company: false,
        company_name: '',
        transfer_method: '',
        protection_standard: '',
        exception_law: '',
        storage_type: 'soft file',
        storage_method: '',
        retention_period: '',
        access_rights: '',
        deletion_method: '',
        exempt_disclosure: '',
        refusal_record: '',
        risk_level: 'Low',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
        setFormData(prev => ({ ...prev, [name]: val }));
    };

    const toggleMeasure = (index: number) => {
        setMeasures(prev => prev.map((m, i) => 
            i === index ? { ...m, active: !m.active, detail: !m.active ? m.detail : '' } : m
        ));
    };

    const handleMeasureDetail = (index: number, text: string) => {
        setMeasures(prev => prev.map((m, i) => i === index ? { ...m, detail: text } : m));
    };

    const handleSubmit = () => {
        const finalData = { ...formData, security_measures: measures.filter(m => m.active) };
        console.log("Submitting RoPA Record:", finalData);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-[#091833] border border-white/20 rounded-[2rem] w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">

                {/* Header */}
                <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
                    <h3 className="text-xl font-bold text-white flex items-center gap-3">
                        <Database className="text-indigo-400" size={24} />
                        Create a new ROPA Record
                        <span className="text-[10px] bg-indigo-500/20 text-indigo-400 px-3 py-1 rounded-full border border-indigo-500/30 uppercase font-black">STEP {step}/3</span>
                    </h3>
                    <button onClick={onClose} className="text-white/50 hover:text-white bg-white/5 p-2 rounded-xl transition-all"><X size={20} /></button>
                </div>

                {/* Content Area */}
                <div className="flex-1 overflow-y-auto p-8 custom-scrollbar space-y-8 text-white">

                    {/* STEP 1: Basic Info & Acquisition */}
                    {step === 1 && (
                        <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                            <h4 className="text-indigo-400 font-bold flex items-center gap-2 text-sm uppercase tracking-wider"><FileText size={18}/> 1. ข้อมูลพื้นฐานกิจกรรมประมวลผล</h4>
                            <div className="space-y-5 bg-white/5 p-6 rounded-2xl border border-white/10">
                                <div className="space-y-1.5">
                                    <label className="text-[13px] text-white/60 font-medium pl-1">ข้อมูลผู้ควบคุมข้อมูลส่วนบุคคล (Data Controller)</label>
                                    <input name="controller_name" value={formData.controller_name} onChange={handleChange} type="text" placeholder="ชื่อบริษัท หรือหน่วยงานของคุณ" className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-indigo-500 transition-all" />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-[13px] text-white/60 font-medium pl-1">ชื่อกิจกรรมประมวลผล</label>
                                        <input name="processing_activity" value={formData.processing_activity} onChange={handleChange} placeholder="เช่น การรับสมัครพนักงาน" className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-indigo-500" />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[13px] text-white/60 font-medium pl-1">วัตถุประสงค์</label>
                                        <input name="purpose" value={formData.purpose} onChange={handleChange} placeholder="เช่น เพื่อการพิจารณารับเข้าทำงาน" className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-indigo-500" />
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[13px] text-white/60 font-medium pl-1">ข้อมูลส่วนบุคคลที่จัดเก็บ</label>
                                    <input name="personal_data" value={formData.personal_data} onChange={handleChange} placeholder="เช่น ชื่อ-นามสกุล, เบอร์โทรศัพท์, ที่อยู่" className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-indigo-500" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-[13px] text-white/60 font-medium pl-1">หมวดหมู่เจ้าของข้อมูล</label>
                                        <select name="data_category" value={formData.data_category} onChange={handleChange} className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 outline-none">
                                            <option value="ลูกค้า">ลูกค้า</option><option value="พนักงาน">พนักงาน</option><option value="คู่ค้า">คู่ค้า</option>
                                        </select>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[13px] text-white/60 font-medium pl-1">ประเภทข้อมูล</label>
                                        <select name="data_type" value={formData.data_type} onChange={handleChange} className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 outline-none">
                                            <option value="ข้อมูลทั่วไป">ข้อมูลทั่วไป</option><option value="ข้อมูลอ่อนไหว">ข้อมูลอ่อนไหว (Sensitive Data)</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-[13px] text-white/60 font-medium pl-1">แหล่งที่มาของข้อมูล</label>
                                        <select name="data_source" value={formData.data_source} onChange={handleChange} className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 outline-none">
                                            <option value="จากเจ้าของข้อมูลส่วนบุคคลโดยตรง">ได้มาจากเจ้าของโดยตรง</option>
                                            <option value="จากแหล่งอื่น">ได้มาจากแหล่งอื่น</option>
                                        </select>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[13px] text-white/60 font-medium pl-1">รูปแบบเอกสารที่ได้รับ</label>
                                        <select name="acquisition_method" value={formData.acquisition_method} onChange={handleChange} className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 outline-none">
                                            <option value="soft file">Digital (Soft File)</option><option value="hard copy">เอกสาร (Hard Copy)</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[13px] text-white/60 font-medium pl-1 flex items-center gap-2"><UserCheck size={14}/> ฐานในการประมวลผล (Legal Basis)</label>
                                    <textarea name="legal_basis" value={formData.legal_basis} onChange={handleChange} placeholder="ระบุฐานกฎหมาย เช่น ฐานสัญญา, ฐานประโยชน์โดยชอบด้วยกฎหมาย" className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 outline-none h-20 resize-none" />
                                </div>
                                <div className="p-4 bg-indigo-500/5 rounded-xl border border-indigo-500/10 space-y-3">
                                    <span className="text-[13px] text-indigo-400 font-bold block">การขอความยินยอมกรณีผู้เยาว์ (Child Consent)</span>
                                    <div className="flex gap-6">
                                        {['อายุไม่เกิน 10 ปี', 'อายุ 10 - 20 ปี', 'ไม่มี'].map(opt => (
                                            <label key={opt} className="flex items-center gap-2 text-sm cursor-pointer hover:text-indigo-300 transition-colors">
                                                <input type="radio" name="child_consent" value={opt} checked={formData.child_consent === opt} onChange={handleChange} className="accent-indigo-500 w-4 h-4" />{opt}
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* STEP 2: Storage, Transfer & Disclosure */}
                    {step === 2 && (
                        <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                            <h4 className="text-indigo-400 font-bold flex items-center gap-2 text-sm uppercase tracking-wider"><Globe size={18}/> 2. การเก็บรักษาและการโอนข้อมูลส่วนบุคคล</h4>
                            <div className="bg-white/5 p-6 rounded-2xl border border-white/10 space-y-5">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-[13px] text-white/60 font-medium pl-1">วิธีการเก็บรักษา</label>
                                        <input name="storage_method" value={formData.storage_method} onChange={handleChange} placeholder="เช่น เก็บใน Google Drive / ตู้เอกสาร" className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-indigo-500" />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[13px] text-white/60 font-medium pl-1">ระยะเวลาจัดเก็บ</label>
                                        <input name="retention_period" value={formData.retention_period} onChange={handleChange} placeholder="เช่น 10 ปี นับจากวันสิ้นสุดสัญญา" className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-indigo-500" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-[13px] text-white/60 font-medium pl-1">วิธีการลบหรือทำลายเมื่อสิ้นสุด</label>
                                        <input name="deletion_method" value={formData.deletion_method} onChange={handleChange} placeholder="เช่น ลบข้อมูลถาวร / ย่อยเอกสาร" className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-indigo-500" />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[13px] text-white/60 font-medium pl-1">วิธีการและเงื่อนไขการใช้สิทธิเข้าถึง</label>
                                        <input name="access_rights" value={formData.access_rights} onChange={handleChange} placeholder="เช่น ติดต่อผ่าน DPO ของบริษัท" className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-indigo-500" />
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[13px] text-white/60 font-medium pl-1">รายชื่อผู้รับข้อมูล (Recipient)</label>
                                    <input name="recipients" value={formData.recipients} onChange={handleChange} placeholder="ระบุหน่วยงาน หรือบริษัทภายนอกที่ได้รับข้อมูลนี้ไปใช้ต่อ" className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-indigo-500" />
                                </div>
                                
                                <div className="border-t border-white/10 pt-5 space-y-4">
                                    <div className="flex gap-6 items-center">
                                        <span className="text-sm font-bold text-indigo-400">ส่งหรือโอนข้อมูลไปต่างประเทศหรือไม่?</span>
                                        <label className="flex items-center gap-2 cursor-pointer"><input type="radio" checked={formData.international_transfer} onChange={() => setFormData(p => ({...p, international_transfer: true}))} className="accent-indigo-500 w-4 h-4" /> มี</label>
                                        <label className="flex items-center gap-2 cursor-pointer"><input type="radio" checked={!formData.international_transfer} onChange={() => setFormData(p => ({...p, international_transfer: false}))} className="accent-indigo-500 w-4 h-4" /> ไม่มี</label>
                                    </div>
                                    {formData.international_transfer && (
                                        <div className="grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
                                            <div className="space-y-1">
                                                <label className="text-[11px] text-white/40 uppercase pl-1">ประเทศปลายทาง</label>
                                                <input name="transfer_country" value={formData.transfer_country} onChange={handleChange} placeholder="เช่น Singapore" className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-2 text-sm outline-none" />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-[11px] text-white/40 uppercase pl-1">ชื่อบริษัท/กลุ่มบริษัท</label>
                                                <input name="company_name" value={formData.company_name} onChange={handleChange} placeholder="ระบุชื่อบริษัทปลายทาง" className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-2 text-sm outline-none" />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-[11px] text-white/40 uppercase pl-1">วิธีการโอนข้อมูล</label>
                                                <input name="transfer_method" value={formData.transfer_method} onChange={handleChange} placeholder="เช่น SFTP / Cloud Sync" className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-2 text-sm outline-none" />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-[11px] text-white/40 uppercase pl-1">มาตรฐานการคุ้มครองข้อมูล</label>
                                                <input name="protection_standard" value={formData.protection_standard} onChange={handleChange} placeholder="เช่น SCCs / BCAs" className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-2 text-sm outline-none" />
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="space-y-1.5 pt-2">
                                    <label className="text-[13px] text-white/60 font-medium pl-1">บันทึกการปฏิเสธคำขอหรือการใช้สิทธิ (Refusal Record)</label>
                                    <textarea name="refusal_record" value={formData.refusal_record} onChange={handleChange} placeholder="บันทึกข้อมูลเมื่อมีการปฏิเสธการใช้สิทธิของเจ้าของข้อมูล" className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 outline-none h-20 resize-none focus:border-indigo-500" />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* STEP 3: Security Measures & Risk */}
                    {step === 3 && (
                        <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                            <h4 className="text-emerald-400 font-bold flex items-center gap-2 text-sm uppercase tracking-wider"><Lock size={18}/> 3. มาตรการรักษาความมั่นคงปลอดภัยและการประเมินความเสี่ยง</h4>
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
                                                <textarea value={m.detail} onChange={(e) => handleMeasureDetail(i, e.target.value)} placeholder={`อธิบายรายละเอียดของ ${m.label}...`} className="w-full h-24 bg-black/20 rounded-xl px-4 py-3 text-sm outline-none resize-none border border-white/5 focus:border-emerald-500/50" />
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <div className="bg-white/5 p-8 rounded-2xl border border-white/10 space-y-6">
                                <div className="space-y-1">
                                    <h5 className="text-center text-xs uppercase tracking-[0.2em] text-slate-500 font-black">Final Risk Assessment</h5>
                                    <p className="text-center text-[10px] text-white/30">ระดับความเสี่ยงของกิจกรรมประมวลผลนี้</p>
                                </div>
                                <div className="flex justify-center gap-6">
                                    {['Low', 'Medium', 'High'].map(lvl => (
                                        <button 
                                            key={lvl} 
                                            type="button" 
                                            onClick={() => setFormData(p => ({ ...p, risk_level: lvl }))} 
                                            className={`px-10 py-3.5 rounded-2xl border font-bold transition-all shadow-xl ${
                                                formData.risk_level === lvl 
                                                ? 'bg-indigo-600 border-indigo-400 text-white scale-110' 
                                                : 'bg-white/5 border-white/10 text-slate-500 hover:text-white hover:bg-white/10'
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

                {/* Footer Controls */}
                <div className="p-6 border-t border-white/10 bg-slate-900/50 flex justify-between items-center">
                    <button onClick={() => step > 1 ? setStep(step - 1) : onClose()} className="px-6 py-2.5 rounded-xl border border-white/20 text-white/70 hover:bg-white/5 flex items-center gap-2 text-xs font-black uppercase transition-all">
                        {step === 1 ? <><X size={18}/> Cancel</> : <><ChevronLeft size={18}/> Back</>}
                    </button>
                    <div className="flex gap-3">
                        <button onClick={onClose} className="px-6 py-2.5 rounded-xl border border-white/20 text-white/70 hover:bg-white/5 flex items-center gap-2 text-xs font-black uppercase transition-all">
                            <Save size={16}/> Save Draft
                        </button>
                        {step < 3 ? (
                            <button onClick={() => setStep(step + 1)} className="px-8 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 shadow-lg font-black text-xs uppercase flex items-center gap-2 transition-all active:scale-95">
                                Next <ChevronRight size={18}/>
                            </button>
                        ) : (
                            <button onClick={handleSubmit} className="px-8 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 shadow-xl font-black text-xs uppercase flex items-center gap-2 transition-all active:scale-95">
                                Submit RoPA <Send size={16}/>
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}