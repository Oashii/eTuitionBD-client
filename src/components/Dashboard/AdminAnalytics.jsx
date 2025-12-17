import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminAnalytics = () => {
    const [stats, setStats] = useState({
        totalUsers: 0,
        students: 0,
        tutors: 0,
        admins: 0,
        totalTuitions: 0,
        approvedTuitions: 0,
        pendingTuitions: 0,
        rejectedTuitions: 0,
        totalTransactions: 0,
        totalEarnings: 0,
    });
    const [loading, setLoading] = useState(true);
    const [payments, setPayments] = useState([]);

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const [usersRes, tuitionsRes, paymentsRes] = await Promise.all([
                    axios.get('http://localhost:5000/api/admin/users', {
                        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                    }),
                    axios.get('http://localhost:5000/api/admin/tuitions', {
                        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                    }),
                    axios.get('http://localhost:5000/api/admin/transactions', {
                        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                    }).catch(() => ({ data: { payments: [] } })),
                ]);

                const users = usersRes.data.users;
                const tuitions = tuitionsRes.data.tuitions;
                const payments = paymentsRes.data.payments || [];

                const studentCount = users.filter((u) => u.role === 'Student').length;
                const tutorCount = users.filter((u) => u.role === 'Tutor').length;
                const adminCount = users.filter((u) => u.role === 'Admin').length;

                const approvedCount = tuitions.filter((t) => t.status === 'Approved').length;
                const pendingCount = tuitions.filter((t) => t.status === 'Pending').length;
                const rejectedCount = tuitions.filter((t) => t.status === 'Rejected').length;

                const totalEarnings = payments.reduce((sum, p) => sum + p.amount, 0);

                setStats({
                    totalUsers: users.length,
                    students: studentCount,
                    tutors: tutorCount,
                    admins: adminCount,
                    totalTuitions: tuitions.length,
                    approvedTuitions: approvedCount,
                    pendingTuitions: pendingCount,
                    rejectedTuitions: rejectedCount,
                    totalTransactions: payments.length,
                    totalEarnings: totalEarnings,
                });

                setPayments(payments.slice(0, 10)); // Last 10 payments
            } catch (error) {
                console.error('Error fetching analytics:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchAnalytics();
    }, []);

    if (loading) {
        return <span className="loading loading-spinner loading-lg"></span>;
    }

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6">Platform Analytics</h2>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-gray-600 text-sm font-semibold mb-2">Total Users</h3>
                    <p className="text-3xl font-bold">{stats.totalUsers}</p>
                </div>
                <div className="bg-blue-50 rounded-lg shadow-md p-6">
                    <h3 className="text-blue-600 text-sm font-semibold mb-2">Students</h3>
                    <p className="text-3xl font-bold">{stats.students}</p>
                </div>
                <div className="bg-green-50 rounded-lg shadow-md p-6">
                    <h3 className="text-green-600 text-sm font-semibold mb-2">Tutors</h3>
                    <p className="text-3xl font-bold">{stats.tutors}</p>
                </div>
                <div className="bg-purple-50 rounded-lg shadow-md p-6">
                    <h3 className="text-purple-600 text-sm font-semibold mb-2">Admins</h3>
                    <p className="text-3xl font-bold">{stats.admins}</p>
                </div>
            </div>

            {/* Tuition Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-gray-600 text-sm font-semibold mb-2">Total Tuitions</h3>
                    <p className="text-3xl font-bold">{stats.totalTuitions}</p>
                </div>
                <div className="bg-green-50 rounded-lg shadow-md p-6">
                    <h3 className="text-green-600 text-sm font-semibold mb-2">Approved</h3>
                    <p className="text-3xl font-bold">{stats.approvedTuitions}</p>
                </div>
                <div className="bg-yellow-50 rounded-lg shadow-md p-6">
                    <h3 className="text-yellow-600 text-sm font-semibold mb-2">Pending</h3>
                    <p className="text-3xl font-bold">{stats.pendingTuitions}</p>
                </div>
                <div className="bg-red-50 rounded-lg shadow-md p-6">
                    <h3 className="text-red-600 text-sm font-semibold mb-2">Rejected</h3>
                    <p className="text-3xl font-bold">{stats.rejectedTuitions}</p>
                </div>
            </div>

            {/* Financial Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg shadow-md p-6">
                    <h3 className="text-lg opacity-90">Total Platform Earnings</h3>
                    <p className="text-4xl font-bold">৳{stats.totalEarnings.toLocaleString()}</p>
                </div>
                <div className="bg-gradient-to-r from-green-600 to-green-800 text-white rounded-lg shadow-md p-6">
                    <h3 className="text-lg opacity-90">Total Transactions</h3>
                    <p className="text-4xl font-bold">{stats.totalTransactions}</p>
                </div>
            </div>

            {/* Recent Transactions */}
            {payments.length > 0 && (
                <div className="bg-white rounded-lg shadow-md overflow-x-auto">
                    <div className="p-6 border-b">
                        <h3 className="text-xl font-bold">Recent Transactions</h3>
                    </div>
                    <table className="w-full">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="px-6 py-3 text-left">Transaction ID</th>
                                <th className="px-6 py-3 text-left">Amount</th>
                                <th className="px-6 py-3 text-left">Status</th>
                                <th className="px-6 py-3 text-left">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments.map((payment) => (
                                <tr key={payment._id} className="border-b hover:bg-gray-50">
                                    <td className="px-6 py-4 font-mono text-sm">{payment.transactionId}</td>
                                    <td className="px-6 py-4 font-semibold">৳{payment.amount}</td>
                                    <td className="px-6 py-4">
                                        <span className="badge badge-success">{payment.status}</span>
                                    </td>
                                    <td className="px-6 py-4">{new Date(payment.transactionDate).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AdminAnalytics;
