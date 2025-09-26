import { createContext, useContext, useMemo, useReducer, ReactNode } from 'react';
import type { Topic, Question, AnswerRecord } from '../types/quiz';

// Minimal state tailored to your requirement
interface QuizStateSimple {
  topic: Topic | null;
  questions: Question[];
  answers: Record<string, AnswerRecord>; // keyed by questionId
  score: number;
}

type QuizAction =
  | { type: 'SET_TOPIC'; topic: Topic }
  | { type: 'SET_QUESTIONS'; questions: Question[] }
  | { type: 'ANSWER'; record: AnswerRecord }
  | { type: 'RESET' };

const initialState: QuizStateSimple = {
  topic: null,
  questions: [],
  answers: {},
  score: 0,
};

function quizReducer(state: QuizStateSimple, action: QuizAction): QuizStateSimple {
  switch (action.type) {
    case 'SET_TOPIC':
      return { ...state, topic: action.topic };
    case 'SET_QUESTIONS':
      return { ...state, questions: action.questions, answers: {}, score: 0 };
    case 'ANSWER': {
      const updatedAnswers = { ...state.answers, [action.record.questionId]: action.record };
      const updatedScore = Object.values(updatedAnswers).filter((r) => r.isCorrect).length;
      return { ...state, answers: updatedAnswers, score: updatedScore };
    }
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

interface QuizContextValue extends QuizStateSimple {
  dispatch: React.Dispatch<QuizAction>;
}

const QuizContext = createContext<QuizContextValue | undefined>(undefined);

export function QuizProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(quizReducer, initialState);
  const value = useMemo(() => ({ ...state, dispatch }), [state]);
  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
}

export function useQuiz() {
  const ctx = useContext(QuizContext);
  if (!ctx) throw new Error('useQuiz must be used within QuizProvider');
  return ctx;
}


