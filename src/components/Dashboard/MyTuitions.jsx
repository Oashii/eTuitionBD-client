import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../provider/AuthProvider';

const MyTuitions = () => {
    const { user } = useContext(AuthContext);
    const [tuitions, setTuitions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTuitions = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/my-tuitions', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setTuitions(response.data.tuitions);
            } catch (error) {
                console.error('Error fetching tuitions:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchTuitions();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this tuition?')) {
            try {
                await axios.delete(`http://localhost:5000/api/tuitions/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setTuitions(tuitions.filter((t) => t._id !== id));
                alert('Tuition deleted successfully');
            } catch (error) {
                alert('Error deleting tuition');
            }
        }
    };

    if (loading) {
        return <span className="loading loading-spinner loading-lg"></span>;
    }

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6">My Tuitions</h2>
            {tuitions.length > 0 ? (
                <div className="grid gap-6">
                    {tuitions.map((tuition) => (
                        <div key={tuition._id} className="bg-white rounded-lg shadow-md p-6">
                            <h3 className="text-xl font-semibold mb-2">{tuition.subject}</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-gray-600">
                                <p><strong>Class:</strong> {tuition.class}</p>
                                <p><strong>Location:</strong> {tuition.location}</p>
                                <p><strong>Budget:</strong> ৳{tuition.budget}</p>
                                <p><strong>Status:</strong> <span className="badge badge-info">{tuition.status === 'Approved' ? 'Available' : tuition.status}</span></p>
                            </div>
                            <div className="flex gap-3">
                                <Link
                                    to={`/tuition/${tuition._id}`}
                                    className="btn btn-sm btn-outline"
                                >
                                    View
                                </Link>
                                <Link
                                    to={`/edit-tuition/${tuition._id}`}
                                    className="btn btn-sm btn-info"
                                >
                                    Edit
                                </Link>
                                <button
                                    onClick={() => handleDelete(tuition._id)}
                                    className="btn btn-sm btn-error"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <p className="text-gray-500 text-lg">No tuitions posted yet</p>
                    <Link to="/student-dashboard/post-tuition" className="btn btn-primary mt-4">
                        Post Your First Tuition
                    </Link>
                </div>
            )}
        </div>
    );
};

export default MyTuitions;
