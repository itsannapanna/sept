import { Routes, Route, Navigate } from 'react-router-dom';
import { QuizApp } from '../components/QuizApp';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<QuizApp />} />
      <Route path="/quiz" element={<QuizApp />} />
      <Route path="/results" element={<QuizApp />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}


