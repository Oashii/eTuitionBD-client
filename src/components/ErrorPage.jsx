import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-600 to-blue-800 flex items-center justify-center px-4">
            <div className="text-center text-white">
                <h1 className="text-9xl font-bold mb-4">404</h1>
                <h2 className="text-4xl font-bold mb-4">Page Not Found</h2>
                <p className="text-xl mb-8 opacity-90">
                    Sorry, the page you're looking for doesn't exist or has been moved.
                </p>
                <div className="flex gap-4 justify-center flex-wrap">
                    <Link to="/" className="btn btn-white text-blue-600">
                        Go to Home
                    </Link>
                    <Link to="/tuitions" className="btn btn-outline text-white border-white hover:bg-white hover:text-blue-600">
                        Browse Tuitions
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;
