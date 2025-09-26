import { ReactNode } from 'react';
import { NewspaperFluff } from '../components/NewspaperFluff';
import { DynamicContentArea } from '../components/DynamicContentArea';

interface QuizLayoutProps {
  children: ReactNode;
}

export default function QuizLayout({ children }: QuizLayoutProps) {
    return (
      <div
        className="newsprint-bg" // newspaper background on the true root
        style={{
          width: '100%',
          minHeight: '100vh',
          margin: 0,
          padding: '40px 8px 16px',
          boxSizing: 'border-box',
          border: '2px solid #111', // keep border around the full page
        }}
      >
            {/* Newspaper masthead */}
            <div className="masthead">
              THE DAILY QUIZ
              <div className="rule" />
            </div>
  
          {/* Top newspaper fluff */}
          <NewspaperFluff />

          {/* Dynamic content area */}
          <DynamicContentArea>
            {children}
          </DynamicContentArea>

          {/* Bottom newspaper fluff */}
          <div className="news-divider" />
          <div className="news-grid" role="list" style={{ marginTop: 16 }}>
            <div className="blurb" aria-hidden>
              Classifieds: Seeking trivia buffs with swift recall.
            </div>
            <div className="blurb" aria-hidden>
              Markets: Knowledge up, boredom down.
            </div>
            <div className="blurb" aria-hidden>
              Sports: Quiz speed runs at 7 PM.
            </div>
            <div className="blurb" aria-hidden>
            Exclusive: Plum interns spotted shipping features fast.
            </div>
          </div>
        </div>
  );
}
