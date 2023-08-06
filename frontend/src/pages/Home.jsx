import { useEffect, useState } from "react";

import EntryDetails from '../components/EntryDetails'
import EntryForm from "../components/EntryForm";
import { useEntryContext } from "../hooks/useEntryContext";
import fetchEntries from "../utils/FetchEntries";
import { GiFountainPen } from 'react-icons/gi'


const Home = () => {

    // invoke the custom entry context
    const { entries, dispatch } = useEntryContext();
    const [entryFormVisibility, setEntryFormVisibility] = useState(false);

    useEffect(() => {
        fetchEntries(dispatch);
    }, [])

    // Call this function to show entry form in small screens
    const showMobileEntryForm = () => {
        setEntryFormVisibility(true);
    }

    // Disable scroll when entry form is visible in small screen
    useEffect(() => {
        if (entryFormVisibility) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [entryFormVisibility])



    return (
        <div className="flex flex-grow gap-x-12 max-w-7xl w-full
                        px-4 sm:px-8 
                        py-6 ">
            <div className="flex flex-col 
                            w-full lg:w-[60%]
                            gap-y-6 sm:gap-y-8">
                {entries && entries.map((entry) => (
                    <div className="grid rounded-3xl bg-lighter-bg 
                                    p-8"
                        key={entry._id}>
                        <EntryDetails entry={entry}></EntryDetails>
                    </div>
                ))}
            </div>
            <EntryForm type={"CREATE"} buttonText={"Submit"} formHeader={"Submit Your Entry"} visibility={entryFormVisibility} setVisibility={setEntryFormVisibility}></EntryForm>
            <button className={`fixed rounded-full bg-accent
                               items-center justify-center
                               bottom-8 sm:bottom-10
                               right-8 sm:right-10
                               ${entryFormVisibility ? 'hidden' : 'flex'} lg:hidden
                               gap-2
                               p-4 sm:px-6
                               sm:py-4`}
                onClick={showMobileEntryForm}>
                <GiFountainPen className="text-2xl scale-x-[-1]" />
                <span className="text-xl font-bold
                                 hidden sm:inline" >Submit entry</span>
            </button>
        </div >
    )
}

export default Home;