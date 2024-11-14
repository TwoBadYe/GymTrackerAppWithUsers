import { createContext, useReducer } from "react";

export const WorkoutsContext = createContext();
// payload is new workout added
export const workoutsReducer = (state, action) => {
  switch (action.type) {
    case "SET_WORKOUTS":
      return {
        workouts: action.payload,
      };
    case "CREATE_WORKOUT":
      return {
        workouts: [action.payload, ...state.workouts],
      };
    case "DELETE_WORKOUT":
      return {
        workouts: state.workouts.filter((w) => w._id !== action.payload._id),
      };
    default:
      return state;
  }
};

// children represents whatever component workoutcontextprovider wraps in this case its the app component
export const WorkoutsContextProvider = ({ children }) => {
  //dispatch is used to update reducer
  const [state, dispatch] = useReducer(workoutsReducer, {
    //workouts property goes from null to whatever we get from db
    workouts: null,
  });

  return (
    //{children} is wrapped by <WorkoutsContext.Provider value={{ ...state, dispatch }}>
    //... is used to spread the state properties insides workouts object
    <WorkoutsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </WorkoutsContext.Provider>
  );
};
