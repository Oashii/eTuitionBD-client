import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../provider/AuthProvider';

const TutorRevenue = () => {
    const { user } = useContext(AuthContext);
    const [revenues, setRevenues] = useState([]);
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRevenue = async () => {
            try {
                const response = await axios.get('https://etuitionbd.vercel.app/api/tutor-revenue', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setRevenues(response.data.revenues);
                setTotalRevenue(response.data.totalRevenue);
            } catch (error) {
                console.error('Error fetching revenue:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchRevenue();
    }, []);

    if (loading) {
        return <span className="loading loading-spinner loading-lg"></span>;
    }

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6">Revenue History</h2>

            {/* Summary */}
            <div className="bg-gradient-to-r from-green-600 to-green-800 text-white rounded-lg shadow-md p-6 mb-8">
                <p className="text-lg opacity-90">Total Earnings</p>
                <p className="text-4xl font-bold">৳{totalRevenue.toLocaleString()}</p>
            </div>

            {/* Revenue List */}
            {revenues.length > 0 ? (
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
                            {revenues.map((revenue) => (
                                <tr key={revenue._id} className="border-b hover:bg-gray-50">
                                    <td className="px-6 py-4 font-mono text-sm">{revenue.transactionId}</td>
                                    <td className="px-6 py-4 font-semibold">৳{revenue.amount}</td>
                                    <td className="px-6 py-4">
                                        <span className="badge badge-success">{revenue.status}</span>
                                    </td>
                                    <td className="px-6 py-4">{new Date(revenue.transactionDate).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <p className="text-gray-500 text-lg">No earnings yet</p>
                </div>
            )}
        </div>
    );
};

export default TutorRevenue;
