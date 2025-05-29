import React from "react";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

import { FaBook, FaDollarSign, FaUsers } from "react-icons/fa";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  PieChart,
  Pie,
  Legend,
} from "recharts";

const colors = ["#2563eb", "#10b981", "#f59e42", "#ef4444", "#8b5cf6", "#ec4899"];
const COLORS = ["#2563eb", "#10b981", "#f59e42", "#ef4444"];

const AdminHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: stats = {} } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-stats");
      return res.data;
    },
  });

  const { data: chartData = [] } = useQuery({
    queryKey: ["order-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/order-stats");
      return res.data;
    },
  });

  // custom shape for the bar chart
  const getPath = (x, y, width, height) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${
      x + width / 2
    },${y + height / 3}
        ${x + width / 2}, ${y}
        C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${
      y + height
    } ${x + width}, ${y + height}
        Z`;
  };

  const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;
    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
  };

  // custom shape for the pie chart
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const pieChartData = chartData.map((data) => {
    return { name: data.category, value: data.revenue };
  });

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Hi, Welcome {user?.displayName ? user.displayName : "Back"}
        </h2>
        <p className="text-gray-600">Here's what's happening with your store today.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
          <div className="text-3xl font-bold text-blue-600 mb-2">${stats.revenue}</div>
          <div className="text-gray-600">Revenue</div>
          <div className="text-xs text-gray-400 mt-1">Jan 1st - Feb 1st</div>
        </div>
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
          <div className="text-3xl font-bold text-blue-600 mb-2">{stats.users}</div>
          <div className="text-gray-600">Users</div>
          <div className="text-xs text-gray-400 mt-1">↗︎ 400 (22%)</div>
        </div>
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
          <div className="text-3xl font-bold text-blue-600 mb-2">{stats.menuItems}</div>
          <div className="text-gray-600">Menu Items</div>
          <div className="text-xs text-gray-400 mt-1">↗︎ 400 (22%)</div>
        </div>
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
          <div className="text-3xl font-bold text-blue-600 mb-2">{stats.orders}</div>
          <div className="text-gray-600">Orders</div>
          <div className="text-xs text-gray-400 mt-1">↘︎ 90 (14%)</div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Order Statistics</h3>
          <BarChart
            width={500}
            height={300}
            data={chartData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey="category" stroke="#6B7280" />
            <YAxis stroke="#6B7280" />
            <Bar
              dataKey="quantity"
              fill="#2563eb"
              shape={<TriangleBar />}
              label={{ position: "top", fill: "#6B7280" }}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % 6]} />
              ))}
            </Bar>
          </BarChart>
        </div>
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Revenue Distribution</h3>
          <PieChart width={400} height={400}>
            <Pie
              data={pieChartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              fill="#2563eb"
              dataKey="value"
            >
              {pieChartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
