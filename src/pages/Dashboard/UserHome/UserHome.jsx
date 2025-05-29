import React from "react";

const UserHome = () => {
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 flex flex-col items-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back!</h2>
          <p className="text-gray-600 mb-4 text-center">This is your dashboard. Here you can view your recent activity, manage your account, and explore new features.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
            <div className="text-2xl font-bold text-blue-600 mb-2">0</div>
            <div className="text-gray-600">Orders</div>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
            <div className="text-2xl font-bold text-blue-600 mb-2">0</div>
            <div className="text-gray-600">Reviews</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHome;
