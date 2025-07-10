import React from "react";

export default function ExamResult({ exam }) {
  if (!exam) return null;
  return (
    <div className="mt-6 whitespace-pre-wrap font-mono text-[#0D2A5B] text-base text-center">
      {exam}
    </div>
  );
}
