import requests
PRICING_API_URL = "http://pricing-api:8000/predict_batch"

def get_price_estimate(property_data: dict):
    try:
        response = requests.post(PRICING_API_URL, json=[property_data], timeout=5)
        response.raise_for_status()
        return response.json()
    except requests.RequestException as e:
        print("Error calling Pricing API:", e)  # <-- log actual error
        return {"error": "Pricing API is currently unavailable."}

