<!-- I separated training and serving logic.
train_model.py is used only for offline model training and saving the trained model.
main.py loads this trained model once and exposes prediction endpoints using FastAPI.
This improves performance and follows production best practices.” -->