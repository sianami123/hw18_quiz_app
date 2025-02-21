interface Iquestion {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
  selectedAnswer?: string | null;
  isCorrect?: boolean | null;
}

const initialState: Iquestion[] = [];

const reducer = (state: Iquestion[], action: any): Iquestion[] => {
  switch (action.type) {
    case "ADD_QUESTIONS":
      return action.payload;
    case "ADD_ANSWER":
      return state.map((question) =>
        question.question === action.payload.question
          ? action.payload
          : question
      );
    case "RESET_QUESTIONS":
      return initialState;
    default:
      return state;
  }
};

export { initialState, reducer };
