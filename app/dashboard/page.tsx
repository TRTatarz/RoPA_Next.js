'use client';

import { useState } from 'react';
import { LayoutDashboard, Users, Shield, FileText, LogOut, Menu, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { DashboardTab } from '@/components/admin/dashboard-tab';
import { UsersTab } from '@/components/admin/users-tab';
import { RolesTab } from '@/components/admin/roles-tab';
import { AuditTab } from '@/components/admin/audit-tab';

const TABS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'users', label: 'User Management', icon: Users },
  { id: 'roles', label: 'Roles & Permission', icon: Shield },
  { id: 'audit', label: 'Audit Logs', icon: FileText },
] as const;

type TabId = typeof TABS[number]['id'];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<TabId>('users'); // Defaulting to users to match screenshot
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    document.cookie = "auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; samesite=strict";
    document.cookie = "user-role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; samesite=strict";
    router.push('/login');
    router.refresh(); 
  };

  const renderTab = () => {
    switch (activeTab) {
      case 'dashboard': return <DashboardTab />;
      case 'users': return <UsersTab />;
      case 'roles': return <RolesTab />;
      case 'audit': return <AuditTab />;
      default: return <DashboardTab />;
    }
  };

  return (
    <div className="min-h-screen bg-[#020817] flex text-slate-300 font-sans overflow-hidden">
      
      {/* Mobile Menu Toggle */}
      <button 
        className="md:hidden fixed top-6 right-6 z-50 bg-white/10 p-2 rounded-xl backdrop-blur-md"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside className={`
        fixed md:static inset-y-0 left-0 z-40 w-[280px] bg-[#0b1429] border-r border-slate-800/40 flex flex-col transition-transform duration-300
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="p-8">
          <h1 className="text-3xl font-bold text-white tracking-tight drop-shadow-md">ชื่อเว็บ</h1>
        </div>

        <nav className="flex-1 px-4 space-y-1 mt-4">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all font-bold text-sm tracking-tight ${
                  isActive 
                    ? 'bg-[#21293e] text-white shadow-sm' 
                    : 'text-slate-500 hover:text-slate-300 hover:bg-[#1a2337]'
                }`}
              >
                <Icon size={20} className={isActive ? 'text-blue-400' : ''} />
                {tab.label}
              </button>
            );
          })}
        </nav>

        {/* Maroon Log Out Button */}
        <div className="p-4 mb-2">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all font-bold bg-[#3f2532] text-sm text-[#f43f5e] hover:bg-[#d03131] hover:text-white"
          >
            <LogOut size={20} className="rotate-180" />
            Log out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 h-screen overflow-y-auto bg-[#020817]">
        <div className="p-8 pt-20 md:p-12 lg:p-16 max-w-[1400px] mx-auto">
          {renderTab()}
        </div>
      </main>

    </div>
  );
}