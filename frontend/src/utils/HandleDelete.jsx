
export const handleDelete = async (parameter) => {

    const { input, entries, dispatch, params, setModalVisibility } = parameter
    if (input !== "confirm") return

    try {
        const deletedEntry = await fetch(`http://localhost:4000/api/entries/${params.id}`, {
            method: "DELETE",
            headers: {
                'Content-type': 'application/json'
            }
        });

        const json = await deletedEntry.json();

        if (!deletedEntry.ok) return console.log(json.Error);

        const updatedEntries = entries.filter((entry) => entry._id !== params.id);

        dispatch({ type: "DELETE_ENTRY", payload: updatedEntries });

        setModalVisibility(true);

    } catch (error) {
        console.log(error);
    }
}