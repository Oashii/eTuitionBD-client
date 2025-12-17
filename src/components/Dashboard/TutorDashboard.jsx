import React, { useState, useContext } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { AuthContext } from '../../provider/AuthProvider';

const TutorDashboard = () => {
    const { user } = useContext(AuthContext);
    const location = useLocation();
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const isActive = (path) => location.pathname === path;

    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* Sidebar */}
            <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-green-800 text-white transition-all duration-300`}>
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
                        to="/tutor-dashboard/my-applications"
                        className={`flex items-center gap-4 px-4 py-3 rounded-lg transition ${
                            isActive('/tutor-dashboard/my-applications') ? 'bg-green-600' : 'hover:bg-green-700'
                        }`}
                    >
                        <span className="text-xl">📋</span>
                        {sidebarOpen && <span>My Applications</span>}
                    </Link>
                    <Link
                        to="/tutor-dashboard/ongoing-tuitions"
                        className={`flex items-center gap-4 px-4 py-3 rounded-lg transition ${
                            isActive('/tutor-dashboard/ongoing-tuitions') ? 'bg-green-600' : 'hover:bg-green-700'
                        }`}
                    >
                        <span className="text-xl">📚</span>
                        {sidebarOpen && <span>Ongoing Tuitions</span>}
                    </Link>
                    <Link
                        to="/tutor-dashboard/revenue"
                        className={`flex items-center gap-4 px-4 py-3 rounded-lg transition ${
                            isActive('/tutor-dashboard/revenue') ? 'bg-green-600' : 'hover:bg-green-700'
                        }`}
                    >
                        <span className="text-xl">💰</span>
                        {sidebarOpen && <span>Revenue History</span>}
                    </Link>
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1">
                <div className="bg-white shadow-md p-6 mb-6 flex justify-between items-center">
                    <h1 className="text-3xl font-bold">Tutor Dashboard</h1>
                    <div className="text-right">
                        <p className="text-lg font-semibold">{user?.displayName || 'Tutor'}</p>
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

export default TutorDashboard;
