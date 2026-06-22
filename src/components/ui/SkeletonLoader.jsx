import React from "react";

export const SkeletonLoader = ({ lines = 3, className = "" }) => (
  <div className={`space-y-3 ${className}`}>
    {Array.from({ length: lines }).map((_, i) => (
      <div key={i} className={`skeleton h-4 ${i === lines - 1 ? "w-2/3" : "w-full"}`} />
    ))}
  </div>
);

export const CardSkeleton = () => (
  <div className="bg-white dark:bg-slate-800 border border-stone-200 dark:border-slate-700 rounded-2xl p-5 space-y-4 animate-pulse">
    <div className="skeleton h-5 w-1/2" />
    <div className="space-y-2">
      <div className="skeleton h-3 w-full" />
      <div className="skeleton h-3 w-5/6" />
      <div className="skeleton h-3 w-4/6" />
    </div>
    <div className="flex gap-2 pt-2">
      <div className="skeleton h-9 w-24 rounded-xl" />
      <div className="skeleton h-9 w-20 rounded-xl" />
    </div>
  </div>
);

export const ChatSkeleton = () => (
  <div className="space-y-6 px-4 py-6">
    <div className="flex justify-end">
      <div className="skeleton h-10 w-48 rounded-2xl rounded-tr-none" />
    </div>
    <CardSkeleton />
  </div>
);
