import React, { useState, useEffect } from 'react';
import { Link2, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import { Input } from './components/Input';
import { ResultCard } from './components/result_card';
import { HistoryList } from './components/history_list';
import { shortenUrl } from './services/urlServices';

export default function App() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);

  // hist load 
  useEffect(() => {
    const saved = localStorage.getItem('linkHistory');
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse history", e);
      }
    }
  }, []);

  // change his
  useEffect(() => {
    localStorage.setItem('linkHistory', JSON.stringify(history));
  }, [history]);

  const handleShorten = async (e) => {
    if (e) e.preventDefault();
    if (!originalUrl) {
      setError("Please enter a valid URL");
      return;
    }

    setError(null);
    setIsLoading(true);
    setResult(null);

    try {
      const data = await shortenUrl(originalUrl);

      const newResult = { ...data, originalUrl };
      setResult(newResult);

      // add his
      setHistory(prev => {
        const filtered = prev.filter(item => item.shortCode !== data.shortCode);
        const newItem = { ...newResult, id: Date.now().toString() };
        return [newItem, ...filtered].slice(0, 5);
      });

      setOriginalUrl(""); 
    } catch (err) {
      let msg = "Cannot connect to server.";
      if (err instanceof Error) msg = err.message;
      if (msg === "Failed to fetch") {
        msg = "Could not connect to backend server (localhost:3000). Ensure API is running.";
      }
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const restoreFromHistory = (item) => {
    setResult(item);
    setError(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen w-full bg-[#0f172a] text-slate-100 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">

      {/* Background color */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-blue-500/20 blur-[120px] rounded-full pointer-events-none opacity-50" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-purple-500/10 blur-[100px] rounded-full pointer-events-none" />

      {/* main div */}
      <div className="w-full max-w-lg z-10 flex flex-col items-center gap-8">

        {/* header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center p-3 bg-blue-500/10 rounded-2xl ring-1 ring-blue-500/50 mb-4 shadow-[0_0_20px_-5px_rgba(59,130,246,0.5)]">
            <Link2 className="w-8 h-8 text-blue-400" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-linear-to-r from-blue-200 via-blue-400 to-purple-400">
            URLSHORTNER
          </h1>
          <p className="text-slate-400 text-lg max-w-md mx-auto">
            Transform long, ugly links into short, memorable ones in seconds.
          </p>
        </div>

        
        <div className="w-full bg-slate-800/50 border border-slate-700/50 backdrop-blur-xl rounded-2xl p-6 shadow-2xl">
          <form onSubmit={handleShorten} className="flex flex-col gap-4">
            <div className="space-y-2">
              <label htmlFor="url-input" className="text-sm font-medium text-slate-300 ml-1">
                Destination URL
              </label>
              <Input
                id="url-input"
                placeholder="https://example.com/very-long-url..."
                value={originalUrl}
                onChange={(e) => {
                  setOriginalUrl(e.target.value);
                  if (error) setError(null);
                }}
                error={!!error}
                autoFocus
              />
            </div>

            {error && (
              <div className="flex items-start gap-2 text-red-400 text-sm bg-red-400/10 p-3 rounded-lg animate-fade-in">
                <AlertCircle className="w-4 h-4 mt-0 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="
                group relative w-full flex items-center justify-center py-3.5 px-4 border border-transparent 
                text-base font-semibold rounded-xl text-white 
                bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-blue-500
                transition-all duration-200 shadow-lg shadow-blue-500/25
                disabled:opacity-70 disabled:cursor-not-allowed disabled:shadow-none
              "
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
                  Shortening...
                </>
              ) : (
                <>
                  Shorten URL
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        </div>

        
        {result && <ResultCard data={result} />}

        
        <HistoryList history={history} onSelect={restoreFromHistory} />

        
        <footer className="mt-12 text-slate-600 text-sm text-center">
          <p>© {new Date().getFullYear()} URLSHORTNER. Simple. Fast. Secure.</p>
        </footer>

      </div>
    </div>
  );
}
