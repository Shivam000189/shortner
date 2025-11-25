import React from 'react';
import { Clock, ArrowRight, ExternalLink } from 'lucide-react';

export const HistoryList = ({ history, onSelect }) => {
  if (history.length === 0) return null;

  return (
    <div className="w-full mt-8 animate-fade-in">
      <div className="flex items-center gap-2 mb-4 text-slate-400">
        <Clock className="w-4 h-4" />
        <span className="text-sm font-medium uppercase tracking-wider">Recent Links</span>
      </div>

      <div className="space-y-3">
        {history.map((item) => (
          <div
            key={item.shortCode || item.shortUrl}
            onClick={() => onSelect(item)}
            className="group bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 hover:border-slate-600 rounded-lg p-4 cursor-pointer transition-all duration-200"
          >
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1 overflow-hidden">
                <div className="flex items-center gap-2 text-blue-400 font-medium text-sm">
                  {item.shortUrl}
                  <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-50" />
                </div>
                <div className="text-slate-500 text-xs truncate max-w-[250px] sm:max-w-md">
                  {item.originalUrl || 'N/A'}
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-xs text-slate-500 bg-slate-900/50 px-2 py-1 rounded">
                  {item.clicks || 0} clicks
                </div>
                <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-blue-400 transition-colors" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
