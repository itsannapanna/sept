import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes'
import { QuizProvider } from './context/QuizContext'

function App() {
  return (
    <BrowserRouter>
      <QuizProvider>
        <AppRoutes />
      </QuizProvider>
    </BrowserRouter>
  )
}

export default App
