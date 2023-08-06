import { createContext, useReducer } from "react";
import { useEffect } from "react";
import fetchEntries from "../utils/FetchEntries";

export const EntryContext = createContext();

// Reducer function 
export const entryReducer = (state, action) => {
    switch (action.type) {
        case "FETCH_ENTRIES":
        case "UPDATE_ENTRY":
        case "DELETE_ENTRY":
            return {
                entries: action.payload
            }
        case "CREATE_ENTRY":
            return {
                entries: [action.payload, ...state.entries]
            }
        default:
            return state
    }
}

// Context Provider Element that wraps the entire app
export const EntryContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(entryReducer, { entries: null });

    return (
        <EntryContext.Provider value={{ ...state, dispatch }}>
            {children}
        </EntryContext.Provider>
    );
}