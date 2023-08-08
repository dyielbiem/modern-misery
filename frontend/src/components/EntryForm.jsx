import { useState, useRef, useEffect } from "react";
import SubmitModal from "./SubmitModal";
import { useEntryContext } from "../hooks/useEntryContext";
import { createEntry, updateEntry } from "../utils/HandleEntryForm";
import { useParams } from "react-router-dom";
import fetchEntries from "../utils/FetchEntries";
import { AiOutlineClose } from 'react-icons/ai'

const EntryForm = ({ type, buttonText, formHeader, getUpdatedEntry,
    visibility, setVisibility, setSuccessModalVisibility }) => {

    // invoke the custom entry context
    const { entries, dispatch } = useEntryContext();
    const [title, setTitle] = useState("");
    const [name, setName] = useState("");
    const [body, setBody] = useState("");

    const tagRef = useRef("");
    const [newTags, setNewTags] = useState([]);
    const [display, setDisplay] = useState(false)
    const [id, setID] = useState("");
    const [disableButton, setDisableButton] = useState(true);

    const params = useParams();

    // Fetched the seached entry and set the default values to all text fields in update form
    useEffect(() => {
        const checkEntries = async () => {
            let fetchedEntries = {};
            if (entries) {
                fetchedEntries = entries
            } else {
                fetchedEntries = await fetchEntries(dispatch);
            }

            if (type === 'UPDATE') {
                const foundEntry = fetchedEntries.find(entry => params.id === entry._id)
                if (!foundEntry) return;
                setTitle(foundEntry.title);
                setBody(foundEntry.body);

                setNewTags(foundEntry.tags);

                if (foundEntry.name === "Faceless") {
                    setName("");
                } else {
                    setName(foundEntry.name);
                }

                if (foundEntry.tags.length !== 0) {
                    tagRef.current.placeholder = "";
                } else {
                    tagRef.current.placeholder = "Tags (Optional)"
                }
            }
        }

        checkEntries();
    }, [params.id, visibility])

    // Submit the new entry
    const handleSubmit = (event) => {
        event.preventDefault();
        const newEntry = {
            title,
            name: name.at(0) === "@" ? name.slice(1) : name,
            body,
            tags: (String(tagRef.current.value).trim() === "") ? newTags :
                [...newTags, String(tagRef.current.value).trim()]
        }

        switch (type) {
            case 'CREATE': {
                // setCreateDisplay("hidden");
                const parameter = {
                    newEntry,
                    dispatch,
                    setID,
                    setDisplay,
                    clearFields,
                }

                createEntry(parameter);
                break;
            }


            case 'UPDATE': {
                const parameter = {
                    newEntry,
                    entries,
                    id: params.id,
                    dispatch,
                    clearFields
                }
                getUpdatedEntry(newEntry);
                updateEntry(parameter);
                setSuccessModalVisibility(true);
                break;
            }

            default:
                return;
        }
    }

    // CLear all input fields
    const clearFields = () => {
        setName("");
        setTitle("");
        setBody("");
        setNewTags([]);
        tagRef.current.placeholder = "Tags (Optional)";
        tagRef.current.value = "";
    }

    // Delete the tag when x sign is clicked
    const deleteTag = (index) => {
        const updatedTags = [...newTags];
        updatedTags.splice(index, 1);
        if (!updatedTags.length) {
            tagRef.current.placeholder = "Tags (Optional)";
        }
        setNewTags(updatedTags);
    }

    const newTagAction = () => {
        const newTag = tagRef.current.value.at(0) === "#" ? tagRef.current.value.slice(1)
            : tagRef.current.value;

        if (!String(newTag).trim()) return;
        setNewTags((prevTags) => [...prevTags, newTag]);

        tagRef.current.value = "";

        if (newTags) {
            tagRef.current.placeholder = "";
        }
    }

    // Add the tag if tab or enter key is clicked
    const tabEnterClick = (event) => {
        if (!String(tagRef.current.value).trim()) return
        if (event.key === 'Tab' || event.key === 'Enter' || event.keyCode === 13) {
            event.preventDefault();
            newTagAction();
        }
    }

    // Add the tag if tab or enter key is clicked
    const spaceClick = (event) => {
        if (!String(tagRef.current.value).trim()) return
        if (event.target.value.at(-1) === " ") {
            event.preventDefault();
            newTagAction();
        }
    }

    // Confirm and close the popup message
    const closeModal = () => {
        setDisplay(false);
        setID("");
    }

    // Check if title and description is empty
    useEffect(() => {
        if (String(title).trim() && String(body).trim()) {
            setDisableButton(false);
        } else {
            setDisableButton(true);
        }

    }, [title, body])

    return (
        <>
            <div className={` flex-col   
            ${type === "CREATE" ? `${visibility ? 'flex' : 'hidden'} lg:flex` : ''}
            ${type === "UPDATE" ? `${visibility ? 'flex' : 'hidden'}` : ''}
                        items-center
                        sm:justify-center
                        z-50 lg:z-auto
                        self-start
                        fixed lg:static
                        top-0 lg:top-auto
                        left-0 lg:left-auto
                        p-4 lg:p-0
                        w-screen lg:w-[40%]
                        min-h-screen lg:min-h-0
                        bg-background sm:bg-[rgba(0,0,0,0.5)]
                        `}>
                <form onSubmit={handleSubmit}
                    className={`grid gap-y-4 
                            z-50 lg:z-auto bg-background 
                            sm:p-8 lg:p-0 
                            rounded-none sm:rounded-3xl lg:rounded-none
                            w-full sm:w-[35rem] lg:w-full`}>
                    <div className="flex items-center justify-between
                                mb-2">
                        <h2 className="text-2xl lg:text-3xl font-heading
                                       font-bold ">{formHeader}</h2>
                        <AiOutlineClose className="text-4xl bg-secondary p-2 cursor-pointer
                                               lg:hidden rounded-full"
                            onClick={() => setVisibility(false)} />
                    </div>
                    <input type="text" onChange={e => setTitle(e.target.value)}
                        value={title} placeholder="Title (Required)" className="px-2 py-2 rounded-lg outline-none" />
                    <textarea type="text" onChange={e => setBody(e.target.value)}
                        value={body} placeholder="Description (Required)" rows="4"
                        className="px-2 py-2 rounded-lg resize-none outline-none" />
                    <input type="text" onChange={e => setName(e.target.value)}
                        value={name} placeholder="Username (Optional)"
                        className="px-2 py-2 rounded-lg outline-none" />
                    <div className="rounded-lg px-2 py-2 bg-text flex gap-1 flex-wrap ">
                        {newTags && newTags.map((newTag, index) => (
                            <div key={index} className="flex bg-primary text-background px-2 rounded-lg gap-1 items-center justify-center" >
                                <span className="text-background font-semibold break-all">
                                    {newTag}
                                </span>
                                <button type="button" className="font-extrabold text-2xl items-center hover:bg-inherit"
                                    onClick={() => deleteTag(index)}>×</button>
                            </div>
                        ))}
                        <input placeholder="Tags (Optional)" ref={tagRef} onKeyDown={tabEnterClick}
                            className="outline-none py-1 flex-1 min-w-[20%]" onInput={spaceClick} />
                    </div>
                    <button type="submit"
                        className={`rounded-full text-text
                                    w-full px-4 py-3 mt-2 text-2xl font-bold
                                    bg-accent 
                                    disabled:opacity-60 disabled:cursor-not-allowed`}
                        onClick={() => setVisibility(false)}
                        disabled={disableButton}>{buttonText}</button>
                </form>

            </div>
            <SubmitModal display={display} closeModal={closeModal} id={id}></SubmitModal>
        </>
    );
};

export default EntryForm;