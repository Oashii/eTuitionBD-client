import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../provider/AuthProvider';

const MyApplications = () => {
    const { user } = useContext(AuthContext);
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/my-applications', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setApplications(response.data.applications);
            } catch (error) {
                console.error('Error fetching applications:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchApplications();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this application?')) {
            try {
                await axios.delete(`http://localhost:5000/api/applications/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setApplications(applications.filter((app) => app._id !== id));
                alert('Application deleted successfully');
            } catch (error) {
                alert(error.response?.data?.message || 'Error deleting application');
            }
        }
    };

    if (loading) {
        return <span className="loading loading-spinner loading-lg"></span>;
    }

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6">My Applications</h2>

            {applications.length > 0 ? (
                <div className="grid gap-6">
                    {applications.map((application) => (
                        <div key={application._id} className="bg-white rounded-lg shadow-md p-6">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-xl font-semibold">Tuition Application</h3>
                                <span className={`badge ${
                                    application.status === 'Approved' ? 'badge-success' :
                                    application.status === 'Rejected' ? 'badge-error' :
                                    'badge-warning'
                                }`}>
                                    {application.status}
                                </span>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-gray-600">
                                <p><strong>Expected Salary:</strong> ৳{application.expectedSalary}</p>
                                <p><strong>Applied:</strong> {new Date(application.createdAt).toLocaleDateString()}</p>
                            </div>

                            <div className="mb-4">
                                <p className="text-gray-600 mb-2"><strong>Qualifications:</strong></p>
                                <p className="text-gray-700">{application.qualifications}</p>
                            </div>

                            <div className="mb-4">
                                <p className="text-gray-600 mb-2"><strong>Experience:</strong></p>
                                <p className="text-gray-700">{application.experience}</p>
                            </div>

                            {application.status === 'Pending' && (
                                <button
                                    onClick={() => handleDelete(application._id)}
                                    className="btn btn-error btn-sm"
                                >
                                    Delete Application
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <p className="text-gray-500 text-lg">No applications yet</p>
                </div>
            )}
        </div>
    );
};

export default MyApplications;
