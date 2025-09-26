export default function NewspaperFluff() {
  return (
    <>
      {/* Top blurbs only */}
      <div className="news-grid" role="list" style={{ marginBottom: 16 }}>
        <div className="blurb" aria-hidden>
          Weather: 100% chance of fun.
        </div>
        <div className="blurb" aria-hidden>
          Crossword on page 6. Don't peek at the answers!
        </div>
        <div className="blurb" aria-hidden>
          Late Edition: Bonus points for streaks.
        </div>
        <div className="blurb" aria-hidden>
    Coffee is hot, quizzes hotter.
      </div>
      </div>

      {/* Divider */}
      <div className="news-divider" />
    </>
  );
}
