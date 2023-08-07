

// Invoke this function if the form type is CREATE
export const createEntry = async (parameter) => {
    const { newEntry, dispatch, setID, setDisplay, clearFields } = parameter;

    try {
        // Post request
        const res = await fetch("http://localhost:4000/api/entries", {
            method: 'POST',
            body: JSON.stringify(newEntry),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const json = await res.json();

        if (!res.ok) return console.log(json.Error);

        dispatch({
            type: "CREATE_ENTRY",
            payload: { ...json, submittedDate: new Date(json.submittedDate).toUTCString() }
        })

        setID(json._id);
        setDisplay(true);
        clearFields();

    } catch (error) {
        console.log(error);
    }
}


// Invoke this function if the form type is UPDATE
export const updateEntry = async (parameter) => {
    const { newEntry, entries, id, dispatch, clearFields } = parameter;
    const updatedEntries = entries.map(entry => {
        if (entry._id != id) return entry;
        return {
            ...entry,
            title: newEntry.title ? newEntry.title : entry.title,
            body: newEntry.body ? newEntry.body : entry.body,
            name: newEntry.name ? newEntry.name : "Faceless",
            tags: newEntry.tags
        }
    });

    const updatedEntry = updatedEntries.find(entry => entry._id === id);

    try {

        const res = await fetch(`http://localhost:4000/api/entries/${id}`, {
            method: "PATCH",
            body: JSON.stringify(updatedEntry),
            headers: {
                'Content-type': 'application/json'
            }
        })

        const json = await res.json();

        if (!res.ok) return console.log(json.Error);
        dispatch({ type: "UPDATE_ENTRY", payload: updatedEntries });
        clearFields();

    } catch (error) {
        console.log(error);
    }

}