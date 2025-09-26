import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuiz } from '../../context/QuizContext';

export default function ResultsContent() {
  const navigate = useNavigate();
  const { score, questions, dispatch } = useQuiz();
  const total = questions.length;

  const message = useMemo(() => {
    const ratio = total > 0 ? score / total : 0;
    if (ratio === 1) return 'Perfect! You crushed it!';
    if (ratio >= 0.8) return 'Awesome work! Almost perfect!';
    if (ratio >= 0.6) return 'Nice job! Keep going!';
    if (ratio > 0) return 'Good effort! Practice makes progress!';
    return "It's a start! Try another topic and level up!";
  }, [score, total]);

  function handleRestart() {
    dispatch({ type: 'RESET' });
    navigate('/');
  }

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div className="masthead" style={{ fontSize: 'clamp(20px, 4vw, 32px)', textAlign: 'center', marginBottom: 16 }}>Your Results Are In!</div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: 16,
          alignItems: 'start',
        }}
      >
        {/* Score block like a review rating */}
        <div
          style={{
            background: '#fffdfa',
            border: '1.5px solid #111',
            borderRadius: 8,
            padding: 16,
            textAlign: 'center',
          }}
        >
          <div style={{ fontFamily: 'Cinzel, ui-serif, Georgia, Cambria, "Times New Roman", Times, serif', letterSpacing: '0.12em', fontWeight: 900, fontSize: 14 }}>SCORE</div>
          <div style={{ fontFamily: 'Cinzel, ui-serif, Georgia, Cambria, "Times New Roman", Times, serif', fontSize: 36, fontWeight: 900, marginTop: 6 }}>
            {score} / {total}
          </div>
        </div>

        {/* Horoscope/editorial blurb */}
        <div className="puzzle-box" style={{ marginTop: 4 }}>
          <div className="puzzle-title" style={{ marginBottom: 8 }}>EDITORIAL NOTES</div>
          <p style={{ fontFamily: 'Lora, ui-serif, Georgia, Cambria, "Times New Roman", Times, serif', fontSize: 16, margin: 0 }}>
            {message}
          </p>
          <div style={{ marginTop: 10, fontFamily: 'Lora, ui-serif, Georgia, Cambria, "Times New Roman", Times, serif', fontStyle: 'italic', color: '#374151' }}>
            — The Quiz Times Editorial Board
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
        <button
          onClick={handleRestart}
          style={{
            padding: '10px 14px',
            borderRadius: 8,
            border: '1px solid #111',
            background: '#faf7ef',
            color: '#111',
            cursor: 'pointer',
          }}
        >
          Try Another Topic
        </button>
      </div>
    </div>
  );
}
