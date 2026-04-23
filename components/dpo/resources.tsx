'use client';

export function DpoResources() {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-6xl mx-auto relative h-full flex flex-col">
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-blue-600/10 blur-[120px]" />
        <div className="absolute top-[20%] -right-[10%] w-[30%] h-[30%] rounded-full bg-indigo-600/10 blur-[120px]" />
      </div>

      <div className="flex flex-col gap-1 relative z-10">
        <h2 className="text-4xl font-bold text-white tracking-tight">DPO Resources</h2>
        <p className="text-slate-500 text-base font-medium uppercase tracking-widest">GUIDES, TEMPLATES, AND BEST PRACTICES</p>
      </div>
    </div>
  );
}