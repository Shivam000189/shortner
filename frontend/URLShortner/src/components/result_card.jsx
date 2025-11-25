import React, { useState } from 'react';
import { Copy, Check, ExternalLink, BarChart2 } from 'lucide-react';

export const ResultCard = ({ data }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(data.shortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="w-full bg-slate-800/80 border border-slate-700 rounded-xl p-6 shadow-xl animate-slide-up backdrop-blur-sm">
      <div className="flex flex-col gap-4">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-700 pb-4">
          <span className="text-sm font-medium text-slate-400 uppercase tracking-wider">Result</span>
          <div className="flex items-center gap-2 text-emerald-400 text-sm bg-emerald-400/10 px-2 py-1 rounded-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Active
          </div>
        </div>

        {/* Short URL */}
        <div className="flex items-center gap-3">
          <div className="grow bg-slate-900/50 rounded-lg p-3 border border-slate-700/50 flex items-center justify-between group relative overflow-hidden">
            <a
              href={data.shortUrl?.startsWith('http') ? data.shortUrl : `http://${data.shortUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 font-semibold truncate hover:text-blue-300 transition-colors flex items-center gap-2"
            >
              {data.shortUrl}
              <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
            <div className="absolute inset-y-0 right-0 w-12 bg-linear-to-l from-slate-900/50 to-transparent pointer-events-none" />
          </div>

          <button
            onClick={handleCopy}
            className={`
              p-3 rounded-lg border transition-all duration-200 shrink-0
              ${
                copied
                  ? 'bg-green-500/20 border-green-500/50 text-green-400'
                  : 'bg-slate-700 hover:bg-slate-600 border-slate-600 text-slate-200'
              }
            `}
          >
            {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div className="bg-slate-700/30 p-3 rounded-lg flex items-center gap-3">
            <div className="p-2 bg-purple-500/20 rounded-md text-purple-400">
              <BarChart2 className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-slate-400">Total Clicks</span>
              <span className="font-mono text-slate-200 font-bold">{data.clicks || 0}</span>
            </div>
          </div>

          <div className="bg-slate-700/30 p-3 rounded-lg flex items-center gap-3">
            <div className="p-2 bg-orange-500/20 rounded-md text-orange-400">
              <span className="font-mono text-xs font-bold">ID</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-slate-400">Short Code</span>
              <span className="font-mono text-slate-200 font-bold">{data.shortCode}</span>
            </div>
          </div>
        </div>

        <div className="text-xs text-slate-500 truncate pt-2">
          Original: {data.originalUrl || 'N/A'}
        </div>
      </div>
    </div>
  );
};
