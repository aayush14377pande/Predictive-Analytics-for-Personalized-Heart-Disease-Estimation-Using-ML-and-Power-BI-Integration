const express = require('express');
const bodyParser = require('body-parser');
const { spawn } = require('child_process');
const cors = require("cors");
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;
const a=10;
app.use(bodyParser.json());
app.use(cors());
const MODELS_DIR = path.join(__dirname, 'models');

// Endpoint to predict for a target
app.post('/predict/:target', (req, res) => {
    const target = req.params.target;   // target like "blood_sugar"
    const features = req.body;

    const metaPath = path.join(MODELS_DIR, `best_meta_${target}.json`);
    if (!fs.existsSync(metaPath)) {
        return res.status(400).json({ error: `No metadata found for target: ${target}` });
    }

    // Call Python script
    const py = spawn('python', ['predict.py', metaPath, JSON.stringify(features)]);

    let data = '';
    let error = '';

    py.stdout.on('data', (chunk) => { data += chunk.toString(); });
    py.stderr.on('data', (chunk) => { error += chunk.toString(); });

    py.on('close', (code) => {
        if (error) {
            return res.status(500).json({ error });
        }
        try {
            const result = JSON.parse(data);
            res.json(result);
        } catch (e) {
            res.status(500).json({ error: 'Invalid response from Python script' });
        }
    });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
