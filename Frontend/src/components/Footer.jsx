import React from "react";
import { Activity } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-blue-900 text-gray-300 py-8 mt-auto border-t border-gray-800">
      <div className="container mx-auto text-center">
        <div className="flex items-center justify-center space-x-2 mb-3">
          <Activity className="w-5 h-5 text-blue-400" />
          <span className="font-semibold text-white">Predictive Analytics for Personalized Heart-Disease
Estimation Using Machine Learning and Power BI
Integration</span>
        </div>
        <p className="text-sm">
          © {new Date().getFullYear()} Final Year Project
        </p>
      </div>
    </footer>
  );
}

export default Footer;