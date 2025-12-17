import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
    return (
        <div className="min-h-screen bg-gray-50 py-16 px-4">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold text-center mb-8">About eTuitionBD</h1>

                {/* About Hero */}
                <div className="bg-white rounded-lg shadow-md p-8 mb-8">
                    <p className="text-lg leading-relaxed text-gray-700 mb-4">
                        eTuitionBD is a comprehensive online platform dedicated to connecting students with qualified tutors
                        and managing tuition activities seamlessly. Our mission is to make quality education accessible to
                        everyone by bridging the gap between students seeking tutors and experienced educators.
                    </p>
                    <p className="text-lg leading-relaxed text-gray-700">
                        Founded with a vision to revolutionize the tuition industry in Bangladesh, eTuitionBD provides a
                        transparent, secure, and user-friendly marketplace for educational services.
                    </p>
                </div>

                {/* Our Mission */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div className="bg-blue-50 rounded-lg shadow-md p-8">
                        <h2 className="text-2xl font-bold mb-4">🎯 Our Mission</h2>
                        <p className="text-gray-700 leading-relaxed">
                            To solve the real problem of finding qualified tutors and verified tuition by providing an
                            automated workflow that reduces friction between students and tutors.
                        </p>
                    </div>
                    <div className="bg-green-50 rounded-lg shadow-md p-8">
                        <h2 className="text-2xl font-bold mb-4">💡 Our Vision</h2>
                        <p className="text-gray-700 leading-relaxed">
                            To create an ecosystem where education is accessible, transparent, and beneficial for all
                            stakeholders - students, tutors, and administrators.
                        </p>
                    </div>
                </div>

                {/* Features */}
                <div className="bg-white rounded-lg shadow-md p-8 mb-8">
                    <h2 className="text-2xl font-bold mb-6">✨ Key Features</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="text-lg font-semibold mb-2">🔐 Secure Platform</h3>
                            <p className="text-gray-600">All tutors are verified and reviewed by our admin team</p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-2">💳 Transparent Payment</h3>
                            <p className="text-gray-600">Clear pricing with secure payment processing</p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-2">📋 Application Tracking</h3>
                            <p className="text-gray-600">Monitor tutor applications and manage tuitions easily</p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-2">📊 Analytics & Reports</h3>
                            <p className="text-gray-600">Detailed insights for admins and financial reports</p>
                        </div>
                    </div>
                </div>

                {/* Team */}
                <div className="bg-white rounded-lg shadow-md p-8 mb-8">
                    <h2 className="text-2xl font-bold mb-6">👥 Our Team</h2>
                    <p className="text-gray-700 leading-relaxed">
                        Our dedicated team comprises experienced educators, software developers, and administrators
                        committed to providing the best educational platform in Bangladesh.
                    </p>
                </div>

                <div className="text-center">
                    <Link to="/" className="btn btn-outline">
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default About;
