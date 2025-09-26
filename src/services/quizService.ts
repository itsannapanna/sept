import type { Topic, Question, GenerateQuestionsResponse, Option, Difficulty } from '../types/quiz';
import { shuffleArray } from '../utils/shuffle';
import { callAI } from './aiService';

// Builds a concrete, fact-based prompt for an AI to generate MCQs.
// The expected JSON ensures one correct answer and three plausible distractors.
export function buildAiPrompt(topic: string, numQuestions: number, difficulty?: Difficulty): string {
    return `
  You are a quiz generator. Create ${numQuestions} multiple-choice questions about the topic "${topic}".
  Difficulty: ${difficulty ?? 'Medium'}.
  
  Each question must follow this JSON schema exactly:
  
  {
    "questions": [
      {
        "id": "string",
        "text": "string",
        "options": [
          { "id": "string", "text": "string" },
          { "id": "string", "text": "string" },
          { "id": "string", "text": "string" },
          { "id": "string", "text": "string" }
        ],
        "correctOptionId": "string"
      }
    ]
  }
  
  Rules:
  - Write **fact-based, clear, and specific** questions (no placeholders like "correct fact number 1").
  - Make 1 correct option and 3 plausible distractors.
  - Use IDs like "q1", "o1", "o2" etc.
  - Keep the output valid JSON only — no explanations or comments.
    `;
  }
  

// A concrete fact bank to keep mocks realistic and allow unique sampling
const FACT_BANK: Record<Topic, Array<{ prompt: string; correct: string; distractors: string[] }>> = {
    'Tech Trends': [
      {
        prompt: 'Which company introduced the M-series Apple silicon chips starting in 2020?',
        correct: 'Apple',
        distractors: ['Intel', 'Qualcomm', 'AMD'],
      },
      {
        prompt: 'What does RISC-V primarily describe?',
        correct: 'An open instruction set architecture',
        distractors: ['A cloud computing vendor', 'A mobile OS', 'A web framework'],
      },
      {
        prompt: 'Which protocol underpins most ActivityPub-based social networks?',
        correct: 'Fediverse',
        distractors: ['BitTorrent', 'XMPP', 'SMTP'],
      },
    {
      prompt: 'Which company developed the CUDA platform widely used in AI workloads?',
      correct: 'NVIDIA',
      distractors: ['ARM', 'Apple', 'IBM'],
    },
    {
      prompt: 'What does WebAssembly (Wasm) allow in the browser?',
      correct: 'Running compiled code at near-native speed',
      distractors: ['Direct GPU access by default', 'Only Java execution', 'Database hosting'],
    },
    ],
    'Wellness': [
      {
        prompt: 'Which sleep stage is most associated with vivid dreaming?',
        correct: 'REM sleep',
        distractors: ['Stage N1', 'Stage N2', 'Stage N3'],
      },
      {
        prompt: 'Which vitamin is synthesized in the skin via sunlight exposure?',
        correct: 'Vitamin D',
        distractors: ['Vitamin C', 'Vitamin B12', 'Vitamin K'],
      },
      {
        prompt: 'Which practice focuses on breath and present-moment awareness?',
        correct: 'Mindfulness meditation',
        distractors: ['Plyometric training', 'HIIT', 'Progressive overload'],
      },
    {
      prompt: 'Which macronutrient is primarily used for muscle repair?',
      correct: 'Protein',
      distractors: ['Carbohydrates', 'Fiber', 'Alcohol'],
    },
    {
      prompt: 'Which mineral is essential for oxygen transport in the blood?',
      correct: 'Iron',
      distractors: ['Sodium', 'Potassium', 'Iodine'],
    },
    ],
    'AI': [
      {
        prompt: 'Which architecture introduced attention mechanisms widely in NLP in 2017?',
        correct: 'Transformer',
        distractors: ['LSTM', 'GRU', 'Naive Bayes'],
      },
      {
        prompt: 'Which metric is commonly used to evaluate image classification accuracy?',
        correct: 'Top-1 accuracy',
        distractors: ['BLEU score', 'ROUGE-L', 'WER'],
      },
      {
        prompt: 'What does RLHF stand for in model alignment?',
        correct: 'Reinforcement Learning from Human Feedback',
        distractors: [
          'Regularized Learning for High Fidelity',
          'Recurrent Learning of Hidden Features',
          'Randomized Layer Hyperparameter Fitting',
        ],
      },
    {
      prompt: 'Which dataset is commonly used for benchmarking object detection models?',
      correct: 'COCO',
      distractors: ['SQuAD', 'GLUE', 'LibriSpeech'],
    },
    {
      prompt: 'Which optimization algorithm adaptively scales learning rates per parameter?',
      correct: 'Adam',
      distractors: ['SGD without momentum', 'Newton-Raphson', 'Simulated annealing'],
    },
    ],
};

