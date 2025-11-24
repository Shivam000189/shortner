import React from 'react';
import { Link as LinkIcon } from 'lucide-react';

export const Input = ({ error, className = '', ...props }) => {
  return (
    <div className="relative w-full">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <LinkIcon className={`h-5 w-5 ${error ? 'text-red-400' : 'text-slate-400'}`} />
      </div>

      <input
        className={`
          block w-full pl-10 pr-3 py-3 border rounded-xl leading-5 
          bg-slate-800/50 text-slate-100 placeholder-slate-400
          focus:outline-none focus:ring-2 transition-all duration-200
          ${
            error
              ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
              : 'border-slate-600 focus:ring-blue-500 focus:border-blue-500 hover:border-slate-500'
          }
          ${className}
        `}
        {...props}
      />
    </div>
  );
};
