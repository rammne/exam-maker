// pages/api/generate-exam.js
import PDFDocument from "pdfkit";
import { getProfessorByEmployeeID } from "../../lib/firestore";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const data = req.body;

  // Check professor by employeeID
  const employeeID = data.employeeID;
  if (!employeeID) {
    return res.status(400).json({ error: 'Employee ID is required.' });
  }
  const professor = await getProfessorByEmployeeID(employeeID);
  if (!professor) {
    return res.status(403).json({ error: 'Invalid Employee ID. Access denied.' });
  }

  function buildPrompt(data) {
    return `
You are an expert exam designer tasked with generating a comprehensive and well-structured college-level examination. Please generate an exam based on the following professor-provided details:

• Program: ${data.program}
• Course Subject: ${data.course}
• Year Level: ${data.yearLevel}
• Semester: ${data.semester}
• Period: ${data.period}
• Number of Items: ${data.totalItems}
• Exam Type: ${data.breakdown}
• Topics/Contents (optional): ${data.topics || "Use typical core topics for the course and period."}
• Time Limit (optional): ${data.timeLimit || "N/A"}
• Instructions: Provide clear and professional instructions for each exam section.
• Formatting:
    - Group questions by type (e.g., Part I: Multiple Choice, Part II: Essay/Hands-On).
    - Use clean, academic formatting and clear numbering.

Cognitive Skill Requirement:
Cover a mix of Lower-Order Thinking Skills (LOTS) and Higher-Order Thinking Skills (HOTS) based on the Revised Bloom’s Taxonomy (2001):

LOTS: Remember, Understand, Apply

HOTS: Analyze, Evaluate, Create

Distribute questions across the Bloom’s levels where appropriate for the course and level.

Output Format Requirements:

Part I – Multiple Choice (or other objective item types)

Each question must include:
  - One correct answer
  - Three plausible distractors
  - Choices labeled a), b), c), and d)

Do not include the answer or Bloom’s level in the question section.

Structure:

(question for item number 1)
    a. choice a
    b. choice b
    c. choice c
    d. choice d

Part II – Essay / Hands-On / Case Study / Problem-Solving

Focus these questions on higher-order thinking (Analyze, Evaluate, Create).

Each task must be clearly and comprehensively stated but should not include the Bloom’s level in the question itself.

For every question in this section, a corresponding grading rubric must be generated in the "Answer Key and Grading Guide" section.

Structure:

(hands-on or essay task for item number 1)

Answer Key and Grading Guide Requirements:
Place this entire section after the main examination questionnaire. Structure it into two clear parts:

Part I - Answer Key for Objective Items:

List the item number, the correct letter choice, and the Bloom’s Taxonomy level.

Example Format:

A (Remember)

C (Apply)

Part II - Grading Rubrics for Subjective Items:

For each Essay, Hands-On, or other subjective question, provide a detailed grading rubric.

Begin by stating the question number and its primary Bloom's Taxonomy level (e.g., Question 1 (Create)).

Each rubric must contain the following components:

Criteria: The specific aspects being assessed (e.g., Content Accuracy, Critical Analysis, Organization, Application of Concepts, Clarity).

Performance Levels: A scale to rate the student's performance (e.g., Excellent, Proficient, Developing, Unsatisfactory or a 4-point scale).

Descriptors: Clear, specific descriptions for each performance level within each criterion. Explain what a student's response must demonstrate to earn that score.

Additional Instructions:

Ensure the exam is suitable for the specified program and course level.

Make sure to generate the exam in a professional and academic tone, suitable for college-level students.

Make sure that the exam is comprehensive and covers the topics relevant to the course and period.

Make sure to provide only the questionnaire and the answer key/grading guide as instructed above, without any additional text or explanations.

Make sure to not use a markdown formatted content. Format it as plain text.
`;
  }

  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
  const GEMINI_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

  try {
    const prompt = buildPrompt(data);
    const response = await fetch(`${GEMINI_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    });
    // Check for non-JSON (HTML) error responses
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text();
      console.error('Non-JSON response from Gemini API:', text);
      return res.status(502).json({ error: 'Invalid response from Gemini API.' });
    }
    const result = await response.json();
    console.log('Gemini API result:', JSON.stringify(result, null, 2));
    const examText = result.candidates?.[0]?.content?.parts?.[0]?.text || 'No exam generated.';

    // Generate PDF using pdfkit (Node.js server-side)
    const doc = new PDFDocument({ size: "A4", margin: 40 });
    doc.fontSize(12).text(examText, { width: 500 });
    doc.end();
    // Stream PDF to buffer (Node.js native, works with Turbopack)
    const pdfBuffer = await new Promise((resolve, reject) => {
      const chunks = [];
      doc.on('data', chunk => chunks.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(chunks)));
      doc.on('error', reject);
    });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=generated-exam.pdf");
    res.status(200).send(pdfBuffer);
  } catch (error) {
    console.error('Error in generate-exam:', error);
    res.status(500).json({ error: 'Failed to generate exam.' });
  }
}
