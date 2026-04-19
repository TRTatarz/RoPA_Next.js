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
  const [activeTab, setActiveTab] = useState<TabId>('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    router.push('/');
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
    <div className="min-h-screen bg-[#091833] flex text-white font-sans overflow-hidden">
      
      {/* Mobile Menu Toggle */}
      <button 
        className="md:hidden fixed top-6 right-6 z-50 bg-white/10 p-2 rounded-xl backdrop-blur-md"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div className={`
        fixed md:static inset-y-0 left-0 z-40 w-72 bg-[#091833]/95 md:bg-white/5 backdrop-blur-2xl border-r border-white/10 flex flex-col transition-transform duration-300
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="p-8">
          <h1 className="text-4xl font-black tracking-tight drop-shadow-md">ชื่อเว็บ</h1>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
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
                className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all font-semibold text-sm ${
                  isActive 
                    ? 'bg-white/10 text-white shadow-[0_4px_12px_rgba(0,0,0,0.1)] border border-white/10' 
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon size={20} className={isActive ? 'text-indigo-400' : ''} />
                {tab.label}
              </button>
            );
          })}
        </nav>

        <div className="p-6">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all font-semibold text-sm text-white/50 hover:text-white hover:bg-white/5"
          >
            <LogOut size={20} />
            Log out
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 h-screen overflow-y-auto">
        <div className="p-6 pt-20 md:p-10 lg:p-12 xl:p-16 max-w-[1600px] mx-auto h-full">
          {renderTab()}
        </div>
      </div>

    </div>
  );
}
