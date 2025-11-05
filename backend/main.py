from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import tensorflow as tf
import numpy as np
from PIL import Image
import io

app = FastAPI(title="Brain Tumor Classifier")

# Allow frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For local testing; restrict later
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model
model = tf.keras.models.load_model("brain_tumor_vgg16.keras")

classes = ['glioma_tumor', 'meningioma_tumor', 'no_tumor', 'pituitary_tumor']

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    contents = await file.read()
    image = Image.open(io.BytesIO(contents)).convert("RGB")
    image = image.resize((224, 224))
    img_array = np.expand_dims(np.array(image) / 255.0, axis=0)

    predictions = model.predict(img_array)[0]  # shape (4,)

    # Build a list of all classes with confidence
    results = [
        {"class": cls, "confidence": round(float(conf), 3)}
        for cls, conf in zip(classes, predictions)
    ]

    # Sort results (highest confidence first)
    results.sort(key=lambda x: x["confidence"], reverse=True)

    # Return everything
    return {
        "predictions": results,
        "top_class": results[0]["class"],
        "top_confidence": results[0]["confidence"]
    }
    