import React from "react";
import { BarChart3, Brain, TrendingUp } from "lucide-react";

function Home() {
  const features = [
    {
      icon: <BarChart3 className="w-8 h-8 text-blue-600" />,
      title: "Patient Trends",
      description: "",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Brain className="w-8 h-8 text-purple-600" />,
      title: "AI Predictions",
      description: "",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-green-600" />,
      title: "Real-time Insights",
      description: "",
      gradient: "from-green-500 to-emerald-500"
    }
  ];

  return (
    <section className="text-center max-w-6xl mx-auto">
      <div className="mb-12">
        <h2 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
        Predictive Analytics for Personalized Heart-Disease
Estimation Using Machine Learning and Power BI
Integration
        </h2>
        <p className="max-w-3xl mx-auto text-lg text-gray-600 leading-relaxed">
          This platform leverages time series data and AI models to analyze and predict patient health outcomes.
          Empowering healthcare professionals to detect trends, assess risk, and make informed medical decisions.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mt-12">
        {features.map((feature, index) => (
          <div
            key={index}
            className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:-translate-y-2"
          >
            <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${feature.gradient} bg-opacity-10 mb-4 group-hover:scale-110 transition-transform duration-300`}>
              {feature.icon}
            </div>
            <h3 className="font-bold text-xl text-gray-800 mb-3">{feature.title}</h3>
            <p className="text-gray-600 leading-relaxed">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white shadow-xl">
        <h3 className="text-2xl font-bold mb-3">Ready to get started?</h3>
        <p className="mb-6 text-blue-100">Upload patient data and experience AI-powered diagnosis predictions.</p>
        <button className="bg-white text-blue-600 font-semibold px-8 py-3 rounded-xl hover:bg-blue-50 transition-all duration-200 hover:scale-105 shadow-lg">
          Get Started Now
        </button>
      </div> */}
    </section>
  );
}

export default Home;