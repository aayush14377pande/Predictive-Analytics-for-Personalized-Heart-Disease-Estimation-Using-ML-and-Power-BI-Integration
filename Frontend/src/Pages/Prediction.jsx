import React, { useState } from "react";
import { Brain } from "lucide-react";

const TARGETS = [
  'blood_sugar',
  'HbA1c',
  'LDL_C',
  'HDL_C',
  'Triglycerides',
  'heart_rate',
  'bp_systolic',
  'bp_diastolic'
];

function Prediction() {
  const [inputs, setInputs] = useState({
    sex: "", // 1 = male, 0 = female
    blood_sugar: "",
    HbA1c: "",
    LDL_C: "",
    HDL_C: "",
    Triglycerides: "",
    heart_rate: "",
    bp_systolic: "",
    bp_diastolic: "",
  });
  const [target, setTarget] = useState(TARGETS[0]);
  const [prediction, setPrediction] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`http://localhost:5000/predict/${target}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inputs),
      });
      const data = await response.json();
      setPrediction(data);
    } catch (err) {
      console.error(err);
      alert("Failed to get prediction");
    }
  };

  return (
    <section className="max-w-2xl mx-auto">
      <div className="text-center mb-10">
        <div className="inline-flex p-4 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full mb-4">
          <Brain className="w-12 h-12 text-purple-600" />
        </div>
        <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
          AI Diagnosis Prediction
        </h2>
        <p className="text-gray-600 text-lg">
          Enter patient data to receive AI-driven diagnostic predictions.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <div className="mb-4">
          <label className="font-semibold text-gray-700 mr-2">Select Target:</label>
          <select
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            className="border p-2 rounded-lg"
          >
            {TARGETS.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Object.keys(inputs).map((key) => (
            <div key={key} className="flex flex-col">
              <label className="font-semibold text-gray-700 mb-1">{key.replace("_", " ")}</label>
              <input
                type="number"
                name={key}
                value={inputs[key]}
                onChange={handleChange}
                className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>
          ))}
        </div>

        <button
          onClick={handleSubmit}
          className="w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200 hover:scale-105 shadow-lg"
        >
          Predict
        </button>

        {prediction && (
          <div className="mt-6 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100">
            <h4 className="font-semibold text-gray-800 mb-2">Prediction for {target}:</h4>
            <pre className="text-sm text-gray-700">{JSON.stringify(prediction, null, 2)}</pre>
          </div>
        )}
      </div>
    </section>
  );
}

export default Prediction;
