import React from "react";

export default function ReminderModal({ open, onClose }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-white max-w-lg w-full rounded-lg shadow-lg p-6 relative animate-fade-in">
        <h2 className="text-xl font-bold mb-4 text-[#0D2A5B]">Important Reminders</h2>
        <div className="text-gray-800 text-sm mb-6" style={{lineHeight: '1.7'}}>
          <div className="mb-3">Before you begin, please take a moment to read these very important reminders:</div>
          <div className="mb-3">
            <strong>Extremely Limited Usage:</strong> Our access to the AI model has a strict and limited quota on the number of exams we can generate. Please be very mindful of this. I ask that you use the system judiciously and only when you are ready to generate a serious draft. Finalize your parameters (topics, number of items, etc.) before clicking generate to avoid consuming our shared limit unnecessarily.
          </div>
          <div className="mb-3">
            <strong>System is in Development:</strong> This tool is still a work in progress. It is intended to be an assistant, not a replacement for your professional expertise.
          </div>
          <div className="mb-3">
            <strong>Proofreading is Essential:</strong> The generated exam must be treated as a first draft. It is absolutely crucial that you thoroughly proofread, review, and manually adjust the questions, choices, and rubrics to ensure they meet your pedagogical standards and accurately reflect your specific course material. Your expert judgment is the final and most important step.
          </div>
          <div className="mb-3">
            I strongly encourage you to provide feedback. Your insights on its performance, usability, and the quality of the output are invaluable as we continue to refine it. Please feel free to share your thoughts or any issues you encounter directly with me.
          </div>
          <div>
            Thank you for your cooperation and for helping us test this new resource responsibly.
          </div>
        </div>
        <button
          className="w-full py-2 rounded bg-blue-600 text-white font-bold hover:bg-blue-700 transition"
          onClick={onClose}
          autoFocus
        >
          I Understand
        </button>
      </div>
    </div>
  );
}
