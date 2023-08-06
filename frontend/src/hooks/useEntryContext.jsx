
import { EntryContext } from "../context/entryContext";
import { useContext } from "react";

export const useEntryContext = () => {
    const context = useContext(EntryContext);

    try {
        return context;
    } catch (error) {
        console.log(error);
    }

}