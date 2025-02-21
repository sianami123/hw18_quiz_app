import { createContext, useReducer, useContext } from "react";
import { reducer, initialState } from "../reducer/reducer";

type ContextType = {
  questionsState: any;
  dispatch: React.Dispatch<any>;
};

const Context = createContext<ContextType>({
  questionsState: {},
  dispatch: () => null,
});

const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [questionsState, dispatch] = useReducer(reducer, initialState);

  return (
    <Context.Provider value={{ questionsState, dispatch }}>
      {children}
    </Context.Provider>
  );
};

export { Context, ContextProvider };
