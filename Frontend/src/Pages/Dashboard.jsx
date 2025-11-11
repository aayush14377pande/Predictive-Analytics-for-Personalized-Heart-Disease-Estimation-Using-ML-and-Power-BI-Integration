import React from "react";
import { Heart, Activity, Droplet, Zap, BarChart3 } from "lucide-react";

function Dashboard() {
  const vitals = [
    { 
      icon: <Heart className="w-6 h-6" />, 
      label: "Heart Rate", 
      value: "72 bpm", 
      color: "text-red-500", 
      bg: "bg-red-50" 
    },
    { 
      icon: <Activity className="w-6 h-6" />, 
      label: "Blood Pressure", 
      value: "120/80 mmHg", 
      color: "text-blue-500", 
      bg: "bg-blue-50" 
    },
    { 
      icon: <Droplet className="w-6 h-6" />, 
      label: "Blood Glucose", 
      value: "95 mg/dL", 
      color: "text-purple-500", 
      bg: "bg-purple-50" 
    },
    { 
      icon: <Zap className="w-6 h-6" />, 
      label: "Temperature", 
      value: "98.6°F", 
      color: "text-orange-500", 
      bg: "bg-orange-50" 
    }
  ];

  return (
    <section className="max-w-6xl mx-auto px-4">
      {/* Header */}
      <div className="mb-8 text-center md:text-left">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
          Patient Data Dashboard
        </h2>
        <p className="text-gray-600 text-lg">
          Monitor vital parameters through interactive time series visualizations and real-time analytics.
        </p>
      </div>

      {/* Vital Stats Cards */}
      <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-6 mb-8">
        {vitals.map((vital, index) => (
          <div 
            key={index} 
            className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow border border-gray-100"
          >
            <div className={`${vital.bg} ${vital.color} w-12 h-12 rounded-xl flex items-center justify-center mb-4`}>
              {vital.icon}
            </div>
            <p className="text-sm text-gray-500 mb-1">{vital.label}</p>
            <p className="text-2xl font-bold text-gray-800">{vital.value}</p>
          </div>
        ))}
      </div>

      {/* Analytics Section */}
      <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg border border-gray-100">
        <div className="text-center">
          <div className="inline-flex p-6 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full mb-6">
            <BarChart3 className="w-16 h-16 text-blue-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-3">Interactive Analytics</h3>

          <iframe 
            title="Minor Project Dashboard"
            width="100%" 
            height="541.25" 
            src="https://app.powerbi.com/reportEmbed?reportId=66d24b05-88a4-4d32-8c0e-a7febd1f5e02&autoAuth=true&ctid=0ed51ad7-52cc-4234-b54a-76b82d40b5c3" 
            frameBorder="0" 
            allowFullScreen
            className="rounded-xl shadow-md border border-gray-200"
          ></iframe>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
