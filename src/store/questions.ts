import { create } from 'zustand'
import { type Question } from '../types'
import confetti from 'canvas-confetti'
import { persist, devtools } from 'zustand/middleware'
import { getAllQuestions } from '../services/questions'

interface State {
  questions: Question[]
  currentQuestion: number
  fetchQuestions: (limit: number) => Promise<void>
  selectAnswer: (questionId: number, answer: number) => void
  goNextQuestion: () => void
  goPrevQuestion: () => void
  reset: () => void
}

export const useQuestionsStore = create<State>()(devtools(persist((set, get) => {
  return {
    questions: [],
    currentQuestion: 0,

    fetchQuestions: async (limit: number) => {
      const questions = await getAllQuestions(limit)
      set({ questions })
    },

    selectAnswer: (questionId: number, answerIndex: number) => {
      // Obtener el estado actual
      const { questions } = get()
      // Clonar el array de preguntas
      const newQuestions = structuredClone(questions)
      // Encontrar la pregunta que se quiere actualizar
      const questionIndex = newQuestions.findIndex((q) => q.id === questionId)
      const questionInfo = newQuestions[questionIndex]
      // Verificar si la respuesta es correcta
      const isCorrectUserAnswer = questionInfo.correctAnswer === answerIndex

      if (isCorrectUserAnswer) confetti()
      // Actualizar la pregunta
      newQuestions[questionIndex] = {
        ...questionInfo,
        userSelectedAnswer: answerIndex,
        isCorrectUserAnswer
      }
      // Actualizar el estado
      set({ questions: newQuestions })
    },

    goNextQuestion: () => {
      const { currentQuestion, questions } = get()
      const nextQuestion = currentQuestion + 1
      if (nextQuestion < questions.length) {
        set({ currentQuestion: nextQuestion })
      }
    },

    goPrevQuestion: () => {
      const { currentQuestion } = get()
      const prevQuestion = currentQuestion - 1
      if (prevQuestion >= 0) {
        set({ currentQuestion: prevQuestion })
      }
    },

    reset: () => {
      set({ questions: [], currentQuestion: 0 })
    }
  }
},
{
  name: 'questions-storage'
})))
