
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import EntryDetails from "../components/EntryDetails";
import { FaPen, FaTrashAlt } from "react-icons/fa"
import DeleteEntry from "../components/DeleteEntry";
import UpdatedEntry from "../components/UpdateEntry";



const SearchEntry = () => {

    const [entry, setEntry] = useState({})
    const [formVisibility, setFormVisibility] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const params = useParams();


    // Re-render fetched entry component when searching for a new entry again
    useEffect(() => {
        fetchEntry()
    }, [params.id])

    // Fetch the entry using the ID 
    const fetchEntry = async () => {
        try {
            const entryResponse = await fetch(`http://localhost:4000/api/entries/${params.id}`);

            if (!entryResponse.ok) return console.log(entryResponse);

            const entryJSON = await entryResponse.json();

            setEntry({ ...entryJSON, submittedDate: new Date(entryJSON.submittedDate).toUTCString() });

        } catch (error) {
            console.log(error);
        }
    }

    const showDeleteForm = () => {
        setFormVisibility(false);
        setShowDelete(!showDelete)
    }

    // Get the updated entry from the update form
    const getUpdatedEntry = (updatedEntry) => {
        setEntry(prevEntry =>
        ({
            ...prevEntry,
            title: updatedEntry.title ? updatedEntry.title : prevEntry.title,
            body: updatedEntry.body ? String(updatedEntry.body).trim() : prevEntry.body,
            name: updatedEntry.name ? updatedEntry.name : "Faceless",
            tags: updatedEntry.tags,
            submittedDate: new Date(prevEntry.submittedDate).toUTCString()
        })
        );
    }

    return (
        <div className="px-6 grid w-full max-w-7xl">
            {entry.Error ?
                <div className="grid my-20 text-center items-center  place-items-center">
                    <h2 className="text-3xl font-bold">No entry matched the ID you entered</h2>
                    <p className=" font-normal text-lg max-w-[40ch]">Make sure the ID you provided is correct or try searching something else.</p>
                </div>
                :
                <div className=" flex gap-12 self-start py-8 w-full">
                    <div className={`self-start flex bg-lighter-bg p-8 relative rounded-3xl ${formVisibility ? 'w-[60%]' : 'w-full'}`}>
                        <div >
                            <EntryDetails entry={entry}></EntryDetails>
                        </div>
                        <div className="text-xl justify-center items center
                                        flex gap-4 absolute
                                        right-8
                                        top-8">
                            <FaPen onClick={() => setFormVisibility(prevState => !prevState)} className="hover:fill-primary hover:cursor-pointer" />
                            <FaTrashAlt onClick={showDeleteForm} className="hover:fill-primary hover:cursor-pointer" />
                        </div>
                    </div>
                    <UpdatedEntry getUpdatedEntry={getUpdatedEntry}
                        setFormVisibility={setFormVisibility}
                        formVisibility={formVisibility} />
                    <DeleteEntry visibility={showDelete} setShowDelete={setShowDelete} />
                </div>
            }
        </div>
    )
}

export default SearchEntry;