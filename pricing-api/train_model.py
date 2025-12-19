import pandas  as  pd
import numpy  as np
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error , r2_score
import joblib
import os


DATA_PATH = "data/House_Price_Dataset.csv"
MODEL_PATH ="model/house_price_model.pkl"


train_df = pd.read_csv(DATA_PATH)


features = [
    "square_footage",
    "bedrooms",
    "bathrooms",
    "year_built",
    "lot_size",
    "distance_to_city_center",
    "school_rating"
]

X = train_df[features]
y = train_df["price"]

X_train, X_test, y_train, y_test =  train_test_split(X, y, test_size=0.2, random_state=42)


model = LinearRegression()

model.fit(X_train, y_train)



test_df = pd.read_csv("data/test_data.csv")
X_new = test_df[features]

predictions = model.predict(X_new)
mae = mean_squared_error(y_test, predictions)
r2 = r2_score(y_test, predictions)
coefficient  = model.coef_


joblib.dump(model, MODEL_PATH)



print("Model trained and saved!")
print(f"MAE: {mae}, R2: {r2}")
print(f"Coefficients: {coefficient}")
