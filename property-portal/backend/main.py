from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from models import PropertyData
from services import get_price_estimate

app = FastAPI(title="Property Portal Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

history = []

@app.post("/api/estimate")
def estimate(data: PropertyData):
    result = get_price_estimate(data.dict())
    if "predicted_prices" in result:
        history.append({
            "input": data.dict(),
            "price": result["predicted_prices"][0]
        })
    return result

@app.get("/api/history")
def get_history():
    return history

@app.get("/health")
def health():
    return {"status": "OK"}

@app.get("/api/market-data")
def market_data():
    return {
        "summary": {
            "average_price_per_sqft": 250,
            "total_listings": 1200
        },
        "locations": [
            {
                "location": "Noida",
                "avg_price": 4500000,
                "price_per_sqft": 230,
                "listings": 320
            },
            {
                "location": "Gurgaon",
                "avg_price": 7200000,
                "price_per_sqft": 310,
                "listings": 280
            },
            {
                "location": "Delhi",
                "avg_price": 6800000,
                "price_per_sqft": 295,
                "listings": 400
            }
        ],
        "price_trends": [
            { "quarter": "2023-Q1", "price": 240 },
            { "quarter": "2023-Q2", "price": 245 },
            { "quarter": "2023-Q3", "price": 250 },
            { "quarter": "2023-Q4", "price": 255 }
        ]
    }