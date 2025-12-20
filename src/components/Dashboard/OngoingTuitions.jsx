import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../provider/AuthProvider';

const OngoingTuitions = () => {
    useEffect(() => {
    document.title = 'eTuitionBD - Ongoing Tuitions';
  }, []);
    const { user } = useContext(AuthContext);
    const [tuitions, setTuitions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTuitions = async () => {
            try {
                const response = await axios.get('https://etuitionbd.vercel.app/api/tutor-ongoing-tuitions', {
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

    if (loading) {
        return <span className="loading loading-spinner loading-lg"></span>;
    }

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6">Ongoing Tuitions</h2>

            {tuitions.length > 0 ? (
                <div className="grid gap-6">
                    {tuitions.map((tuition) => (
                        <div key={tuition._id} className="bg-white rounded-lg shadow-md p-6">
                            <h3 className="text-xl font-semibold mb-2">{tuition.subject}</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-gray-600">
                                <p><strong>Class:</strong> {tuition.class}</p>
                                <p><strong>Location:</strong> {tuition.location}</p>
                                <p><strong>Budget:</strong> ৳{tuition.budget}</p>
                                <p><strong>Schedule:</strong> {tuition.schedule}</p>
                            </div>

                            <div className="bg-blue-50 p-4 rounded-lg">
                                <p className="text-gray-700">{tuition.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <p className="text-gray-500 text-lg">No ongoing tuitions yet</p>
                </div>
            )}
        </div>
    );
};

export default OngoingTuitions;
