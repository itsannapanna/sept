import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { QuizLayout } from '../../layouts';
import { TopicPickerContent } from '../TopicPickerContent';
import { LoadingScreen } from '../LoadingScreen';
import { QuizContent } from '../QuizContent';
import { ResultsContent } from '../ResultsContent';

export default function QuizApp() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  // Determine which content to show based on route
  const getCurrentContent = () => {
    if (isLoading) {
      return <LoadingScreen />;
    }

    switch (location.pathname) {
      case '/':
        return <TopicPickerContent onLoadingChange={setIsLoading} />;
      case '/quiz':
        return <QuizContent />;
      case '/results':
        return <ResultsContent />;
      default:
        return <TopicPickerContent onLoadingChange={setIsLoading} />;
    }
  };

  return (
    <QuizLayout>
      {getCurrentContent()}
    </QuizLayout>
  );
}
