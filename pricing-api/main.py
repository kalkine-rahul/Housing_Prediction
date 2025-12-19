from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import pandas as pd
from typing import List

app = FastAPI(title="Housing Price Prediction API")



model = joblib.load("model/house_price_model.pkl")

class HousePrediction(BaseModel):

    square_footage: float
    bedrooms: int
    bathrooms : int
    year_built : int
    lot_size: int
    distance_to_city_center: int
    school_rating : int


    

@app.get("/health")
def health():
    return  {"status": "Ok"}
    
@app.post("/predict")
def predict(data: HousePrediction):
    input_data = pd.DataFrame([data.model_dump()])
    prediction = model.predict(input_data)
    predicted_price = max(0, int(prediction[0]))


    return {
        "predicted_price": predicted_price
    }

    
@app.post("/predict_batch")
def predict_batch(data: List[HousePrediction]):
        input_data = pd.DataFrame([item.model_dump() for item in data])
        prediction = model.predict(input_data)
        predicted_prices = [max(0, int(pred)) for pred in prediction]

        return {
            "predicted_prices": predicted_prices
        }


@app.get("/model-info")
def model_info():
    return {
        "model_type": "Linear Regression",
        "coefficients": {
            "square_footage": model.coef_[0],
            "bedrooms": model.coef_[1],
            "bathrooms": model.coef_[2],
            "year_built": model.coef_[3],
            "lot_size": model.coef_[4],
            "distance_to_city_center": model.coef_[5],
            "school_rating": model.coef_[6]
        },
        "intercept": model.intercept_,
        "r2_score": 0.96,
        "mae": 13569
    }
