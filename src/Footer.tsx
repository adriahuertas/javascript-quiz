import { Button } from '@mui/material'
import { useQuestionsData } from './hooks/useQuestionsData'
import { useQuestionsStore } from './store/questions'

export const Footer = () => {
  const { correct, incorrect, unanswered } = useQuestionsData()
  const reset = useQuestionsStore((state) => state.reset)
  return (
    <footer>
      <span>
        <strong>{`✅ ${correct} correctas - ❌ ${incorrect} incorrectas - ❓ ${unanswered} sin responder`}</strong>
      </span>
      <div style={{ marginTop: '16px' }}>
        <Button onClick={() => { reset() }} variant="outlined">
          Reiniciar juego
        </Button>
      </div>
    </footer>
  )
}
