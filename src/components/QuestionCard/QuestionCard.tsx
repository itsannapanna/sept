import type { Question } from '../../types/quiz';

interface QuestionCardProps {
  question: Question;
  selectedOptionId?: string;
  onSelect: (optionId: string) => void;
  reveal?: boolean;
  disabled?: boolean;
  displayNumber?: number;
}

export default function QuestionCard({ question, selectedOptionId, onSelect, reveal = false, disabled = false, displayNumber }: QuestionCardProps) {
  return (
    <div className="puzzle-box">
      <div className="puzzle-title">QUIZ QUESTION {displayNumber ?? ''}</div>
      <p style={{ fontSize: 18, marginBottom: 12, fontFamily: 'Lora, ui-serif, Georgia, Cambria, "Times New Roman", Times, serif' }}>{question.prompt}</p>
      <div style={{ display: 'grid', gap: 8 }}>
        {question.options.map((opt) => {
          const isSelected = selectedOptionId === opt.id;
          const isCorrect = question.correctOptionId === opt.id;
          const showFeedback = reveal;
          const prefix = ['A','B','C','D'][question.options.findIndex(o => o.id === opt.id)] ?? '';

          // Base styles
          let stateClass = '';

          if (showFeedback) {
            if (isSelected && isCorrect) {
              stateClass = 'correct';
            } else if (isSelected && !isCorrect) {
              stateClass = 'wrong';
            } else if (!isSelected && isCorrect) {
              stateClass = 'correct';
            }
          } else if (isSelected) {
            stateClass = 'selected';
          }

          return (
            <button
              key={opt.id}
              onClick={() => !disabled && onSelect(opt.id)}
              disabled={disabled}
              className={`puzzle-option ${stateClass}`}
              style={{ textAlign: 'left' }}
            >
              <span className="puzzle-prefix">({prefix})</span>
              <span>{opt.text}</span>
            </button>
          );
        })}
      </div>
      {reveal && (
        <div className="puzzle-note">
          {question.correctOptionId === selectedOptionId ? (
            <>Correct!</>
          ) : selectedOptionId ? (
            <>Oops! The right answer was ({['A','B','C','D'][question.options.findIndex(o => o.id === question.correctOptionId)]}).</>
          ) : null}
        </div>
      )}
    </div>
  );
}


