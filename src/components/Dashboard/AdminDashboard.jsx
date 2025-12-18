import React, { useState, useContext, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { AuthContext } from '../../provider/AuthProvider';

const AdminDashboard = () => {
    useEffect(() => {
    document.title = 'eTuitionBD - Admin Dashboard';
  }, []);
    const { user } = useContext(AuthContext);
    const location = useLocation();
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const isActive = (path) => location.pathname === path;

    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* Sidebar */}
            <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-red-800 text-white transition-all duration-300`}>
                <div className="p-4">
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="btn btn-ghost btn-circle text-white"
                    >
                        ☰
                    </button>
                </div>

                <nav className="mt-8 space-y-2 px-4">
                    <Link
                        to="/admin-dashboard/users"
                        className={`flex items-center gap-4 px-4 py-3 rounded-lg transition ${
                            isActive('/admin-dashboard/users') ? 'bg-red-600' : 'hover:bg-red-700'
                        }`}
                    >
                        <span className="text-xl">👥</span>
                        {sidebarOpen && <span>User Management</span>}
                    </Link>
                    <Link
                        to="/admin-dashboard/tuitions"
                        className={`flex items-center gap-4 px-4 py-3 rounded-lg transition ${
                            isActive('/admin-dashboard/tuitions') ? 'bg-red-600' : 'hover:bg-red-700'
                        }`}
                    >
                        <span className="text-xl">📚</span>
                        {sidebarOpen && <span>Tuition Management</span>}
                    </Link>
                    <Link
                        to="/admin-dashboard/analytics"
                        className={`flex items-center gap-4 px-4 py-3 rounded-lg transition ${
                            isActive('/admin-dashboard/analytics') ? 'bg-red-600' : 'hover:bg-red-700'
                        }`}
                    >
                        <span className="text-xl">📊</span>
                        {sidebarOpen && <span>Analytics</span>}
                    </Link>
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1">
                <div className="bg-white shadow-md p-6 mb-6 flex justify-between items-center">
                    <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                    <div className="text-right">
                        <p className="text-lg font-semibold">{user?.displayName || 'Admin'}</p>
                        <p className="text-gray-600">{user?.email}</p>
                    </div>
                </div>

                <div className="p-6">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
