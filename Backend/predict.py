import sys
import json
import joblib
import pandas as pd
import os
import traceback

def main():
    try:
        if len(sys.argv) != 3:
            sys.stdout.write(json.dumps({"error": "Usage: python predict.py <meta.json> <features_json>"}))
            return

        meta_path = sys.argv[1]
        features_json = sys.argv[2]

        if not os.path.exists(meta_path):
            sys.stdout.write(json.dumps({"error": f"Meta file not found: {meta_path}"}))
            return

        with open(meta_path, 'r', encoding='utf-8') as f:
            meta = json.load(f)

        model_path = meta.get('best_model_path')
        if not model_path or not os.path.exists(model_path):
            sys.stdout.write(json.dumps({"error": f"Model file not found: {model_path}"}))
            return

        model = joblib.load(model_path)

        scaler_path = meta.get('scaler_path')
        scaler = joblib.load(scaler_path) if scaler_path and os.path.exists(scaler_path) else None

        # Load features
        try:
            features_dict = json.loads(features_json)
        except Exception as e:
            sys.stdout.write(json.dumps({"error": f"Invalid feature JSON: {str(e)}"}))
            return

        feature_columns = meta.get('feature_columns')
        if not feature_columns:
            sys.stdout.write(json.dumps({"error": "Meta JSON missing 'feature_columns'"}))
            return

        # Build DataFrame in correct column order
        df = pd.DataFrame([features_dict], columns=feature_columns)

        X = df.values
        if scaler:
            X = scaler.transform(X)

        pred = model.predict(X)
        result = {meta['target']: float(pred[0])}
        sys.stdout.write(json.dumps(result))

    except Exception as e:
        sys.stdout.write(json.dumps({"error": f"Unexpected error: {str(e)}", "trace": traceback.format_exc()}))

if __name__ == "__main__":
    main()
