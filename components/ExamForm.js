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
    <form onSubmit={handleSubmit} className="space-y-6 p-4 bg-white rounded-lg shadow-md">
      <div className="mb-4">
        <label className="block font-semibold mb-2">Program</label>
        <select
          name="program"
          className="input w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={handleChange}
          value={form.program}
          required
        >
          <option value="" disabled>
            Select Program
          </option>
          <option value="Bachelor of Science in Computing Studies / Associate in Computer Technologies">
            Bachelor of Science in Computing Studies / Associate in Computer Technologies
          </option>
          <option value="Bachelor of Science in Hospitality Management">
            Bachelor of Science in Hospitality Management
          </option>
          <option value="Bachelor of Science in Tourism Management">
            Bachelor of Science in Tourism Management
          </option>
          <option value="Bachelor of Science in Entrepreneurship">
            Bachelor of Science in Entrepreneurship
          </option>
          <option value="Bachelor of Science in Business Administration Major in Marketing Management">
            Bachelor of Science in Business Administration Major in Marketing Management
          </option>
          <option value="Bachelor of Science in Business Administration Major in Human Resource Management">
            Bachelor of Science in Business Administration Major in Human Resource Management
          </option>
          <option value="Bachelor of Arts in English Language">
            Bachelor of Arts in English Language
          </option>
          <option value="Bachelor of Elementary Education">
            Bachelor of Elementary Education
          </option>
          <option value="Bachelor of Secondary Education Major in English">
            Bachelor of Secondary Education Major in English
          </option>
          <option value="Bachelor of Secondary Education Major in Mathematics">
            Bachelor of Secondary Education Major in Mathematics
          </option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block font-semibold mb-2">Course Subject</label>
        <input name="course" placeholder="Course Subject" className="input w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={handleChange} required />
      </div>
      <div className="mb-4">
        <label className="block font-semibold mb-2">Year Level</label>
        <div className="flex flex-row gap-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="yearLevel"
              value="First Year College"
              checked={form.yearLevel === "First Year College"}
              onChange={handleChange}
              required
            />
            <span className="ml-2">First Year College</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="yearLevel"
              value="Second Year College"
              checked={form.yearLevel === "Second Year College"}
              onChange={handleChange}
            />
            <span className="ml-2">Second Year College</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="yearLevel"
              value="Third Year College"
              checked={form.yearLevel === "Third Year College"}
              onChange={handleChange}
            />
            <span className="ml-2">Third Year College</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="yearLevel"
              value="Fourth Year College"
              checked={form.yearLevel === "Fourth Year College"}
              onChange={handleChange}
            />
            <span className="ml-2">Fourth Year College</span>
          </label>
        </div>
      </div>
      <div className="mb-4">
        <label className="block font-semibold mb-2">Semester</label>
        <div className="flex flex-row gap-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="semester"
              value="First Semester"
              checked={form.semester === "First Semester"}
              onChange={handleChange}
              required
            />
            <span className="ml-2">First Semester</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="semester"
              value="Second Semester"
              checked={form.semester === "Second Semester"}
              onChange={handleChange}
            />
            <span className="ml-2">Second Semester</span>
          </label>
        </div>
      </div>
      <div className="mb-4">
        <label className="block font-semibold mb-2">Academic Period</label>
        <div className="flex flex-row gap-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="period"
              value="Prelim"
              checked={form.period === "Prelim"}
              onChange={handleChange}
              required
            />
            <span className="ml-2">Prelim</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="period"
              value="Midterm"
              checked={form.period === "Midterm"}
              onChange={handleChange}
            />
            <span className="ml-2">Midterm</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="period"
              value="Final"
              checked={form.period === "Final"}
              onChange={handleChange}
            />
            <span className="ml-2">Final</span>
          </label>
        </div>
      </div>
      <div className="mb-4">
        <label className="block font-semibold mb-2">Total Number of Items</label>
        <input name="totalItems" placeholder="Total Number of Items" className="input w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={handleChange} required />
      </div>
      <div className="mb-4">
        <label className="block font-semibold mb-2">Exam Type Breakdown</label>
        <input name="breakdown" placeholder="Exam Type Breakdown" className="input w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={handleChange} required />
      </div>
      <div className="mb-4">
        <label className="block font-semibold mb-2">Topics/Contents (optional)</label>
        <textarea name="topics" placeholder="Topics/Contents (optional)" className="input w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={handleChange} />
      </div>
      <div className="mb-4">
        <label className="block font-semibold mb-2">Time Limit (optional, in minutes)</label>
        <input name="timeLimit" placeholder="Time Limit (optional, in minutes)" className="input w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={handleChange} />
      </div>
      <button type="submit" className="btn-primary mt-4 w-full py-2 rounded bg-blue-600 text-white font-bold hover:bg-blue-700 transition" disabled={loading}>
        {loading ? "Generating..." : "Generate Exam"}
      </button>
    </form>
  );
}
