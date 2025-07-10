# AI-Powered Exam Generator

This project is a Next.js web application (plain JavaScript, no TypeScript) that allows educators to generate comprehensive, college-level exams using the Gemini API. It features:

- **Frontend**: React + TailwindCSS form for inputting exam parameters
- **Backend/API**: Next.js API route that constructs a prompt and calls the Gemini API
- **Results Display**: Renders the generated exam and answer key
- **Optional**: Firebase config for future user authentication or saving exams

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Add your Gemini API key to a `.env.local` file:
   ```env
   GEMINI_API_KEY=your_google_gemini_api_key
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure
- `components/ExamForm.js` – Form for exam parameters
- `components/ExamResult.js` – Displays generated exam
- `pages/api/generate-exam.js` – API route for Gemini integration
- `firebase.js` – Firebase config (optional)

## Customization
- To enable Firebase, add your config to `firebase.js` and install `firebase`:
  ```bash
  npm install firebase
  ```

## Deployment
- Deploy easily to Vercel or your preferred platform.

---
