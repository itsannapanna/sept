import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuiz } from '../../context/QuizContext';
import { QuestionCard } from '../QuestionCard';
import { ProgressBar } from '../ProgressBar';

export default function QuizContent() {
  const navigate = useNavigate();
  const { questions, answers, dispatch } = useQuiz();
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);

  const total = questions.length;
  const current = questions[index];
  const selectedId = useMemo(() => answers[current?.id]?.selectedOptionId, [answers, current]);

  function handleSelect(optionId: string) {
    if (!current) return;
    const isCorrect = optionId === current.correctOptionId;
    dispatch({
      type: 'ANSWER',
      record: { questionId: current.id, selectedOptionId: optionId, isCorrect },
    });
    setRevealed(true);
  }

  function goNext() {
    setIndex((i) => Math.min(i + 1, total - 1));
    setRevealed(false);
  }
  
  function goPrev() {
    setIndex((i) => Math.max(i - 1, 0));
    setRevealed(true);
  }

  function handleFinish() {
    navigate('/results');
  }

  if (total === 0) {
    return (
      <div style={{ display: 'grid', placeItems: 'center', minHeight: '200px' }}>
        <p>No questions loaded. Go back to Home.</p>
      </div>
    );
  }

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ marginBottom: 12 }}>
        <ProgressBar current={index + 1} total={total} />
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <QuestionCard 
          question={current} 
          selectedOptionId={selectedId} 
          onSelect={handleSelect} 
          reveal={revealed || !!selectedId} 
          disabled={revealed || !!selectedId} 
          displayNumber={index + 1} 
        />
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 16 }}>
        <button
          onClick={goPrev}
          disabled={index === 0}
          style={{
            padding: '10px 14px',
            borderRadius: 8,
            border: '1px solid #111',
            background: '#faf7ef',
            color: '#111',
            cursor: index === 0 ? 'not-allowed' : 'pointer',
          }}
        >
          Previous
        </button>
        {index < total - 1 ? (
          <button
            onClick={goNext}
            disabled={!selectedId}
            style={{
              padding: '10px 14px',
              borderRadius: 8,
              border: '1px solid #111',
              background: '#faf7ef',
              color: '#111',
              opacity: selectedId ? 1 : 0.6,
              cursor: selectedId ? 'pointer' : 'not-allowed',
            }}
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleFinish}
            disabled={!selectedId}
            style={{
              padding: '10px 14px',
              borderRadius: 8,
              border: '1px solid #111',
              background: '#faf7ef',
              color: '#111',
              opacity: selectedId ? 1 : 0.6,
              cursor: selectedId ? 'pointer' : 'not-allowed',
            }}
          >
            Finish
          </button>
        )}
      </div>

      <div style={{ marginTop: 20, textAlign: 'center', fontFamily: 'Cinzel, ui-serif, Georgia, Cambria, "Times New Roman", Times, serif', letterSpacing: '0.08em' }}>
        Page {index + 1} of {total}
      </div>
    </div>
  );
}
