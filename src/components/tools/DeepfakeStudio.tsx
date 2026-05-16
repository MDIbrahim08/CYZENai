import React, { useState } from 'react';
import { Image as ImageIcon, Loader2, Download, Wand2, ShieldAlert } from 'lucide-react';
import { cn } from '@/lib/utils';

export const DeepfakeStudio = ({ onBack }: { onBack?: () => void }) => {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateImage = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setError(null);

    try {
      const apiKey = import.meta.env.VITE_HUGGINGFACE_API_KEY;
      
      // Try HuggingFace first if we have a key
      if (apiKey && apiKey.length > 5) {
        try {
          const response = await fetch(
            "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
            {
              headers: { 
                Authorization: `Bearer ${apiKey}`,
                "Content-Type": "application/json",
              },
              method: "POST",
              body: JSON.stringify({ inputs: prompt }),
            }
          );

          if (response.ok) {
            const blob = await response.blob();
            const generatedUrl = URL.createObjectURL(blob);
            setImageUrl(generatedUrl);
            setLoading(false);
            return; // Success! Exit early.
          }
        } catch (hfError) {
          console.warn("HuggingFace failed, falling back to Pollinations...", hfError);
        }
      }

      // FALLBACK: Use Pollinations.ai (No API key, No CORS issues if used directly in img)
      console.log("Using Pollinations fallback...");
      // Add a random seed to prevent aggressive browser caching
      const randomSeed = Math.floor(Math.random() * 1000000);
      const pollinationsUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=1024&height=1024&nologo=true&enhance=true&seed=${randomSeed}`;
      
      // We don't fetch() it because that triggers CORS errors in the browser.
      // Instead, we preload it using a standard Image object.
      await new Promise((resolve, reject) => {
        const img = new window.Image();
        img.onload = resolve;
        img.onerror = () => reject(new Error("Image synthesis failed or timed out."));
        img.src = pollinationsUrl;
      });
      
      setImageUrl(pollinationsUrl);

    } catch (err: any) {
      // If even the fallback fails, show the exact error.
      setError(err.message || "Failed to generate image due to a network error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto py-12">
      {onBack && (
        <button 
          onClick={onBack}
          className="mb-8 flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors bg-purple-400/10 px-4 py-2 rounded-full text-sm font-medium border border-purple-400/20"
        >
          ← Back to Tools
        </button>
      )}

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left Col: Inputs */}
        <div className="flex flex-col gap-6">
          <div className="bg-[#0f1218] border border-white/10 rounded-3xl p-8 shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-purple-500/20 rounded-xl border border-purple-500/30">
                <Wand2 className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Deepfake Studio</h1>
                <p className="text-sm text-purple-400/80 font-medium tracking-widest uppercase">AI Media Forensics</p>
              </div>
            </div>

            <p className="text-white/60 text-sm mb-6 leading-relaxed">
              Generate photorealistic synthetic media to understand how AI constructs deepfakes. 
              Powered by HuggingFace SDXL Inference.
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2 text-white/90">Prompt / Subject Description</label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g., A photorealistic image of a futuristic cyberpunk server room with glowing blue cables..."
                  className="w-full h-32 bg-black/50 border border-white/10 rounded-xl p-4 text-sm text-white placeholder-white/30 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 resize-none transition-all"
                />
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-start gap-3">
                  <ShieldAlert className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-200">{error}</p>
                </div>
              )}

              <button
                onClick={generateImage}
                disabled={loading || !prompt.trim()}
                className={cn(
                  "w-full py-4 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-all duration-300 shadow-lg",
                  loading || !prompt.trim() 
                    ? "bg-white/5 text-white/30 cursor-not-allowed border border-white/10" 
                    : "bg-gradient-to-r from-purple-600 to-purple-400 hover:from-purple-500 hover:to-purple-300 shadow-purple-500/20 hover:-translate-y-1"
                )}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Synthesizing Media...
                  </>
                ) : (
                  <>
                    <ImageIcon className="w-5 h-5" />
                    Generate Synthetic Media
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Right Col: Output */}
        <div className="bg-[#0f1218] border border-white/10 rounded-3xl p-8 shadow-xl flex flex-col items-center justify-center min-h-[500px] relative overflow-hidden group">
          {loading ? (
            <div className="flex flex-col items-center gap-4 z-10">
              <div className="relative">
                <div className="w-24 h-24 border-4 border-purple-500/20 rounded-full animate-[spin_3s_linear_infinite]" />
                <div className="w-24 h-24 border-4 border-transparent border-t-purple-400 rounded-full animate-spin absolute inset-0" />
                <Wand2 className="w-8 h-8 text-purple-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
              </div>
              <p className="text-sm font-medium text-purple-400 animate-pulse tracking-widest uppercase mt-2">Rendering Tensors...</p>
            </div>
          ) : imageUrl ? (
            <>
              <img 
                src={imageUrl} 
                alt="AI Generated" 
                className="w-full h-full object-contain rounded-2xl absolute inset-0 z-0 p-2"
              />
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center backdrop-blur-sm">
                <a 
                  href={imageUrl}
                  download="synthetic_media.png"
                  className="bg-white/10 border border-white/20 hover:bg-white/20 text-white px-6 py-3 rounded-full font-semibold flex items-center gap-2 backdrop-blur-md transition-colors"
                >
                  <Download className="w-5 h-5" />
                  Download Image
                </a>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center gap-3 text-white/20 z-10">
              <ImageIcon className="w-16 h-16" />
              <p className="text-sm uppercase tracking-widest font-semibold">Output Viewer</p>
            </div>
          )}

          {/* Decorative scanner line */}
          {loading && (
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-400 to-transparent shadow-[0_0_15px_rgba(168,85,247,0.8)] animate-pulse" />
          )}
        </div>
      </div>
    </div>
  );
};
