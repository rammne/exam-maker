"use client";
"use client";
import React, { useState } from "react";
import ReminderModal from "../components/ReminderModal"; // Import the ReminderModal component
import ExamForm from "../components/ExamForm";
import ExamResult from "@/components/ExamResult";

import LoadingSpinner from "../components/LoadingSpinner";


export default function Home() {
  const [exam, setExam] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPdfMsg, setShowPdfMsg] = useState(false);
  const [showReminder, setShowReminder] = useState(true); // State to control the reminder modal



  async function handleGenerate(form) {
    // Prompt for employeeID
    const employeeID = window.prompt("Enter your Employee ID to generate the exam:");
    if (!employeeID) {
      alert("Employee ID is required.");
      return;
    }

    setLoading(true);
    setExam("");

    // Attach employeeID to the form data and handle PDF download
    const res = await fetch("/api/generate-exam", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, employeeID }),
    });
    const contentType = res.headers.get("content-type");
    if (contentType && contentType.includes("application/pdf")) {
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "generated-exam.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
      setExam("");
      setShowPdfMsg(true);
      setTimeout(() => setShowPdfMsg(false), 4000);
    } else if (contentType && contentType.includes("application/json")) {
      const data = await res.json();
      setExam(data.exam || "No exam generated.");
    } else {
      const text = await res.text();
      setExam("");
      alert("Server error: " + text);
    }
    setLoading(false);
  }

  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-10 px-2 bg-[#0D2A5B]">
  <ReminderModal open={showReminder} onClose={() => setShowReminder(false)} /> {/* Render the ReminderModal */}
      <h1 className="title">OLOPSC Exam Maker</h1>
      <div className="card w-full max-w-4xl min-h-[350px] flex items-center justify-center relative">
        {showPdfMsg && (
          <div className="absolute top-0 left-0 w-full rounded-t-lg bg-[#FFC107] text-white text-center py-3 px-4 font-semibold shadow z-10 animate-fade-in">
            Exam PDF generated successfully!
          </div>
        )}
        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            <ExamForm onSubmit={handleGenerate} loading={loading} />
            <ExamResult exam={exam} />
          </>
        )}
      </div>
      <div className="text-white mt-10">&copy; Rammne | {currentYear}</div>
    </div>
  );
}
