import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TopicPicker } from '../TopicPicker';
import { useQuiz } from '../../context/QuizContext';
import type { Topic } from '../../types/quiz';
import { fetchQuestions } from '../../services/quizService';

const TOPICS: Topic[] = ['Tech Trends', 'Wellness', 'AI','Beauty Buzz'];
const SUBTEXTS: Record<string, string> = {
    "Tech Trends": "Hot off the press: gadgets, gizmos & future talk.",
    "Wellness": "Your daily dose of mind–body puzzles & calm.",
    "AI": "Headlines from the world of brains, bots & bytes.",
    "Beauty Buzz": "Fresh columns on glow, glam & self-care smarts.",
  };

interface TopicPickerContentProps {
  onLoadingChange?: (loading: boolean) => void;
}

export default function TopicPickerContent({ onLoadingChange }: TopicPickerContentProps) {
  const navigate = useNavigate();
  const { dispatch } = useQuiz();
  const [error, setError] = useState<string | null>(null);

  async function handlePick(topic: Topic) {
    setError(null);
    onLoadingChange?.(true);
    try {
      console.log('Starting quiz for topic:', topic);
      dispatch({ type: 'SET_TOPIC', topic });
      console.log('Fetching questions...');
      const { questions } = await fetchQuestions({ topic, numQuestions: 5 });
      console.log('Questions fetched:', questions);
      dispatch({ type: 'SET_QUESTIONS', questions });
      console.log('Navigating to quiz...');
      navigate('/quiz');
    } catch (e) {
      console.error('Error in handlePick:', e);
      const message = e instanceof Error ? e.message : 'Failed to start quiz';
      setError(message);
    } finally {
      onLoadingChange?.(false);
    }
  }

  return (
    <>
      <div className="headline" style={{ textAlign: 'center', marginBottom: 24 }}>PICK A TOPIC TO TEST YOUR WITS!</div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 8 }}>
  {TOPICS.map((t) => (
    <div
      key={t}
      className="news-card"
      role="listitem"
      style={{ textAlign: 'center', width: 180 }}
    >
      <h3>{t}</h3>
      <p>{SUBTEXTS[t]}</p>
      <div style={{ height: 12 }} />
      <TopicPicker topics={[t]} onPick={handlePick} disabled={false} />
    </div>
  ))}
</div>

      {error && (
        <div style={{ marginTop: 16, textAlign: 'center' }}>
          <p style={{ color: '#b91c1c', marginBottom: 8 }}>Error: {error}</p>
          <button
            onClick={() => setError(null)}
            style={{
              padding: '8px 12px',
              borderRadius: 6,
              border: '1px solid #111',
              background: '#faf7ef',
              color: '#111',
              cursor: 'pointer',
            }}
          >
            Retry
          </button>
        </div>
      )}
    </>
  );
}
