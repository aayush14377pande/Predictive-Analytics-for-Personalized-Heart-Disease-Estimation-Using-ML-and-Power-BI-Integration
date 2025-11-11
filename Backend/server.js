const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// FIX: Update to port 5001 where Flask is actually running
const PYTHON_SERVICE_URL = process.env.PYTHON_SERVICE_URL || 'http://localhost:5001';

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Available classifiers
const AVAILABLE_CLASSIFIERS = {
  'BP_Class': ['GradientBoosting', 'LogisticRegression', 'RandomForest'],
  'Diabetes_Class': ['GradientBoosting', 'LogisticRegression', 'RandomForest'],
  'Dyslipidemia_Class': ['GradientBoosting', 'LogisticRegression', 'RandomForest']
};

// Test connection to Python service
async function testPythonService() {
  try {
    console.log('Testing connection to Python service...');
    const response = await axios.get(`${PYTHON_SERVICE_URL}/health`, {
      timeout: 5000
    });
    console.log('✅ Python service is reachable');
    return true;
  } catch (error) {
    console.log('❌ Python service is not reachable:', error.message);
    return false;
  }
}

// Health check endpoint
app.get('/health', async (req, res) => {
  const pythonHealthy = await testPythonService();
  
  res.json({ 
    status: pythonHealthy ? 'healthy' : 'degraded',
    timestamp: new Date().toISOString(),
    service: 'Heart Health Classification API',
    python_service: {
      url: PYTHON_SERVICE_URL,
      status: pythonHealthy ? 'connected' : 'disconnected'
    }
  });
});

// Get available classifiers
app.get('/api/classifiers', (req, res) => {
  res.json({
    success: true,
    classifiers: AVAILABLE_CLASSIFIERS,
    count: Object.keys(AVAILABLE_CLASSIFIERS).length
  });
});

// Single prediction endpoint
app.post('/api/predict/:classifier', async (req, res) => {
  try {
    const { classifier } = req.params;
    const { model } = req.query;
    const inputData = req.body;

    console.log('Received prediction request:', { classifier, model, inputData });

    // Validate classifier
    if (!AVAILABLE_CLASSIFIERS[classifier]) {
      return res.status(400).json({
        success: false,
        error: `Invalid classifier. Must be one of: ${Object.keys(AVAILABLE_CLASSIFIERS).join(', ')}`
      });
    }

    // Build URL with optional model parameter
    let url = `${PYTHON_SERVICE_URL}/predict/${classifier}`;
    if (model) {
      url += `?model=${model}`;
    }

    console.log('Forwarding to Python service:', url);

    // Forward request to Python service
    const response = await axios.post(url, inputData, {
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      timeout: 30000,
      validateStatus: function (status) {
        return true; // Accept all status codes
      }
    });

    console.log('Python service response status:', response.status);
    
    if (response.status === 200) {
      res.json({
        success: true,
        classifier,
        prediction: response.data.prediction,
        probabilities: response.data.probabilities,
        class_labels: response.data.class_labels,
        model: response.data.model,
        input: inputData,
        timestamp: new Date().toISOString()
      });
    } else {
      res.status(response.status).json({
        success: false,
        error: response.data.error || `Python service returned status ${response.status}`
      });
    }

  } catch (error) {
    console.error('Prediction error:', error.message);
    
    if (error.code === 'ECONNREFUSED') {
      return res.status(503).json({
        success: false,
        error: `Python service is not running on ${PYTHON_SERVICE_URL}`
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Internal server error during prediction'
    });
  }
});

// ... include your other routes (predict-all, compare-models, etc.)

// Start server
app.listen(PORT, async () => {
  console.log(`\n🚀 Heart Health Classification API running on port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/health`);
  console.log(`🔗 Python service URL: ${PYTHON_SERVICE_URL}`);
  
  // Test Python service connection on startup
  await testPythonService();
  console.log('');
});