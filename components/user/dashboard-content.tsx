import { useState, useEffect, useMemo } from 'react';
import { Search, Filter, Plus, Edit2, Trash2, CheckCircle2, XCircle, Clock, ChevronDown } from 'lucide-react';
import { RopaModal } from './ropa-modal';
import { EditRopaModal } from './edit-ropa-modal';
import * as XLSX from 'xlsx';

export function DashboardContent() {
  const [isRopaModalOpen, setIsRopaModalOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [requests, setRequests] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const handleExportExcel = () => { alert('Exporting...') }
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://ropa-backend-production-aaf0.up.railway.app";

  // --- ส่วนที่เพิ่มใหม่: Pagination State ---
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; // กำหนดจำนวนการแสดงต่อครั้ง

  const fetchRopaData = async () => {
    try {
      const response = await fetch(`${API_URL}/api/ropa/`);
      if (response.ok) {
        const data = await response.json();
        setRequests(data);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("คุณแน่ใจหรือไม่ว่าต้องการลบรายการนี้?")) {
      try {
        const response = await fetch(`${API_URL}/api/ropa/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          // เมื่อลบสำเร็จ ให้ดึงข้อมูลใหม่มาแสดงทันที
          fetchRopaData();
        } else {
          alert("ไม่สามารถลบข้อมูลได้");
        }

      } catch (error) {
        console.error("Delete error:", error, "Id test", id);
        alert("เกิดข้อผิดพลาดในการเชื่อมต่อ");
      }
    }
  };

  useEffect(() => {
    fetchRopaData();
  }, []);

  const summaryStats = useMemo(() => {
    return [
      { title: 'ทั้งหมด', value: requests.length.toString() },
      {
        title: 'อนุมัติแล้ว',
        value: requests.filter(r => r.status === 'Completed').length.toString()
      },
      {
        title: 'รอดำเนินการ',
        value: requests.filter(r => r.status === 'Pending' || r.status === 'Draft').length.toString()
      },
      {
        title: 'ไม่อนุมัติ',
        value: requests.filter(r => r.status === 'Reject').length.toString()
      }
    ];
  }, [requests]);

  // กรองข้อมูลตาม Search และ Filter ก่อนนำไปแบ่งหน้า
  const filteredRequests = useMemo(() => {
    return requests.filter(req => {
      // กรองคำค้นหา
      const matchesSearch = req.processing_activity?.toLowerCase().includes(searchQuery.toLowerCase());

      // กรองสถานะ (ถ้าเลือก All ให้ผ่านหมด ถ้าไม่ใช่ All ต้องมี status ตรงกับที่เลือก)
      const matchesFilter = selectedFilter === "All" || req.status === selectedFilter;

      return matchesSearch && matchesFilter;
    });
  }, [requests, searchQuery, selectedFilter]);

  // --- ส่วนที่เพิ่มใหม่: คำนวณข้อมูลที่จะแสดงในหน้านั้นๆ ---
  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * itemsPerPage;
    const lastPageIndex = firstPageIndex + itemsPerPage;
    return filteredRequests.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, filteredRequests]);

  // เมื่อค้นหาหรือกรอง ให้กลับไปหน้า 1 เสมอ
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedFilter]);

  // ฟังก์ชันสำหรับจัดการการ Import
  const handleImportExcel = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const data = event.target?.result;
        // ใช้ XLSX อ่านข้อมูลจากไฟล์
        const workbook = XLSX.read(data, { type: 'binary' });
        const sheetName = workbook.SheetNames[0]; // เลือก Sheet แรก
        const sheet = workbook.Sheets[sheetName];

        // แปลงข้อมูลใน Sheet เป็น JSON (Array ของ Object)
        const jsonData = XLSX.utils.sheet_to_json(sheet);

        if (jsonData.length === 0) {
          alert("ไม่พบข้อมูลในไฟล์ Excel");
          return;
        }

        // ยิง API ไปที่ Backend (เส้นทางที่เราคุยกันไว้)
        const response = await fetch(`${API_URL}/api/ropa/import`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(jsonData),
        });

        if (response.ok) {
          alert(`Import สำเร็จทั้งหมด ${jsonData.length} รายการ`);
          fetchRopaData(); // สั่งให้หน้าจอโหลดข้อมูลใหม่ทันที
        } else {
          const errorData = await response.json();
          alert("Import ล้มเหลว: " + (errorData.detail || "ตรวจสอบหัวตาราง Excel"));
        }
      } catch (error) {
        console.error("Import Error:", error);
        alert("เกิดข้อผิดพลาดในการอ่านไฟล์");
      }
    };
    reader.readAsBinaryString(file);

    // Reset ค่า input เพื่อให้เลือกไฟล์เดิมซ้ำได้ถ้าต้องการ
    e.target.value = "";
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-6xl mx-auto relative flex flex-col h-full">
      {/* ... ส่วน Background และ Header (เหมือนเดิม) ... */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-blue-600/10 blur-[120px]" />
        <div className="absolute top-[20%] -right-[10%] w-[30%] h-[30%] rounded-full bg-indigo-600/10 blur-[120px]" />
      </div>

      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 relative z-10">
        <div className="flex flex-col gap-1">
          <h2 className="text-4xl font-bold text-white tracking-tight">Department Dashboard</h2>
          <p className="text-slate-500 text-base font-medium">ROPA Records Management</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* ปุ่ม Import - คลิกแล้วเลือกไฟล์ได้เลย */}
          <label className="cursor-pointer bg-slate-800/50 hover:bg-slate-700 border border-slate-700/50 text-slate-300 px-6 py-2.5 rounded-full transition-all text-xs font-bold uppercase tracking-widest flex items-center gap-2 active:scale-95">
            Import
            <input
              type="file"
              accept=".xlsx, .xls"
              className="hidden"
              onChange={handleImportExcel}
            />
          </label>

          {/* ปุ่ม Export - ใส่ onClick รอไว้ได้เลย */}
          <button
            onClick={handleExportExcel}
            className="bg-slate-800/50 hover:bg-slate-700 border border-slate-700/50 text-slate-300 px-6 py-2.5 rounded-full transition-all text-xs font-bold uppercase tracking-widest active:scale-95"
          >
            Export
          </button>

          {/* ปุ่มเพิ่มรายการใหม่ */}
          <button
            onClick={() => setIsRopaModalOpen(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-full transition-all text-xs font-bold shadow-lg shadow-blue-900/20 active:scale-95 tracking-widest uppercase shrink-0"
          >
            <Plus size={16} /> ROPA Records
          </button>
        </div>
      </div>

      {/* Summary Cards (เหมือนเดิม) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 xl:gap-8 relative z-10">
        {summaryStats.map((s, i) => (
          <div key={i} className="bg-[#0b1429]/40 backdrop-blur-xl border border-slate-800/60 rounded-[24px] p-8 shadow-2xl group hover:border-blue-500/30 transition-all flex flex-col justify-between">
            <h3 className="text-slate-500 text-[11px] font-bold uppercase tracking-widest mb-2 leading-tight">{s.title}</h3>
            <p className="text-4xl font-black text-white tracking-tighter">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Main Panel */}
      <div className="bg-[#0b1429]/30 backdrop-blur-xl border border-slate-800/60 rounded-[32px] flex flex-col shadow-2xl flex-1 relative z-10 overflow-hidden">

        {/* Toolbar (เหมือนเดิม) */}
        <div className="p-8 border-b border-slate-800/60 flex flex-col sm:flex-row gap-4 items-center justify-between bg-slate-900/20">
          <div className="relative w-full sm:max-w-md group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors" size={18} />
            <input
              type="text"
              placeholder="ค้นหาชื่อกิจกรรม.............."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900/40 border border-slate-800 rounded-xl py-3.5 pl-12 pr-4 text-sm text-slate-200 placeholder:text-slate-600 outline-none focus:ring-1 ring-blue-500/50 transition-all font-medium"
            />
          </div>

          <div className="relative w-full sm:w-auto">
            <button onClick={() => setFilterOpen(!filterOpen)} className="flex items-center justify-between w-full sm:w-48 gap-2 bg-slate-800/50 hover:bg-slate-700 border border-slate-700/50 px-5 py-3 rounded-xl transition-all text-xs font-bold text-slate-300 uppercase tracking-widest shrink-0">
              <span className="flex items-center gap-2"><Filter size={14} className="text-emerald-400" /> {selectedFilter}</span>
              <ChevronDown size={14} className="opacity-30" />
            </button>
            {filterOpen && (
              <div className="absolute right-0 top-full mt-2 w-full bg-slate-800 border border-slate-700 rounded-xl shadow-2xl overflow-hidden py-1 z-20">
                {['All', 'Pending', 'Completed', 'Reject', 'Draft'].map(v => (
                  <button key={v} onClick={() => { setSelectedFilter(v); setFilterOpen(false); }} className="w-full text-left px-5 py-3 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-white hover:bg-slate-700 transition-colors border-b border-slate-700/50 last:border-0">{v}</button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* List Content - แสดงเฉพาะ 3 ตัวตาม currentTableData */}
        <div className="flex-1 flex flex-col min-h-[450px]">
          <div className="px-8 py-6 bg-slate-900/20 border-b border-slate-800/60">
            <h3 className="font-bold text-white text-[15px] tracking-wide">คำขออนุมัติของฉัน</h3>
          </div>

          <div className="divide-y divide-slate-800/40">
            {currentTableData.map((req) => (
              <div key={req.id} className="p-8 hover:bg-slate-800/20 transition-colors relative group">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h4 className="font-bold text-lg text-white leading-tight">{req.processing_activity}</h4>
                    <p className="text-slate-400 text-[13px] mt-1 font-medium">{req.controller_name}</p>
                  </div>
                  <div className={`flex items-center gap-2 px-3 py-1 rounded-full border text-[10px] font-black uppercase tracking-wider ${req.status === 'Completed' ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400' :
                    req.status === 'Reject' ? 'border-red-500/30 bg-red-500/10 text-red-400' :
                      req.status === 'Draft' ? 'border-slate-500/30 bg-slate-500/10 text-slate-400' :
                        'border-yellow-500/30 bg-yellow-500/10 text-yellow-500'
                    }`}>
                    {req.status || 'Pending'}
                  </div>
                </div>
                <div className="flex justify-between items-end">
                  <div className="text-[13px] text-slate-500 font-medium">
                    <p>วัตถุประสงค์: {req.purpose}</p>
                    <p className="mt-1 text-[11px] opacity-50">ประเภทข้อมูล: {req.data_type}</p>
                  </div>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => {
                        setSelectedId(req.id); // เก็บ ID ของรายการที่จะแก้
                        setIsEditModalOpen(true); // เปิดหน้า Edit
                      }}
                      className={`transition-colors ${(req.status === 'Reject' || req.status === 'Draft')
                        ? 'text-slate-400 hover:text-white'
                        : 'text-slate-700 cursor-not-allowed opacity-30'
                        }`}
                      disabled={!(req.status === 'Reject' || req.status === 'Draft')}
                    >
                      <div className="p-2 bg-slate-800 border border-slate-700/50 rounded-lg">
                        <Edit2 size={16} />
                      </div>
                    </button>
                    <button
                      onClick={() => handleDelete(req.id)}
                      disabled={!(req.status === 'Reject' || req.status === 'Draft')}
                      className={`transition-colors ${(req.status === 'Reject' || req.status === 'Draft')
                          ? 'text-slate-500 hover:text-red-400'
                          : 'text-slate-700 cursor-not-allowed opacity-30'
                        }`}
                      title={req.status === 'Completed' ? "Cannot delete completed record" : "Delete"}
                    >
                      <div className="p-2 bg-slate-800 border border-slate-700/50 rounded-lg">
                        <Trash2 size={16} />
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination Toolbar - ใช้งานได้จริงแล้ว */}
        <div className="p-6 border-t border-slate-800 flex flex-col sm:flex-row gap-4 items-center justify-between text-[11px] text-slate-500 bg-slate-900/30 shrink-0 font-bold uppercase tracking-widest mt-auto">
          <p className="font-medium">
            แสดง {Math.min(currentPage * itemsPerPage, filteredRequests.length)} จาก {filteredRequests.length} รายการ
          </p>
          <div className="flex items-center gap-2">
            {/* ปุ่มย้อนกลับ */}
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`w-9 h-9 flex items-center justify-center rounded-xl border border-slate-800 transition-all ${currentPage === 1 ? 'opacity-20 cursor-not-allowed' : 'hover:bg-slate-800 text-slate-400'}`}
            >
              &lt;&lt;
            </button>

            {/* เลขหน้าปัจจุบัน */}
            <button className="w-9 h-9 flex items-center justify-center rounded-xl bg-blue-600 text-white font-black shadow-lg shadow-blue-900/20">
              {currentPage}
            </button>

            {/* ปุ่มหน้าถัดไป */}
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages || totalPages === 0}
              className={`w-9 h-9 flex items-center justify-center rounded-xl border border-slate-800 transition-all ${currentPage === totalPages || totalPages === 0 ? 'opacity-20 cursor-not-allowed' : 'hover:bg-slate-800 text-slate-400'}`}
            >
              &gt;&gt;
            </button>
          </div>
        </div>
      </div>
      {/* Modal สำหรับสร้างใหม่  */}
      {isRopaModalOpen && <RopaModal onClose={() => { setIsRopaModalOpen(false); fetchRopaData(); }} />}

      {/* Component EditRopaModal  */}
      {isEditModalOpen && (
        <EditRopaModal
          ropaId={selectedId}
          onClose={() => {
            setIsEditModalOpen(false);
            fetchRopaData();
          }}
        />
      )}

    </div>
  );
}