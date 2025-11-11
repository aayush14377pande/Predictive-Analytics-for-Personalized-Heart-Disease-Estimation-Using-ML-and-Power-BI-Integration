import { Link, useLocation } from "react-router-dom";
import React from "react";
import { Activity } from "lucide-react";

function Header() {
  const location = useLocation();

  const linkClass = (path) =>
    `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
      location.pathname === path
        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
        : "text-gray-700 hover:bg-blue-50 hover:text-blue-700"
    }`;

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-2 rounded-xl">
            <Activity className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Predictive Analytics for Personalized Heart-Disease
Estimation Using Machine Learning and Power BI
Integration
          </h1>
        </div>
        <nav className="flex space-x-2">
          <Link to="/" className={linkClass("/")}>
            Home
          </Link>
          <Link to="/dashboard" className={linkClass("/dashboard")}>
            Dashboard
          </Link>
          <Link to="/prediction" className={linkClass("/prediction")}>
            Prediction
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;