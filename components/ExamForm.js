import React, { useState } from "react";

export default function ExamForm({ onSubmit, loading }) {
  const [form, setForm] = useState({
    program: "",
    course: "",
    yearLevel: "",
    semester: "",
    period: "",
    totalItems: "",
    breakdown: "",
    topics: "",
    timeLimit: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(form);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input name="program" placeholder="Program" className="input" onChange={handleChange} required />
      <input name="course" placeholder="Course" className="input" onChange={handleChange} required />
      <input name="yearLevel" placeholder="Year Level" className="input" onChange={handleChange} required />
      <input name="semester" placeholder="Semester" className="input" onChange={handleChange} required />
      <input name="period" placeholder="Academic Period" className="input" onChange={handleChange} required />
      <input name="totalItems" placeholder="Total Number of Items" className="input" onChange={handleChange} required />
      <input name="breakdown" placeholder="Exam Type Breakdown" className="input" onChange={handleChange} required />
      <textarea name="topics" placeholder="Topics/Contents (optional)" className="input" onChange={handleChange} />
      <input name="timeLimit" placeholder="Time Limit (optional, in minutes)" className="input" onChange={handleChange} />
      <button type="submit" className="btn-primary mt-4" disabled={loading}>
        {loading ? "Generating..." : "Generate Exam"}
      </button>
    </form>
  );
}
