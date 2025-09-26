# Sample README – AI-Assisted Knowledge Quiz

---

## 1. Project Setup & Demo

- Web (React + TypeScript + Vite):
  - Install dependencies:
    ```bash
    npm install
    ```
  - Run the dev server:
    ```bash
    npm run dev
    ```
  - Open the local URL printed by Vite (typically http://localhost:5173).
- Mobile: This project is web‑only; no native mobile builds are provided.
- Demo: Add a hosted link or a short screen recording here once deployed.

Optional (live AI questions):
- Create `.env` in the project root and set:
  ```
  VITE_GEMINI_API_KEY=your_api_key_here
  ```
  Without a key, the app uses mock questions so you can demo end‑to‑end.

---

## 2. Problem Understanding

This project is an AI‑assisted quiz app presented as a quirky newspaper. Users pick a topic (Tech Trends, Wellness, AI, Beauty Buzz), then answer multiple‑choice questions. The UI keeps a consistent newspaper feel across screens: masthead, newsprint background, dotted rules, and persistent “fluff” blurbs (Weather, Crossword, Late Edition at the top; Classifieds, Markets, Sports at the bottom).

Assumptions:
- Topics are predefined categories; each quiz session pulls questions by topic.
- AI can generate or augment question sets; the app gracefully falls back to mock data if the AI key is missing or responses are invalid.
- Users can move backward and forward through questions and see immediate feedback upon selection.

---

## 3. AI Prompts & Iterations

During development, AI (via Cursor + Gemini) was used to:
- Draft newspaper‑style layouts and CSS rules (masthead, dotted dividers, texture).
- Generate quiz questions (JSON structure with one correct answer and 3 distractors).
- Refine copy and topic subtexts to match the newspaper voice.

Example – initial prompt (for questions):
```text
Create 5 multiple‑choice questions about the topic "AI" in valid JSON with fields: id, text, options[4], correctOptionId. Make questions fact‑based and clear.
```

Refined prompt (after validation issues):
```text
You are a quiz generator. Create 5 MCQs for topic "AI".
Return ONLY JSON with shape:
{ "questions": [{ "id": "q1", "text": "...", "options": [{"id":"o1","text":"..."}, ...], "correctOptionId": "oX" }] }
Rules: exactly 4 options; one correct; no commentary; IDs like q1/o1.
```

How outputs are used:
- Responses are parsed in `aiService.ts` and normalized in `quizService.ts`. Invalid or empty responses cause a controlled error, triggering fallbacks or error UI.

---

## 4. Architecture & Code Structure

Frontend stack: React 18, TypeScript, Vite.

- Navigation & Shell
  - `src/routes/AppRoutes.tsx`: Routes (`/`, `/quiz`, `/results`) all render a single orchestrator component.
  - `src/components/QuizApp/QuizApp.tsx`: Chooses which content to show (Topic Picker, Loading, Quiz, Results) and wraps everything in the layout.
  - `src/layouts/QuizLayout.tsx`: Persistent newspaper chrome (masthead, newsprint background, top/bottom blurbs) and a centered container.
  - `src/components/DynamicContentArea/DynamicContentArea.tsx`: Bordered “article” area where content swaps per view.

- Content
  - `src/components/TopicPickerContent/TopicPickerContent.tsx`: Topic cards and subtexts; triggers loading and question fetch.
  - `src/components/LoadingScreen/LoadingScreen.tsx`: Newspaper‑themed loading with ticker.
  - `src/components/QuizContent/QuizContent.tsx`: Progress, `QuestionCard`, navigation (Previous/Next/Finish), and page indicator.
  - `src/components/ResultsContent/ResultsContent.tsx`: Score block and horoscope‑style feedback blurb.
  - `src/components/NewspaperFluff/NewspaperFluff.tsx`: Top “fluff” blurbs shared across views.

- Core UI
  - `src/components/TopicPicker/TopicPicker.tsx`: Renders topic “clipping” buttons.
  - `src/components/QuestionCard/QuestionCard.tsx`: Puzzle‑style question box with A–D options and feedback states.
  - `src/components/ProgressBar/ProgressBar.tsx`: Thin dotted progress line.

- State & Services
  - `src/context/QuizContext.tsx`: Global quiz state (topic, questions, answers, score); reducer actions: `SET_TOPIC`, `SET_QUESTIONS`, `ANSWER`, `RESET`.
  - `src/services/quizService.ts`: Builds prompts, normalizes AI output, dedupes, and returns validated question arrays.
  - `src/services/aiService.ts`: Calls Gemini (`VITE_GEMINI_API_KEY`) or returns mock data when no key is present.

- Styles
  - `src/styles/globals.css`: Newsprint texture, masthead, dotted rules, puzzle classes, and simple animations (`fadeIn`, `ticker`).

---

## 5. Screenshots / Screen Recording

- Home / Topic Picker: `![home](./screenshots/home.png)`
- Loading: `![loading](./screenshots/loading.png)`
- Quiz Question: `![quiz](./screenshots/quiz.png)`
- Results: `![results](./screenshots/results.png)`
- Demo Video: `[Watch Demo](https://example.com/demo)`

Add real images/links once captured or deployed.

---

## 6. Known Issues / Improvements

- Layout polish
  - Minor spacing/padding adjustments around dividers and cards may be desirable on small screens.
  - Topic card widths are fixed in a row; could be more adaptive at narrow breakpoints.
- AI dependency
  - Requires `VITE_GEMINI_API_KEY` for live question generation; otherwise uses mock data.
  - AI responses can vary; validation rejects malformed answers.
- Accessibility
  - Additional ARIA roles/labels and focus states can improve screen‑reader usability.
- Features
  - Randomized question banks, per‑topic difficulty selection, and result sharing are not yet implemented.

---

## 7. Bonus Work

- Cohesive newspaper aesthetic: masthead, newsprint background, dotted rules, and authentic “fluff” blurbs.
- Topic‑specific subtexts to reinforce voice and theme.
- Puzzle‑style question boxes with A–D prefixes and immediate feedback.
- Subtle animations (fade‑in, ticker) and hover states for tactile feel.
- Graceful fallbacks: mock questions when the AI key is missing.

