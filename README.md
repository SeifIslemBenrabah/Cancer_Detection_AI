# Brain Tumor Classification System

A full-stack deep learning application for automated brain tumor detection and classification from MRI images using VGG16 transfer learning.

![Python](https://img.shields.io/badge/Python-3.12-blue)
![TensorFlow](https://img.shields.io/badge/TensorFlow-2.x-orange)
![FastAPI](https://img.shields.io/badge/FastAPI-0.x-green)
![React](https://img.shields.io/badge/React-18.3-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue)

## 🎯 Overview

This application leverages deep learning to classify brain MRI scans into four categories:
- **Glioma Tumor**
- **Meningioma Tumor**
- **Pituitary Tumor**
- **No Tumor**

The model achieves **92.06% test accuracy** using transfer learning with VGG16 architecture.

## 🏗️ Architecture

### Backend
- **Framework**: FastAPI
- **Model**: VGG16 with custom classification head
- **Deep Learning**: TensorFlow/Keras
- **Image Processing**: PIL, NumPy

### Frontend
- **Framework**: React 18.3 with TypeScript
- **Styling**: TailwindCSS
- **Build Tool**: Vite
- **Icons**: Lucide React

### Model Architecture
```
VGG16 (ImageNet pretrained, frozen layers)
    ↓
GlobalAveragePooling2D
    ↓
Dense(256, activation='relu')
    ↓
Dropout(0.5)
    ↓
Dense(4, activation='softmax')
```

## 📊 Dataset

- **Total Images**: 3,264
  - Glioma: 926 images
  - Meningioma: 937 images
  - No Tumor: 500 images
  - Pituitary: 901 images
- **Split Ratio**: 70% train, 15% validation, 15% test
- **Image Size**: 224×224 pixels
- **Format**: RGB

## 🚀 Getting Started

### Prerequisites
```bash
Python 3.12+
Node.js 18+
npm or yarn
```

### Installation

#### 1. Clone the Repository
```bash
git clone <repository-url>
cd brain-tumor-classifier
```

#### 2. Backend Setup
```bash
cd backend
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
pip install tensorflow fastapi uvicorn pillow numpy python-multipart
```

#### 3. Frontend Setup
```bash
cd frontend
npm install
```

### Running the Application

#### Start Backend Server
```bash
cd backend
uvicorn main:app --reload
# Server runs on http://127.0.0.1:8000
```

#### Start Frontend Development Server
```bash
cd frontend
npm run dev
# Application runs on http://localhost:5173
```

## 🧠 Model Training

The model training process is documented in `backend/Brain_tumor.ipynb`:

1. **Data Preparation**
   - Dataset organization and file renaming
   - Train/validation/test split (70/15/15)
   
2. **Model Configuration**
   - Base model: VGG16 (ImageNet weights)
   - Custom classification head
   - Fine-tuning last 4 layers

3. **Training Parameters**
   - Optimizer: Adam (lr=1e-4 for transfer learning, 1e-5 for fine-tuning)
   - Loss: Sparse Categorical Crossentropy
   - Callbacks: EarlyStopping, ReduceLROnPlateau, ModelCheckpoint
   - Epochs: 30 + 20 (fine-tuning)

4. **Results**
   - Test Accuracy: 92.06%
   - Test Loss: 0.2097

## 📁 Project Structure

```
brain-tumor-classifier/
├── backend/
│   ├── Brain_tumor.ipynb        # Training notebook
│   ├── main.py                  # FastAPI server
│   ├── brain_tumor_vgg16.keras  # Trained model
│   └── Dataset/                 # Training data
├── frontend/
│   ├── src/
│   │   ├── App.tsx             # Main React component
│   │   ├── main.tsx            # Entry point
│   │   └── index.css           # Tailwind styles
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
└── README.md
```

## 🔌 API Documentation

### POST `/predict`
Upload an MRI image for classification.

**Request:**
- Method: `POST`
- Content-Type: `multipart/form-data`
- Body: `file` (image file)

**Response:**
```json
{
  "predictions": [
    {"class": "glioma_tumor", "confidence": 0.856},
    {"class": "meningioma_tumor", "confidence": 0.089},
    {"class": "no_tumor", "confidence": 0.034},
    {"class": "pituitary_tumor", "confidence": 0.021}
  ],
  "top_class": "glioma_tumor",
  "top_confidence": 0.856
}
```

## 🎨 Features

- **Real-time Prediction**: Upload MRI images and receive instant classification results
- **Confidence Scores**: View probability distribution across all tumor types
- **Responsive Design**: Mobile-friendly interface with gradient backgrounds
- **Visual Feedback**: Loading states, progress bars, and smooth transitions
- **Error Handling**: Robust error management in both frontend and backend

## 🔧 Technologies Used

| Category | Technologies |
|----------|-------------|
| **Deep Learning** | TensorFlow, Keras, VGG16 |
| **Backend** | FastAPI, Uvicorn, Python 3.12 |
| **Frontend** | React, TypeScript, Vite |
| **Styling** | TailwindCSS, Lucide Icons |
| **Data Processing** | NumPy, PIL, Pandas |
| **Model Optimization** | Transfer Learning, Fine-tuning, Data Augmentation |

## 📈 Model Performance

| Metric | Value |
|--------|-------|
| Test Accuracy | 92.06% |
| Test Loss | 0.2097 |
| Training Strategy | Transfer Learning + Fine-tuning |
| Base Model | VGG16 (ImageNet) |

## 🛠️ Development

### Building for Production

```bash
# Frontend
cd frontend
npm run build

# Backend
cd backend
# Deploy using uvicorn with production settings
uvicorn main:app --host 0.0.0.0 --port 8000
```

## 📝 License

This project is created for educational and research purposes.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📧 Contact

For questions or feedback, please open an issue in the repository.

---

**Note**: This application is for educational purposes only and should not be used as a substitute for professional medical diagnosis.
