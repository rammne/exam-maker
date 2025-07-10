import React from "react";

export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#FFC107] border-solid"></div>
      <div className="mt-6 text-[#0D2A5B] text-lg font-semibold">Generating Exam...</div>
    </div>
  );
}
