export type Topic =
  | 'Tech Trends'
  | 'Wellness'
  | 'AI'
  | 'Beauty Buzz';

export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export interface Option {
  id: string;
  text: string;
}

export interface Question {
  id: string;
  prompt: string;
  options: Option[];
  correctOptionId: string;
}

export type QuizStatus = 'idle' | 'loading' | 'in_progress' | 'completed' | 'error';

export interface AnswerRecord {
  questionId: string;
  selectedOptionId: string;
  isCorrect: boolean;
}

export interface QuizState {
  topic: Topic | null;
  questions: Question[];
  currentIndex: number;
  answers: Record<string, AnswerRecord>; // keyed by questionId
  score: number;
  status: QuizStatus;
  error?: string;
}

export interface GenerateQuestionsRequest {
  topic: Topic;
  numQuestions: number;
  difficulty?: Difficulty;
}

export interface GenerateQuestionsResponse {
  questions: Question[];
}

export interface PersistedQuizState {
  topic: Topic | null;
  questions: Question[];
  currentIndex: number;
  answers: Record<string, AnswerRecord>;
  score: number;
  status: QuizStatus;
}


