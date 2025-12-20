import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../provider/AuthProvider';

const StudentPayments = () => {
    const { user } = useContext(AuthContext);
    const [payments, setPayments] = useState([]);
    const [totalPaid, setTotalPaid] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const response = await axios.get('https://etuitionbd.vercel.app/api/my-payments', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setPayments(response.data.payments);
                setTotalPaid(response.data.totalPaid);
            } catch (error) {
                console.error('Error fetching payments:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchPayments();
    }, []);

    if (loading) {
        return <span className="loading loading-spinner loading-lg"></span>;
    }

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6">Payment History</h2>

            {/* Summary */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg shadow-md p-6 mb-8">
                <p className="text-lg opacity-90">Total Amount Paid</p>
                <p className="text-4xl font-bold">৳{totalPaid.toLocaleString()}</p>
            </div>

            {/* Payment List */}
            {payments.length > 0 ? (
                <div className="bg-white rounded-lg shadow-md overflow-x-auto">
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
            ) : (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <p className="text-gray-500 text-lg">No payments made yet</p>
                </div>
            )}
        </div>
    );
};

export default StudentPayments;
