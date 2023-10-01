import React from "react";

export default function Card({
  icon,
  title,
  value,
  abrv,
  time,
  name,
  isIncrease,
  percent,
}) {
  return (
    <div className="bg-white false border rounded-md border-slate-200 p-2">
      <div className="flex items-center justify-between mt-0">
        <div className="flex mt-1 px-1 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={14}
            height={14}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-slate-700"
          >
            <line x1="16.5" y1="9.4" x2="7.5" y2="4.21" />
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
            <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
            <line x1={12} y1="22.08" x2={12} y2={12} />
          </svg>
          <h4 className="text-[13px] truncate font-semibold text-slate-700 capitalize ml-3">
            Message
          </h4>
        </div>
        <div className="flex items-center ml-5">
          <div className="h-2 w-2 bg-red-500 rounded-full" />
          <p className="text-xs line-clamp-1 truncate font-semibold text-slate-600 capitalize ml-3">
            Today
          </p>
        </div>
      </div>
      <div className="flex justify-between py-[10px] mt-2 px-2 bg-slate-100 bg-opacity-70 rounded-md items-center">
        <div className="flex pl-1 items-center">
          <h4 className="text-lg font-semibold capitalize text-slate-700">0</h4>
          <p className="text-[13px] ml-2 mb-[2px]- uppercase font-medium text-slate-500">
            payments
          </p>
        </div>
        <div className="bg-slate-300 space-y-2 rounded-[5px] px-3 py-[3px] bg-opacity-30">
          <span className="text-[13px] font-medium capitalize text-slate-500">
            Message
          </span>
          <div className="flex space-y-1 items-center">
            <p className="font-semibold text-slate-800 text-[13px]">2.0%</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={16}
              height={16}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-green-400 ml-2"
            >
              <line x1={7} y1={17} x2={17} y2={7} />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
