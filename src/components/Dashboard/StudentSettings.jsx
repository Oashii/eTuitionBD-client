import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../provider/AuthProvider';

const StudentSettings = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6">Profile Settings</h2>

            <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl">
                <div className="mb-8">
                    <h3 className="text-xl font-semibold mb-4">Account Information</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input
                                type="text"
                                disabled
                                value={user?.displayName || ''}
                                className="input input-bordered w-full opacity-50"
                            />
                        </div>
                        <div>
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                disabled
                                value={user?.email || ''}
                                className="input input-bordered w-full opacity-50"
                            />
                        </div>
                    </div>
                </div>

                <div className="border-t pt-8">
                    <button
                        onClick={() => navigate('/update-profile')}
                        className="btn btn-primary"
                    >
                        Update Your Profile
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StudentSettings;
