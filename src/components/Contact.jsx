import React, { useEffect }from 'react';
import { Link } from 'react-router-dom';

const Contact = () => {
    useEffect(() => {
    document.title = 'eTuitionBD - Contact Us';
  }, []);
    return (
        <div className="min-h-screen bg-gray-50 py-16 px-4">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold text-center mb-8">Contact Us</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    {/* Contact Form */}
                    <div className="bg-white rounded-lg shadow-md p-8">
                        <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
                        <form className="space-y-4">
                            <div>
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Your name"
                                    className="input input-bordered w-full"
                                />
                            </div>
                            <div>
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="email"
                                    placeholder="Your email"
                                    className="input input-bordered w-full"
                                />
                            </div>
                            <div>
                                <label className="label">
                                    <span className="label-text">Subject</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Message subject"
                                    className="input input-bordered w-full"
                                />
                            </div>
                            <div>
                                <label className="label">
                                    <span className="label-text">Message</span>
                                </label>
                                <textarea
                                    placeholder="Your message..."
                                    className="textarea textarea-bordered w-full h-32"
                                ></textarea>
                            </div>
                            <button type="submit" className="btn btn-primary w-full">
                                Send Message
                            </button>
                        </form>
                    </div>

                    {/* Contact Info */}
                    <div className="bg-white rounded-lg shadow-md p-8">
                        <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold mb-2">📍 Address</h3>
                                <p className="text-gray-600">Dhaka, Bangladesh</p>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold mb-2">📧 Email</h3>
                                <p className="text-gray-600">contact@etuitionbd.com</p>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold mb-2">📱 Phone</h3>
                                <p className="text-gray-600">+88 01XXXXXXXXX</p>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold mb-2">🕐 Business Hours</h3>
                                <p className="text-gray-600">Monday - Friday: 9 AM - 6 PM</p>
                                <p className="text-gray-600">Saturday - Sunday: Closed</p>
                            </div>
                        </div>
                    </div>
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

export default Contact;
