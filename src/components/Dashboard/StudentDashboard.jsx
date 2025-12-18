import React, { useState, useContext, useEffect} from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { AuthContext } from '../../provider/AuthProvider';

const StudentDashboard = () => {
    useEffect(() => {
    document.title = 'eTuitionBD - Student Dashboard';
  }, []);
    const { user } = useContext(AuthContext);
    const location = useLocation();
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const isActive = (path) => location.pathname === path;

    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* Sidebar */}
            <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-blue-800 text-white transition-all duration-300`}>
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
                        to="/student-dashboard/my-tuitions"
                        className={`flex items-center gap-4 px-4 py-3 rounded-lg transition ${
                            isActive('/student-dashboard/my-tuitions') ? 'bg-blue-600' : 'hover:bg-blue-700'
                        }`}
                    >
                        <span className="text-xl">📚</span>
                        {sidebarOpen && <span>My Tuitions</span>}
                    </Link>
                    <Link
                        to="/student-dashboard/post-tuition"
                        className={`flex items-center gap-4 px-4 py-3 rounded-lg transition ${
                            isActive('/student-dashboard/post-tuition') ? 'bg-blue-600' : 'hover:bg-blue-700'
                        }`}
                    >
                        <span className="text-xl">➕</span>
                        {sidebarOpen && <span>Post Tuition</span>}
                    </Link>
                    <Link
                        to="/student-dashboard/applied-tutors"
                        className={`flex items-center gap-4 px-4 py-3 rounded-lg transition ${
                            isActive('/student-dashboard/applied-tutors') ? 'bg-blue-600' : 'hover:bg-blue-700'
                        }`}
                    >
                        <span className="text-xl">👥</span>
                        {sidebarOpen && <span>Applied Tutors</span>}
                    </Link>
                    <Link
                        to="/student-dashboard/payments"
                        className={`flex items-center gap-4 px-4 py-3 rounded-lg transition ${
                            isActive('/student-dashboard/payments') ? 'bg-blue-600' : 'hover:bg-blue-700'
                        }`}
                    >
                        <span className="text-xl">💳</span>
                        {sidebarOpen && <span>Payments</span>}
                    </Link>
                    <Link
                        to="/student-dashboard/settings"
                        className={`flex items-center gap-4 px-4 py-3 rounded-lg transition ${
                            isActive('/student-dashboard/settings') ? 'bg-blue-600' : 'hover:bg-blue-700'
                        }`}
                    >
                        <span className="text-xl">⚙️</span>
                        {sidebarOpen && <span>Settings</span>}
                    </Link>
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1">
                <div className="bg-white shadow-md p-6 mb-6 flex justify-between items-center">
                    <h1 className="text-3xl font-bold">Student Dashboard</h1>
                    <div className="text-right">
                        <p className="text-lg font-semibold">{user?.displayName || 'Student'}</p>
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

export default StudentDashboard;
