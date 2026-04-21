'use client';

import { useState, useEffect } from 'react';
import { LayoutDashboard, Users, Shield, FileText, LogOut, Menu, X, ShieldCog } from 'lucide-react';
import { useRouter } from 'next/navigation';

//admin
import { DashboardTab } from '@/components/admin/dashboard-tab';
import { UsersTab } from '@/components/admin/users-tab';
import { RolesTab } from '@/components/admin/roles-tab';
import { AuditTab } from '@/components/admin/audit-tab';

//user
import { DashboardContent } from '@/components/user/dashboard-content';

//manager
import { ManagerDashboardTab } from '@/components/manager/dashboard-tab';

//dpo
import { DpoDashboardTab } from '@/components/dpo/dashboard-tab';
import { DpoRopaTab } from '@/components/dpo/ropa-tab';

//executive
import { ExecutiveDashboardContent } from '@/components/executive/dashboard-content';

//viewer/auditor
import { ViewerDashboardTab } from '@/components/viewer/dashboard-tab';

const TABS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: ['ADMIN'] },
  { id: 'users', label: 'User Management', icon: Users, roles: ['ADMIN'] },
  { id: 'roles', label: 'Roles & Permission', icon: Shield, roles: ['ADMIN'] },
  { id: 'audit', label: 'Audit Logs', icon: FileText, roles: ['ADMIN', 'DATA PROTECTION OFFICER'] },
  { id: 'profile', label: 'Dashboard', icon: Users, roles: ['USER'] },
  { id: 'manager_dashboard', label: 'Dashboard', icon: Users, roles: ['SUPERVISOR'] },
  { id: 'dpo_dashboard', label: 'Dashboard', icon: Shield, roles: ['DATA PROTECTION OFFICER'] },
  { id: 'dpo_ropa', label: 'ROPA Review', icon: ShieldCog , roles: ['DATA PROTECTION OFFICER'] },
  { id: 'executive_dashboard', label: 'Dashboard', icon: Shield, roles: ['EXECUTIVE'] },
  { id: 'viewer_dashboard', label: 'Dashboard', icon: Shield, roles: ['VIEWER', 'AUDITOR'] }
] as const;


type TabId = typeof TABS[number]['id'];

export default function Main() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabId>('dashboard');

  useEffect(() => {
    const role = document.cookie
      .split('; ')
      .find(row => row.startsWith('user-role='))
      ?.split('=')[1];

    if (!role) {
      router.push('/login');
      return;
    }

    setUserRole(role);

    if (role === 'ADMIN') {
      setActiveTab('users'); 
    } else if (role === 'USER') {
      setActiveTab('profile'); 
    } else if (role === 'SUPERVISOR') {
      setActiveTab('manager_dashboard');
    } else if (role === 'DATA PROTECTION OFFICER') {
      setActiveTab('dpo_dashboard');
    } else if (role === 'EXECUTIVE') {
      setActiveTab('executive_dashboard');
    } else if (role === 'VIEWER' || role === 'AUDITOR') {
      setActiveTab('viewer_dashboard');
    }

  }, [router]);

  const handleLogout = () => {
    document.cookie = "auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; samesite=strict";
    document.cookie = "user-role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; samesite=strict";
    router.push('/login');
    router.refresh();
  };

  const allowedTabs = TABS.filter(tab =>
    userRole && (tab.roles as readonly string[]).includes(userRole)
  );

  const renderTab = () => {
    const currentTabSettings = TABS.find(t => t.id === activeTab);

    if (userRole && currentTabSettings && !(currentTabSettings.roles as readonly string[]).includes(userRole)) {
      return userRole === 'ADMIN' ? <DashboardTab /> : <DashboardContent />;
    }

    switch (activeTab) {
      case 'dashboard':
        return userRole === 'ADMIN' ? <DashboardTab /> : <DashboardContent />;

      case 'users': return <UsersTab />;
      case 'roles': return <RolesTab />;
      case 'audit': return <AuditTab />;
      case 'profile': return <DashboardContent />;
      case 'manager_dashboard': return <ManagerDashboardTab />;
      case 'dpo_dashboard': return <DpoDashboardTab onNavigateToRopa={function (): void {
        throw new Error('Function not implemented.');
      } } />;
      case 'dpo_ropa': return <DpoRopaTab />;
      case 'executive_dashboard': return <ExecutiveDashboardContent />;
      case 'viewer_dashboard': return <ViewerDashboardTab />;
      default: return userRole === 'ADMIN' ? <DashboardTab /> : <DashboardContent />;
    }
  };

  return (
    <div className="min-h-screen bg-[#020817] flex text-slate-300 font-sans overflow-hidden">

      <button
        className="md:hidden fixed top-6 right-6 z-50 bg-white/10 p-2 rounded-xl backdrop-blur-md"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <aside className={`
        fixed md:static inset-y-0 left-0 z-40 w-70 bg-[#0b1429] border-r border-slate-800/40 flex flex-col transition-transform duration-300
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="p-8">
          <h1 className="text-3xl font-bold text-white tracking-tight drop-shadow-md">ชื่อเว็บ</h1>
          {userRole && <p className="text-[10px] text-blue-400 font-black mt-1 uppercase tracking-[0.2em]">{userRole}</p>}
        </div>

        <nav className="flex-1 px-4 space-y-1 mt-4">
          {allowedTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all font-bold text-sm tracking-tight ${isActive
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

      <main className="flex-1 h-screen overflow-y-auto bg-[#020817]">
        <div className="p-8 pt-20 md:p-12 lg:p-16 max-w-350 mx-auto">
          {renderTab()}
        </div>
      </main>

    </div>
  );
}