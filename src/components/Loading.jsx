import React from 'react';

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh]">
      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

      <p className="mt-6 text-4xl font-bold text-blue-600 animate-pulse">
        Loading...
      </p>
    </div>
  );
};

export default Loading;
