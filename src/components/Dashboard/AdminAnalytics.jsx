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
    const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7));
    const [monthlyData, setMonthlyData] = useState([]);

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
                    }).catch(() => ({ data: { transactions: [] } })),
                ]);

                const users = usersRes.data.users;
                const tuitions = tuitionsRes.data.tuitions;
                const transactions = paymentsRes.data.transactions || [];

                const studentCount = users.filter((u) => u.role === 'Student').length;
                const tutorCount = users.filter((u) => u.role === 'Tutor').length;
                const adminCount = users.filter((u) => u.role === 'Admin').length;

                const approvedCount = tuitions.filter((t) => t.status === 'Approved').length;
                const pendingCount = tuitions.filter((t) => t.status === 'Pending').length;
                const rejectedCount = tuitions.filter((t) => t.status === 'Rejected').length;

                // Filter for successful transactions only
                const successfulTransactions = transactions.filter((t) => t.status === 'Successful' || t.status === 'success');
                const totalEarnings = successfulTransactions.reduce((sum, p) => sum + p.amount, 0);

                setStats({
                    totalUsers: users.length,
                    students: studentCount,
                    tutors: tutorCount,
                    admins: adminCount,
                    totalTuitions: tuitions.length,
                    approvedTuitions: approvedCount,
                    pendingTuitions: pendingCount,
                    rejectedTuitions: rejectedCount,
                    totalTransactions: successfulTransactions.length,
                    totalEarnings: totalEarnings,
                });

                setPayments(successfulTransactions.sort((a, b) => new Date(b.transactionDate) - new Date(a.transactionDate)));

                // Calculate monthly earnings
                const monthlyMap = {};
                successfulTransactions.forEach((txn) => {
                    const month = new Date(txn.transactionDate).toISOString().slice(0, 7);
                    monthlyMap[month] = (monthlyMap[month] || 0) + txn.amount;
                });
                setMonthlyData(Object.entries(monthlyMap).map(([month, amount]) => ({ month, amount })).sort((a, b) => a.month.localeCompare(b.month)));
            } catch (error) {
                console.error('Error fetching analytics:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchAnalytics();
    }, []);

    // Calculate monthly earnings for selected month
    const selectedMonthEarnings = monthlyData.find(m => m.month === selectedMonth)?.amount || 0;
    const selectedMonthTransactions = payments.filter(p => new Date(p.transactionDate).toISOString().slice(0, 7) === selectedMonth).length;

    if (loading) {
        return <span className="loading loading-spinner loading-lg"></span>;
    }

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6">Reports & Analytics</h2>

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

            {/* Financial Summary */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Total Earnings Card */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg shadow-md p-8">
                    <h3 className="text-lg opacity-90 mb-2">Total Platform Earnings</h3>
                    <p className="text-5xl font-bold mb-4">৳{stats.totalEarnings.toLocaleString()}</p>
                    <div className="flex justify-between items-center opacity-90">
                        <span>All successful transactions</span>
                        <span className="text-2xl">{stats.totalTransactions} transactions</span>
                    </div>
                </div>

                {/* Monthly Report Card */}
                <div className="bg-gradient-to-r from-emerald-600 to-emerald-800 text-white rounded-lg shadow-md p-8">
                    <div className="mb-4">
                        <label className="text-sm opacity-90">View Monthly Report</label>
                        <input 
                            type="month" 
                            value={selectedMonth}
                            onChange={(e) => setSelectedMonth(e.target.value)}
                            className="input input-bordered w-full mt-2 text-gray-800"
                        />
                    </div>
                    <div>
                        <h3 className="text-lg opacity-90 mb-2">{selectedMonth} Earnings</h3>
                        <p className="text-5xl font-bold mb-2">৳{selectedMonthEarnings.toLocaleString()}</p>
                        <p className="opacity-90">{selectedMonthTransactions} transactions this month</p>
                    </div>
                </div>
            </div>

            {/* Monthly Trends */}
            {monthlyData.length > 0 && (
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <h3 className="text-xl font-bold mb-6">Monthly Earnings Trend</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {monthlyData.map((data, index) => (
                            <div key={index} className="bg-blue-50 rounded-lg p-4">
                                <p className="text-sm text-gray-600">{new Date(data.month + '-01').toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</p>
                                <p className="text-2xl font-bold text-blue-600">৳{data.amount.toLocaleString()}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Recent Successful Transactions */}
            {payments.length > 0 && (
                <div className="bg-white rounded-lg shadow-md overflow-x-auto">
                    <div className="p-6 border-b">
                        <h3 className="text-xl font-bold">Successful Transaction History</h3>
                        <p className="text-sm text-gray-600 mt-1">All successful payments made by users</p>
                    </div>
                    <table className="w-full">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="px-6 py-3 text-left">Transaction ID</th>
                                <th className="px-6 py-3 text-left">Amount</th>
                                <th className="px-6 py-3 text-left">Status</th>
                                <th className="px-6 py-3 text-left">Date</th>
                                <th className="px-6 py-3 text-left">Type</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments.slice(0, 20).map((payment) => (
                                <tr key={payment._id} className="border-b hover:bg-gray-50">
                                    <td className="px-6 py-4 font-mono text-sm">{payment.transactionId}</td>
                                    <td className="px-6 py-4 font-semibold">৳{payment.amount.toLocaleString()}</td>
                                    <td className="px-6 py-4">
                                        <span className="badge badge-success">Successful</span>
                                    </td>
                                    <td className="px-6 py-4">{new Date(payment.transactionDate).toLocaleDateString()} {new Date(payment.transactionDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded">
                                            {payment.type || 'Tuition Fee'}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="p-4 bg-gray-50 text-center text-sm text-gray-600">
                        Showing {Math.min(20, payments.length)} of {payments.length} total successful transactions
                    </div>
                </div>
            )}

            {payments.length === 0 && (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <p className="text-gray-500 text-lg">No successful transactions yet</p>
                </div>
            )}
        </div>
    );
};

export default AdminAnalytics;
