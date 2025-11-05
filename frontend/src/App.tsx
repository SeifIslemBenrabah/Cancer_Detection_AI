import { useState } from 'react';
import { Brain, Upload, Loader2 } from 'lucide-react';

interface Prediction {
  class: string;
  confidence: number;
}

interface PredictionResponse {
  predictions: Prediction[];
  top_class: string;
  top_confidence: number;
}

function App() {
  const [image, setImage] = useState<File | null>(null);
  const [result, setResult] = useState<PredictionResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      setResult(null);
    }
  };

  const handlePredict = async () => {
    if (!image) return;
    setLoading(true);

    const formData = new FormData();
    formData.append('file', image);

    try {
      const res = await fetch('http://127.0.0.1:8000/predict', {
        method: 'POST',
        body: formData,
      });
      const data: PredictionResponse = await res.json();
      setResult(data);
    } catch (err) {
      console.error('Prediction error:', err);
    }

    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 overflow-hidden">
      <div className="h-full flex flex-col md:flex-row">
        <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 border-b md:border-b-0 md:border-r border-slate-200 overflow-y-auto md:overflow-y-hidden">
          <div className="w-full max-w-md">
            <h1 className="text-2xl md:text-3xl font-bold text-slate-800 flex items-center justify-center gap-2 mb-6">
              <Brain className="w-8 h-8 text-cyan-600" />
              Brain Tumor Classifier
            </h1>

            {!image ? (
              <label className="block cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <div className="border-2 border-dashed border-slate-300 rounded-2xl p-8 hover:border-cyan-500 hover:bg-cyan-50/50 transition-all duration-200 flex flex-col items-center gap-3">
                  <Upload className="w-12 h-12 text-slate-400" />
                  <span className="text-slate-600 font-medium">
                    Choose MRI Image
                  </span>
                  <span className="text-sm text-slate-400">
                    Click to upload
                  </span>
                </div>
              </label>
            ) : (
              <div className="space-y-6">
                <div className="flex justify-center">
                  <img
                    src={URL.createObjectURL(image)}
                    alt="uploaded"
                    className="max-w-full h-auto max-h-64 object-contain rounded-2xl border-2 border-slate-200 shadow-lg"
                  />
                </div>

                <button
                  onClick={handlePredict}
                  disabled={loading}
                  className={`w-full py-3 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
                    loading
                      ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:from-cyan-700 hover:to-blue-700 shadow-lg hover:shadow-xl'
                  }`}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    'Analyze Image'
                  )}
                </button>

                <button
                  onClick={() => {
                    setImage(null);
                    setResult(null);
                  }}
                  className="w-full py-3 rounded-xl font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-all duration-200"
                >
                  Upload New Image
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center p-4 md:p-8 overflow-y-auto">
          {result ? (
            <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-6 md:p-8">
              <div className="bg-gradient-to-br from-slate-50 to-blue-50 p-5 rounded-xl mb-4">
                <p className="text-sm font-medium text-slate-600 mb-2">
                  Diagnosis
                </p>
                <p className="text-3xl font-bold text-slate-800 mb-4">
                  {result.top_class}
                </p>
                <div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-slate-600">Confidence</span>
                    <span className="font-semibold text-cyan-700">
                      {(result.top_confidence * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-cyan-600 to-blue-600 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${result.top_confidence * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white border-2 border-slate-200 p-5 rounded-xl">
                <h3 className="text-sm font-semibold text-slate-700 mb-3">
                  All Predictions
                </h3>
                <ul className="space-y-2.5">
                  {result.predictions.map((p, i) => (
                    <li
                      key={i}
                      className="flex items-center justify-between p-2.5 bg-slate-50 rounded-lg"
                    >
                      <span className="text-slate-700 font-medium">
                        {p.class}
                      </span>
                      <span className="text-slate-600 font-semibold">
                        {(p.confidence * 100).toFixed(1)}%
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="text-center text-slate-400">
              <p className="text-lg">Upload and analyze an image to see results</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