function buildQuestionsFromBank(topic: Topic, numQuestions: number): Question[] {
  const entries = FACT_BANK[topic] ?? [];
  if (entries.length === 0) return [];

  // Sample without replacement
  const sampled = shuffleArray(entries).slice(0, Math.min(numQuestions, entries.length));
  return sampled.map((picked, index) => {
    const idBase = `${Date.now()}-${Math.random().toString(36).slice(2)}-${index}`;
    const correctId = `${idBase}-a`;
    const options = shuffleArray([
      { id: correctId, text: picked.correct },
      { id: `${idBase}-b`, text: picked.distractors[0] },
      { id: `${idBase}-c`, text: picked.distractors[1] },
      { id: `${idBase}-d`, text: picked.distractors[2] },
    ]);

    return {
      id: `${idBase}-q`,
      prompt: picked.prompt,
      options,
      correctOptionId: options.find((o) => o.text === picked.correct)?.id ?? correctId,
    };
  });
}

function dedupeQuestionsByPrompt(questions: Question[]): Question[] {
  const seen = new Set<string>();
  const result: Question[] = [];
  for (const q of questions) {
    const key = q.prompt.trim().toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    result.push(q);
  }
  return result;
}

function normalizeAiQuestions(aiJson: any): Question[] {
  if (!aiJson || !Array.isArray(aiJson.questions)) return [];
  const out: Question[] = [];
  for (const raw of aiJson.questions) {
    if (!raw) continue;
    const qId: string = String(raw.id ?? '').trim() || `${Date.now()}-${Math.random()}`;
    const promptText: string = String(raw.prompt ?? raw.text ?? '').trim();
    const optionsRaw: any[] = Array.isArray(raw.options) ? raw.options : [];
    const normalizedOptions: Option[] = optionsRaw
      .filter((o) => o && typeof o.text === 'string')
      .map((o, idx) => ({ id: String(o.id ?? `o${idx + 1}`), text: String(o.text) }));
    const correctId: string = String(raw.correctOptionId ?? '').trim();
    if (!promptText || normalizedOptions.length !== 4 || !correctId) continue;
    out.push({ id: qId, prompt: promptText, options: normalizedOptions, correctOptionId: correctId });
  }
  return out;
}

export async function fetchQuestions(params: { topic: Topic; numQuestions?: number; difficulty?: Difficulty }): Promise<GenerateQuestionsResponse> {
  const { topic, numQuestions = 5, difficulty } = params;
  try {
    if (!topic) {
      throw new Error('Topic is required');
    }
    if (numQuestions <= 0) {
      throw new Error('numQuestions must be greater than 0');
    }
    // Build prompt and call AI
    const prompt = buildAiPrompt(topic, numQuestions, difficulty);
    const aiJson = await callAI(prompt);

    // Normalize and dedupe
    let questions: Question[] = normalizeAiQuestions(aiJson);
    questions = dedupeQuestionsByPrompt(questions).slice(0, numQuestions);

    if (questions.length === 0) {
      throw new Error('AI returned no valid questions');
    }

    return { questions };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error while fetching questions';
    // In a real app, you might log this to an error reporting service
    console.error('[quizService.fetchQuestions] Error:', message);
    // Rethrow so UI can show an error/retry
    throw new Error(message);
  }
}


