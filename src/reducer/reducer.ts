interface Iquestion {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
  selectedAnswer?: string;
  isCorrect?: boolean | undefined;
}

export const initialState: Iquestion = {
  category: "",
  correct_answer: "",
  difficulty: "",
  incorrect_answers: [],
  question: "",
  type: "",
  selectedAnswer: "",
  isCorrect: undefined,
};

export const reducer = (state: Iquestion[], action: any): Iquestion[] => {
  switch (action.type) {
    case "ADD_QUESTIONS":
      return [...state, ...action.payload];
    default:
      return state;
  }
};
