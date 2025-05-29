import React from "react";

const MyBookings = () => {
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 flex flex-col items-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">My Bookings</h2>
          <p className="text-gray-600 mb-4 text-center">Here you can view and manage all your bookings.</p>
          <div className="w-full mt-6">
            <div className="text-center text-gray-400">No bookings yet.</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyBookings; 